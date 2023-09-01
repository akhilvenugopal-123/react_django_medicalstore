from django.db import models


# Create your models here.

from django.contrib.auth.models import User

class Medicine(models.Model):

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=100)

    description = models.TextField()

    price = models.DecimalField(max_digits=20, decimal_places=3)

    remaining_stock = models.PositiveIntegerField(default=0)

    expiry_date = models.DateField(default="2023-01-01")

    company = models.CharField(max_length=100,blank=True)

    def __str__(self):

        return self.name