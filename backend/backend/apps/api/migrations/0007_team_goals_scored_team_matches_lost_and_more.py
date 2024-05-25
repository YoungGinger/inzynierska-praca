# Generated by Django 4.2.7 on 2024-05-19 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_team_training_match'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='goals_scored',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='team',
            name='matches_lost',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='team',
            name='matches_played',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='team',
            name='matches_won',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='team',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Match',
        ),
    ]