from django.db import models
from django.contrib.auth.models import AbstractUser
from internationalflavor.countries import CountryField
from internationalflavor.iban import IBANField
from internationalflavor.vat_number import VATNumberField


# Create your models here.

class User(AbstractUser):
	pass


class Fournisseur(models.Model):
	id_fournisseur = models.AutoField(primary_key=True)
	name = models.CharField(max_length=45, default='')
	TVA_number = VATNumberField(default="BE0000000000", eu_only=True)
	iban = IBANField(countries=None, sepa_only=True)
	country = CountryField(default="BE")
	street = models.CharField(max_length=100, default='')
	city = models.CharField(max_length=45, default='')
	postcode = models.IntegerField(blank=True, null=True)
	contact_lastname = models.CharField(max_length=45, blank=True, null=True)
	contact_firstname = models.CharField(max_length=45, blank=True, null=True)
	email = models.EmailField(max_length=256, blank=True, null=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id', default=None)
	
	class Meta:
		managed = True
		db_table = 'Fournisseurs'
		unique_together = (('name', 'TVA_number', 'iban'),)


class Client(models.Model):
	id_client = models.AutoField(primary_key=True)
	firstname = models.CharField(max_length=45, default='')
	lastname = models.CharField(max_length=45, default='')
	country = CountryField(default="BE")
	company_name = models.CharField(max_length=45, blank=True, null=True)
	TVA_number = VATNumberField(default="BE0000000000", eu_only=True, blank=True, null=True)
	street = models.CharField(max_length=100, blank=True, null=True)
	city = models.CharField(max_length=45, blank=True, null=True)
	postcode = models.IntegerField(blank=True, null=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id', default=None)
	
	class Meta:
		managed = True
		db_table = 'Clients'
		unique_together = (('firstname', 'lastname', 'TVA_number'),)


class Facture(models.Model):
	id_facture = models.AutoField(primary_key=True)
	numFacture = models.CharField(max_length=100, default=None)
	dateFacturation = models.DateField()
	montant = models.DecimalField(max_digits=11, decimal_places=2)
	nomDeFichier = models.FileField()
	id_fournisseur = models.ForeignKey('Fournisseur', models.DO_NOTHING, db_column='id_fournisseur', blank=True,
																		 null=True)
	id_client = models.ForeignKey('Client', models.DO_NOTHING, db_column='id_client', blank=True, null=True)
	id_user = models.ForeignKey('User', models.DO_NOTHING, db_column='id', default=None)
	
	class Meta:
		managed = True
		db_table = 'Factures'
