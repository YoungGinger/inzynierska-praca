# Generated by Django 4.2.7 on 2024-05-16 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_photo_alter_user_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
