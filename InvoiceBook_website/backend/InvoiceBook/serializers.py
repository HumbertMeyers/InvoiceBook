from rest_framework import serializers
from .models import *

##########################################
#     Serializer concernant les users    #
##########################################

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id_User', 'nom', 'email', 'password')


class UserLoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id_User', 'nom', 'email')


class UserLoginGetTokenSerializer(serializers.ModelSerializer):
	token = serializers.SerializerMethodField()
	
	def getToken(self, obj):
		return obj.token
	
	class Meta:
		model = User
		fields = ('id_User', 'email', 'password', 'token')


class NomSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('nom',)


##########################################
# Serializer concernant les fournisseurs #
##########################################

class FournisseurSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fournisseur
		fields = ('id_Fournisseur', 'id_User', 'nom', 'numeroTVA')


##########################################
#    Serializer concernant les clients   #
##########################################

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ('id_Client', 'id_User', 'nom', 'numeroTVA')


##########################################
#   Serializer concernant les factures   #
##########################################

class FactureSerializer(serializers.ModelSerializer):
	class Meta:
		model = Facture
		fields = ('id_Facture', 'dateFacturation', 'montant', 'nomDeFichier', 'id_User', 'id_Fournisseur', 'id_Client')
