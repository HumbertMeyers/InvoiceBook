# Generated by Django 3.0.7 on 2020-07-29 09:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id_Client', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=45)),
                ('numeroTVA', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'Clients',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Factures',
            fields=[
                ('id_Facture', models.AutoField(primary_key=True, serialize=False)),
                ('dateFacturation', models.DateField()),
                ('montant', models.DecimalField(decimal_places=2, max_digits=11)),
                ('nomDeFichier', models.FileField(upload_to='')),
                ('numeroTVA', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'Factures',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Fournisseurs',
            fields=[
                ('id_Fournisseur', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=45)),
                ('numeroTVA', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'Fournisseurs',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'User',
                'managed': True,
            },
        ),
        migrations.AddConstraint(
            model_name='user',
            constraint=models.UniqueConstraint(fields=('email',), name='unique_email'),
        ),
        migrations.AddField(
            model_name='fournisseurs',
            name='id_User',
            field=models.ForeignKey(db_column='id_User', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.User'),
        ),
        migrations.AddField(
            model_name='factures',
            name='id_Client',
            field=models.ForeignKey(db_column='id_Cient', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.Clients'),
        ),
        migrations.AddField(
            model_name='factures',
            name='id_Fournisseur',
            field=models.ForeignKey(db_column='id_Fournisseur', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.Fournisseurs'),
        ),
        migrations.AddField(
            model_name='factures',
            name='id_User',
            field=models.ForeignKey(db_column='id_User', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.User'),
        ),
        migrations.AddField(
            model_name='clients',
            name='id_User',
            field=models.ForeignKey(db_column='id_User', on_delete=django.db.models.deletion.DO_NOTHING, to='InvoiceBook.User'),
        ),
        migrations.AlterUniqueTogether(
            name='fournisseurs',
            unique_together={('nom', 'id_User')},
        ),
        migrations.AlterUniqueTogether(
            name='clients',
            unique_together={('nom', 'id_User')},
        ),
    ]
