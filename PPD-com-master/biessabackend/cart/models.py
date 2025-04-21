from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.db.models.signals import post_save
from django.dispatch import receiver
from account.models import *


class Cart(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    def total_price(self):
        return sum(item.order_products.price * item.quantity for item in self.cart_details.all())

class Ordersdetails(models.Model):
    order = models.ForeignKey('Orders', on_delete=models.CASCADE, null=True, blank=True, related_name='orders_details')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True, blank=True, related_name='cart_details')
    quantity = models.IntegerField(default=1)
    order_products = models.ForeignKey(Product_seller, on_delete=models.CASCADE)

    def __str__(self):
        if self.order:
            return f"{self.quantity} from {self.order_products.product.product_name} (Order Number {self.order.id})"
        else:
            return f"{self.quantity} from {self.order_products.product.product_name} (In cart)"

class Orders(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return sum(detail.quantity * detail.order_products.price for detail in self.orders_details.all())

    def __str__(self):
        return f"Order {self.id} - {self.client.user.username} - Total: {self.total_price()}"

class Paymentord(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('card', 'Card')
    ]
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Payment {self.payment_method} - {self.order.client.username} - Total: {self.amount}"