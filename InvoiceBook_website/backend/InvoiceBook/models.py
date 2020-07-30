from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class User(models.Model):
	id_User= models.AutoField(primary_key=True)
	nom = models.CharField(max_length=50)
	email = models.EmailField(max_length=100)
	password = models.CharField(max_length=100)

	def get_by_natural_key(self, username):
		return self.get(email=username)

	class Meta:
		managed = True
		constraints = [
			models.UniqueConstraint(fields=['email'], name='unique_email'),
		]
		db_table = 'User'
		
class Fournisseur(models.Model):
	id_Fournisseur = models.AutoField(primary_key=True)
	id_User = models.ForeignKey(User, models.DO_NOTHING, db_column='id_User')
	nom = models.CharField(max_length=45)
	numeroTVA = models.CharField(max_length=20)

	class Meta:
		managed = True
		db_table = 'Fournisseurs'
		unique_together = (('nom', 'id_User'),)
		
class Client(models.Model):
	id_Client = models.AutoField(primary_key=True)
	id_User = models.ForeignKey(User, models.DO_NOTHING, db_column='id_User')
	nom = models.CharField(max_length=45)
	numeroTVA = models.CharField(max_length=20, blank=True, null=True)

	class Meta:
		managed = True
		db_table = 'Clients'
		unique_together = (('nom', 'id_User'),)
		
class Facture(models.Model):
	id_Facture = models.AutoField(primary_key=True)
	dateFacturation = models.DateField()
	montant = models.DecimalField(max_digits=11, decimal_places=2)
	nomDeFichier = models.FileField()
	id_User = models.ForeignKey(User, models.DO_NOTHING, db_column='id_User')
	id_Fournisseur = models.ForeignKey(Fournisseur, models.DO_NOTHING, db_column='id_Fournisseur', blank=True, null=True)
	id_Client = models.ForeignKey(Client, models.DO_NOTHING, db_column='id_Cient', blank=True, null=True)

	class Meta:
		managed = True
		db_table = 'Factures'