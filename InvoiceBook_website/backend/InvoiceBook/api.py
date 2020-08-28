import json
from os import mkdir, path

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group, update_last_login
from django.db import IntegrityError
from django.http import HttpResponse as Response, JsonResponse, request
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response as RESTResp
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_decode_handler

from .serializers import *
from .permissions import IsLoggedInUserOrAdmin, IsAdminUser
from settings.settings import BASE_DIR


class TestViewSet(viewsets.ViewSet):
	
	def get_permissions(self):
		""" CONTROL PERMISSIONS """
		permission_classes = []
		if self.action == 'create' or self.action == 'login' or self.action == 'login_token' or self.action == 'list':
			permission_classes = [AllowAny]
		elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update' or \
				self.action == 'clients' or self.action == 'factures' or self.action == 'fournisseurs' or \
				self.action == 'change_password':
			permission_classes = [IsLoggedInUserOrAdmin]
		elif self.action == 'names':
			permission_classes = [IsAdminUser]
		return [permission() for permission in permission_classes]
	
	# GET 127.0.0.1:8000/api/test/
	def list(self, request):
		return Response(json.dumps({"coucou": "yeah"}))


#######################
###    USERS API    ###

class UserViewSet(viewsets.ViewSet):
	
	def get_permissions(self):
		""" CONTROL PERMISSIONS """
		permission_classes = []
		if self.action == 'create' or self.action == 'login' or self.action == 'login_token':
			permission_classes = [AllowAny]
		elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update' or \
				self.action == 'clients' or self.action == 'factures' or self.action == 'fournisseurs':
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
		return Response(json.dumps(serializer.data))
	
	# GET 127.0.0.1:8000/api/users/1
	def retrieve(self, request, pk=None):
		""" GET AN USER PROFILE BY ID """
		queryset = User.objects.all()
		user = get_object_or_404(queryset, pk=pk)
		serializer = UserSerializer(user)
		return Response(json.dumps(serializer.data))
	
	# GET 127.0.0.1:8000/api/users/noms/
	def names(self, request, *args, **kwargs):
		""" GET ALL USERS NAMES """
		queryset = User.objects.all()
		serializer = NomSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# POST 127.0.0.1:8000/api/users/inscription/?username=some@gmail.com&email=some@gmail.com&password=veryhardpassword&last_name=personne&first_name=some
	def create(self, request, *args, **kwargs):
		""" CREATE A NEW USER """
		username=request.query_params.get('username')
		email = request.query_params.get('email')
		pwd = request.query_params.get('password')
		serializer = User.objects.create_user(username=username, email=email, password=pwd)
		serializer.last_name = request.query_params.get('last_name')
		serializer.first_name = request.query_params.get('first_name')
		try:
			serializer.save()
			queryset = User.objects.filter(email=email)
			user = queryset.get()
			user.token = self.create_token(user)
			queryset = set()
			queryset.add(user)
			group = Group.objects.get(name='IsAuthenticated')
			user.groups.add(group)
			serializer = UserLoginGetTokenSerializer(queryset, many=True)
			mkdir(path.join(BASE_DIR, "media/" + user.username))
			return Response(json.dumps(serializer.data[0]), status=status.HTTP_201_CREATED)
		except IntegrityError as exception:
			if "unique_email" in str(exception):
				error = "This email address already exist"
			return RESTResp({'error': error}, status=status.HTTP_409_CONFLICT)
	
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
				return Response(json.dumps(serializer.data[0]))
			else:
				error = "Credential error : your username or password may be wrong"
				return RESTResp({'error': error}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			error = "Credential error : your username or password may be wrong"
			return RESTResp({'error': error}, status=status.HTTP_401_UNAUTHORIZED)
	
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
				return RESTResp({'error': error}, status=status.HTTP_404_NOT_FOUND)
		except:
			error = "Invalid token"
			return RESTResp({'error': error}, status=status.HTTP_404_NOT_FOUND)
	
	# GET 127.0.0.1:8000/api/users/1/changepwd/?pwd=SomePassword
	@action(detail=True, methods=['get'])
	def change_password(self, request, pk=None):
		""" CHANGE THE PASSWORD OF THE USER """
		usr = User.objects.filter(id_user=pk)
		pwd = request.query_params.get('pwd')
		usr.set_password(pwd)
		try:
			usr.save()
			return Response(json.dumps({'status': 'password set'}))
		except:
			error = "Une erreur est survenue"
			return RESTResp({'error': error}, status=status.HTTP_400_BAD_REQUEST)
	
	# GET,POST 127.0.0.1:8000/api/users/1/clients/
	@action(detail=True, methods=['get', 'post'])
	def clients(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL CUSTOMERS OF AN USER """
			
			# SELECT userclients.id_client, concat(firstname, " ", lastname) as nom
			# FROM clients
			# INNER JOIN invoicebook_user on userclients.id = invoicebook_user.id
			# WHERE invoicebook_user.id=1
			
			queryset = Client.objects.filter(id_user=pk)
			if not queryset:
				return Response('[]')
			serializer = UserClientDetailSerializer(queryset, many=True)
			return Response(json.dumps(serializer.data[0]))
		
		elif request.method == 'POST':
			""" ADD A CUSTOMER TO AN USER """
			data = request.data.copy()
			data['user_id'] = pk
			serializer = UserClientSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			queryset = Client.objects.filter(lastname=data['lastname'], firstname=data['firstname'])
			return Response(json.dumps(serializer.data[0]), status=status.HTTP_201_CREATED)
	
	# GET,POST 127.0.0.1:8000/api/users/1/factures/
	@action(detail=True, methods=['get', 'post'])
	def factures(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL INVOICES OF AN USER """
			queryset = Facture.objects.filter(id_user=pk)
			if not queryset:
				return Response('[]')
			serializer = UserFactureDetailSerializer(queryset, many=True)
			return Response(json.dumps(serializer.data[0]))
		
		elif request.method == 'POST':
			""" ADD AN INVOICE TO AN USER """
			data = request.data.copy()
			data['id'] = pk
			serializer = FactureSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			
			return Response(json.dumps(serializer.data[0]), status=status.HTTP_201_CREATED)
	
	# GET,POST 127.0.0.1:8000/api/users/1/fournisseurs/
	@action(detail=True, methods=['get', 'post'])
	def fournisseurs(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			""" LIST ALL PROVIDERS OF AN USER """
			queryset = Fournisseur.objects.filter(id_user=pk)
			if not queryset:
				return Response('[]')
			serializer = UserFournisseurDetailSerializer(queryset, many=True)
			return Response(json.dumps(serializer.data[0]))
		
		elif request.method == 'POST':
			""" ADD A PROVIDER TO AN USER """
			data = request.data.copy()
			data['id'] = pk
			serializer = UserFournisseurSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(json.dump(serializer.data[0]), status=status.HTTP_201_CREATED)
