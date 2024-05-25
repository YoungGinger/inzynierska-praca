# Generated by Django 4.2.7 on 2024-05-19 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_achievement'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='goals',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='matches',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='red_cards',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='two_minute_penalties',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='yellow_cards',
            field=models.IntegerField(default=0),
        ),
    ]
