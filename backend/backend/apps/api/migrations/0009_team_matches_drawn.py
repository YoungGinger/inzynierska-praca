# Generated by Django 4.2.7 on 2024-05-19 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_team_match_date_match'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='matches_drawn',
            field=models.IntegerField(default=0),
        ),
    ]