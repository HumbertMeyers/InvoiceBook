# Generated by Django 3.0.7 on 2020-07-29 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('InvoiceBook', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='facture',
            name='numeroTVA',
        ),
        migrations.AlterField(
            model_name='facture',
            name='id_Client',
            field=models.ForeignKey(blank=True, db_column='id_Cient', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.Client'),
        ),
        migrations.AlterField(
            model_name='facture',
            name='id_Fournisseur',
            field=models.ForeignKey(blank=True, db_column='id_Fournisseur', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.Fournisseur'),
        ),
    ]
