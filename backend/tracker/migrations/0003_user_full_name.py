# Generated by Django 5.0.4 on 2024-04-07 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0002_rename_district_user_aadhaar_no_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='full_name',
            field=models.CharField(default='Jannat', max_length=100),
            preserve_default=False,
        ),
    ]