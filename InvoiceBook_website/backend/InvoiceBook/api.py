from os import mkdir, path

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group, update_last_login
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_decode_handler

from .serializers import *
from .permissions import IsLoggedInUserOrAdmin, IsAdminUser
from settings.settings import BASE_DIR


class TestViewSet(viewsets.ViewSet):
	def test(self):
		return "coucou"

#######################
###    USERS API    ###

class UserViewSet(viewsets.ViewSet):
	
	def get_permissions(self):
		""" CONTROL PERMISSIONS """
		permission_classes = []
		if self.action == 'create' or self.action == 'login' or self.action == 'login_token':
			permission_classes = [AllowAny]
		elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update' or \
				self.action == 'clients' or self.action == 'factures' or self.action == 'fournisseurs' :
			permission_classes = [IsLoggedInUserOrAdmin]
		elif self.action == 'list' or self.action == 'names':
			permission_classes = [IsAdminUser]
		return [permission() for permission in permission_classes]
	
	"""
	A simple ViewSet for listing or retrieving users.
	"""
	
	def create_token(self, user):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		payload = jwt_payload_handler(user)
		token = jwt_encode_handler(payload)
		return token
	
	# GET 127.0.0.1:8000/api/users/
	def list(self, request):
		""" LIST ALL USERS """
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# GET 127.0.0.1:8000/api/users/1
	def retrieve(self, request, pk=None):
		""" GET AN USER PROFILE BY ID """
		queryset = User.objects.all()
		user = get_object_or_404(queryset, pk=pk)
		serializer = UserSerializer(user)
		return Response(serializer.data)
	
	# GET 127.0.0.1:8000/api/users/noms/
	def names(self, request, *args, **kwargs):
		""" GET ALL USERS NAMES """
		queryset = User.objects.all()
		serializer = NomSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# POST 127.0.0.1:8000/api/users/
	def create(self, request, *args, **kwargs):
		""" CREATE A NEW USER """
		data = request.data.copy()
		serializer = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
		serializer.last_name = data['last_name']
		serializer.first_name = data['first_name']
		try:
			serializer.save()
			queryset = User.objects.filter(email=data['email'])
			user = queryset.get()
			user.token = self.create_token(user)
			queryset = set()
			queryset.add(user)
			group = Group.objects.get(name='IsAuthenticated')
			user.groups.add(group)
			serializer = UserLoginGetTokenSerializer(queryset, many=True)
			mkdir(path.join(BASE_DIR, "media/" + user.username))
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		except IntegrityError as exception:
			if "unique_email" in str(exception):
				error = "This email address already exist"
			return Response({'error': error}, status=status.HTTP_409_CONFLICT)
	
	# GET 127.0.0.1:8000/api/users/login/?email=john.smith@gmail.com&pwd=azertyui
	@action(detail=False, methods=['get'])
	def login(self, request, *args, **kwargs):
		""" AUTHENTICATE AN USER W/O TOKEN """
		email = request.query_params.get('email')
		pwd = request.query_params.get('pwd')
		serializer = authenticate(username=email, password=pwd)
		queryset = User.objects.filter(email=email)
		if queryset:
			user = queryset.get()
			if serializer is not None:
				login(request, serializer)
				user.token = self.create_token(user)
				queryset = set()
				queryset.add(user)
				serializer = UserLoginGetTokenSerializer(queryset, many=True)
				update_last_login(self, user=user)
				return Response(serializer.data)
			else:
				error = "Credential error : your username or password may be wrong"
				return Response({'error': error}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			error = "Credential error : your username or password may be wrong"
			return Response({'error': error}, status=status.HTTP_401_UNAUTHORIZED)
			

	# GET 127.0.0.1:8000/api/users/login_token/?token=klzjehflzfhnqlkfzefqzfghref
	@action(detail=False, methods=['get'])
	def login_token(self, request, *args, **kwargs):
		""" AUTHENTICATE AN USER W/ TOKEN """
		token = request.query_params.get('token')
		try:
			decoded_payload = jwt_decode_handler(token)
			id_user = decoded_payload['user_id']
			queryset = User.objects.filter(id=id_user)
			if queryset:
				serializer = UserLoginSerializer(queryset, many=True)
				return Response(serializer.data)
			else:
				error = "Invalid token"
				return Response({'error': error}, status=status.HTTP_404_NOT_FOUND)
		except:
			error = "Invalid token"
			return Response({'error': error}, status=status.HTTP_404_NOT_FOUND)
		
	@action(detail=True, methods=['get', 'post'])
	def clients(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL CUSTOMERS OF AN USER """
			queryset = UserClient.objects.filter(id_user=pk)
			serializer = UserClientDetailSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			""" ADD A CUSTOMER TO AN USER """
			data = request.data.copy()
			data['user_id'] = pk
			serializer = UserClientSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)

	# GET,POST 127.0.0.1:8000/api/users/1/factures/
	@action(detail=True, methods=['get', 'post'])
	def factures(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL INVOICES OF AN USER """
			queryset = Facture.objects.filter(id_user=pk)
			serializer = UserFactureDetailSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			""" ADD AN INVOICE TO AN USER """
			data = request.data.copy()
			data['id'] = pk
			serializer = FactureSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
	
	# GET,POST 127.0.0.1:8000/api/users/1/fournisseurs/
	@action(detail=True, methods=['get', 'post'])
	def fournisseurs(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL PROVIDERS OF AN USER """
			queryset = UserFournisseur.objects.filter(id_user=pk)
			serializer = UserFournisseurDetailSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			""" ADD A PROVIDER TO AN USER """
			data = request.data.copy()
			data['id'] = pk
			serializer = UserFournisseurSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)


#######################
###   INVOICE API   ###

class FactureViewSet(viewsets.ViewSet):
	
	# GET 127.0.0.1:8000/api/tools/
	def list(self, request, *args, **kwargs):
		"""" list all tools """
		queryset = Facture.objects.all()
		serializer = FactureSerializer(queryset, many=True)
		return Response(serializer.data)