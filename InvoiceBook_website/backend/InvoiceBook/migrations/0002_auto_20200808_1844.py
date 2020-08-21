# Generated by Django 3.1 on 2020-08-08 16:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('InvoiceBook', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userclient',
            name='id_user',
            field=models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userfacture',
            name='id_user',
            field=models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userfournisseur',
            name='id_user',
            field=models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
