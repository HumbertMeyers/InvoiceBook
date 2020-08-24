import json
from math import atan2, cos, radians, sin, sqrt
from os.path import defpath

import bcrypt
from django.db import IntegrityError
from django.db.models import CharField, Value
from django.http import QueryDict
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_decode_handler

from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import *
from .serializers import *


class PermissionsPerMethodMixin(object):
	def get_permissions(self):
		""" Premet une réecriture des permissions par défault grâçe à @permission_classes """
		view = getattr(self, self.action)
		if hasattr(view, 'permission_classes'):
			return [permission_class() for permission_class in view.permission_classes]
		return super().get_permissions()


#######################
###   USERS API   ###

class UsersViewSet(PermissionsPerMethodMixin, viewsets.GenericViewSet):
	
	@permission_classes([AllowAny])
	def create_token(self, user):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		
		payload = jwt_payload_handler(user)
		token = jwt_encode_handler(payload)
		
		return token
	
	# GET 127.0.0.1:8000/api/users/
	@permission_classes([IsAdminUser])
	def list(self, request, *args, **kwargs):
		"""" liste tous le users """
		queryset = User.objects.all().order_by('last_name')
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# GET 127.0.0.1:8000/api/users/1
	@permission_classes([IsAuthenticated])
	def retrieve(self, request, pk=None, *args, **kwargs):
		"""" retourne le profil d'un utilisateur par son id"""
		queryset = User.objects.filter(id=pk)
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# POST 127.0.0.1:8000/api/users/
	@permission_classes([AllowAny])
	def create(self, request, *args, **kwargs):
		"""" creer un nouvel utilisateur """
		data = request.data.copy()
		data['password'] = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt())
		data['password'] = data['password'].decode('utf8')
		serializer = UserSerializer(data=data)
		serializer.is_valid(raise_exception=True)
		try:
			serializer.save()
			queryset = User.objects.filter(email=data['email'])
			user = queryset.get()
			user.token = self.create_token(user)
			queryset = set()
			queryset.add(user)
			serializer = UserLoginGetTokenSerializer(queryset, many=True)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		except IntegrityError as exception:
			if "unique_email" in str(exception):
				error = "adresse mail déjà existante"
				return Response({'error': error}, status=status.HTTP_409_CONFLICT)
	
	# GET 127.0.0.1:8000/api/users/noms/
	@action(detail=False, methods=['get'])
	@permission_classes([IsAdminUser])
	def noms(self, request, *args, **kwargs):
		"""" retourne tous les noms des utilisateurs"""
		queryset = User.objects.all()
		serializer = NomSerializer(queryset, many=True)
		return Response(serializer.data)
	
	# GET 127.0.0.1:8000/api/users/login/?email=john.doe@gmail.com&pwd=testpwd1
	@action(detail=False, methods=['get'])
	@permission_classes([AllowAny])
	def login(self, request, *args, **kwargs):
		"""" authentifie un utilisateur sans token"""
		email = request.query_params.get('email')
		pwd = request.query_params.get('pwd')
		queryset = User.objects.filter(email=email)
		if queryset:
			user = queryset.get()
			if bcrypt.checkpw(pwd.encode('utf8'), user.password.encode('utf8')):
				user.token = self.create_token(user)
				queryset = set()
				queryset.add(user)
				serializer = UserLoginGetTokenSerializer(queryset, many=True)
				return Response(serializer.data)
			else:
				error = "Mauvaises information de connexion pour : %s" % email
				return Response({'error': error}, status=status.HTTP_404_NOT_FOUND)
		else:
			error = "Mauvaises information de connexion pour : %s" % email
			return Response({'error': error}, status=status.HTTP_404_NOT_FOUND)
	
	# GET 127.0.0.1:8000/api/users/login_token/?token=dghffgnndsklskjskff
	@action(detail=False, methods=['get'])
	@permission_classes([AllowAny])
	def login_token(self, request, *args, **kwargs):
		"""" authentifie un utilisateur avec un token"""
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
	
	# GET,POST 127.0.0.1:8000/api/users/1/clients/
	@action(detail=True, methods=['get', 'post'])
	@permission_classes([IsAuthenticated])
	def clients(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			"""" retourne tous les clients d'un utilisateur"""
			queryset = UserClient.objects.filter(id_user=pk)
			serializer = UserClientDetailSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			"""" ajoute un nouveau client à l'utilisateur """
			data = request.data.copy()
			data['user_id'] = pk
			serializer = UserClientSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
	
	# GET,POST 127.0.0.1:8000/api/users/1/factures/
	@action(detail=True, methods=['get', 'post'])
	@permission_classes([IsAuthenticated])
	def factures(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			"""" retourne tous les factures d'un utilisateur"""
			queryset = Facture.objects.filter(id_user=pk)
			serializer = UserFactureDetailSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			"""" ajoute une nouvelle facture à l'utilisateur """
			data = request.data.copy()
			data['id'] = pk
			serializer = FactureSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
	
	# GET,POST 127.0.0.1:8000/api/users/1/fournisseurs/
	@action(detail=True, methods=['get', 'post'])
	@permission_classes([IsAuthenticated])
	def fournisseurs(self, request, pk=None, *args, **kwargs):
		if request.method == 'GET':
			"""" retourne tous les fournisseurs d'un utilisateur"""
			queryset = UserFournisseur.objects.filter(id_user=pk)
			serializer = UserFournisseurSerializer(queryset, many=True)
			return Response(serializer.data)
		
		elif request.method == 'POST':
			"""" ajoute un nouveau fournisseur à l'utilisateur"""
			data = request.data.copy()
			data['id'] = pk
			serializer = UserFournisseurSerializer(data=data)
			serializer.is_valid(raise_exception=True)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
