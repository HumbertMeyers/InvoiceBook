from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id_User', 'nom', 'email', 'password')
		
class FournisseurSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fournisseur
		fields = ('id_Fournisseur', 'id_User', 'nom', 'numeroTVA')
		
class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ('id_Client', 'id_User', 'nom', 'numeroTVA')async