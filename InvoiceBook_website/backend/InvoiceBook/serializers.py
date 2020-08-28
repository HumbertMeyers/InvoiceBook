from rest_framework import serializers
from .models import *


##########################################
#     Serializer concernant les users    #
##########################################

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'last_name', 'first_name', 'email', 'password', 'username')


class UserLoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'last_name', 'first_name', 'email')


class UserLoginGetTokenSerializer(serializers.ModelSerializer):
	token = serializers.SerializerMethodField()
	
	def get_token(self, obj):
		return obj.token
	
	class Meta:
		model = User
		fields = ('id', 'email', 'password', 'token')


class NomSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('last_name',)


##########################################
# Serializer concernant les fournisseurs #
##########################################

class FournisseurSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fournisseur
		fields = (
			'id_fournisseur', 'name', 'TVA_number', 'iban', 'country', 'street', 'city', 'postcode', 'contact_lastname',
			'contact_firstname', 'email')


class UserFournisseurSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserFournisseur
		fields = ('id_user', 'id_fournisseur')


class UserFournisseurDetailSerializer(serializers.ModelSerializer):
	fournisseur = FournisseurSerializer(source='id_fournisseur', read_only=True)
	
	class Meta:
		model = UserFournisseur
		fields = ('id_user', 'fournisseur')


##########################################
#    Serializer concernant les clients   #
##########################################

class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = (
			'id_client', 'firstname', 'lastname', 'country', 'company_name', 'TVA_number', 'street', 'city', 'postcode')


class UserClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserClient
		fields = ('id_user', 'id_client')


class UserClientDetailSerializer(serializers.ModelSerializer):
	client = ClientSerializer(source='id_client', read_only=True)
	
	class Meta:
		model = UserClient
		fields = ('id_user', 'client')


##########################################
#   Serializer concernant les factures   #
##########################################

class FactureSerializer(serializers.ModelSerializer):
	class Meta:
		model = Facture
		fields = ('id_facture', 'dateFacturation', 'montant', 'nomDeFichier', 'id_fournisseur', 'id_client')


class UserFactureDetailSerializer(serializers.ModelSerializer):
	facture = FactureSerializer(source='id_facture', read_only=True)
	
	class Meta:
		model = Facture
		fields = ('id_user', 'facture')


class TierFactureDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Facture
		fields = ('id_facture', 'id_fournisseur', 'id_client')
