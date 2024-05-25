# Generated by Django 4.2.7 on 2024-05-19 02:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_team_matches_drawn'),
    ]

    operations = [
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('date', models.DateField()),
                ('goals', models.IntegerField(default=0)),
                ('matches', models.IntegerField(default=0)),
                ('two_minute_penalties', models.IntegerField(default=0)),
                ('yellow_cards', models.IntegerField(default=0)),
                ('red_cards', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]