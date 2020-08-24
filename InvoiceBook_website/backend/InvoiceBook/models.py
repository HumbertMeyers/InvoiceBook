from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
	pass
	
	
class Fournisseur(models.Model):
	id_fournisseur = models.AutoField(primary_key=True)
	nom = models.CharField(max_length=45)
	numeroTVA = models.CharField(max_length=20)
	
	class Meta:
		managed = True
		db_table = 'Fournisseurs'
		unique_together = (('nom', 'numeroTVA'),)


class Client(models.Model):
	id_client = models.AutoField(primary_key=True)
	nom = models.CharField(max_length=45)
	numeroTVA = models.CharField(max_length=20, blank=True, null=True)
	
	class Meta:
		managed = True
		db_table = 'Clients'
		unique_together = (('nom', 'numeroTVA'),)


class Facture(models.Model):
	id_facture = models.AutoField(primary_key=True)
	dateFacturation = models.DateField()
	montant = models.DecimalField(max_digits=11, decimal_places=2)
	nomDeFichier = models.FileField()
	id_fournisseur = models.ForeignKey('Fournisseur', models.DO_NOTHING, db_column='id_fournisseur', blank=True, null=True)
	id_client = models.ForeignKey('Client', models.DO_NOTHING, db_column='id_cient', blank=True, null=True)
	
	class Meta:
		managed = True
		db_table = 'AjoutFactures'


class UserFournisseur(models.Model):
	id_userFournisseur = models.AutoField(primary_key=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id')
	id_fournisseur = models.ForeignKey('Fournisseur', models.DO_NOTHING, db_column='id_fournisseur')
	
	class Meta:
		managed = True
		db_table = 'UserFournisseurs'


class UserClient(models.Model):
	id_userClient = models.AutoField(primary_key=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id')
	id_client = models.ForeignKey('Client', models.DO_NOTHING, db_column='id_client')
	
	class Meta:
		managed = True
		db_table = 'UserClients'


class UserFacture(models.Model):
	id_userFacture = models.AutoField(primary_key=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id')
	id_facture = models.ForeignKey('Facture', models.DO_NOTHING, db_column='id_facture')

	class Meta:
		managed = True
		db_table = 'UserFactures'
