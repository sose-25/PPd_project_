from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator


class User(AbstractUser):
    Role_choices = [
        ('client', 'Client'),
        ('seller', 'Seller'),
    ]

    age = models.IntegerField(validators=[MinValueValidator(18)], null=True)
    phone_number = models.CharField(max_length=15, null=True, default=None)  # Changed to snake_case
    address = models.CharField(max_length=100, null=True)
    rs_number = models.IntegerField(unique=True, blank=True, null=True)  # Changed to snake_case
    role = models.CharField(max_length=10, choices=Role_choices)

    def save(self, *args, **kwargs):
        if self.pk is None:  # Only hash password for new users
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} ({self.email})"  # Fixed parenthesis here

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class Report(models.Model):
    status_choices = [
        ('pending','Pending'),
        ('approved','Approved'),
        ('rejected','Rejected')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    report_date = models.DateTimeField(auto_now_add=True)
    report_type = models.CharField(max_length=100)
    reason = models.CharField(max_length=100)
    report_status = models.CharField(max_length=10, choices=status_choices)

    def __str__(self):
        return f"{self.user.username} ({self.report_type})"

class Client(models.Model):
     user = models.OneToOneField(User, on_delete=models.CASCADE , null=True , default=None)
     purchase_history = models.TextField(blank=True, null=True)
     
     def __str__(self):
        return f"{self.user.username} "
    
    
class Seller(models.Model):
          user = models.OneToOneField(User, on_delete=models.CASCADE , null=True , default=None)
          shop_name = models.CharField(max_length=100)
          business_registration_number = models.CharField(max_length=50, unique=True,null=True)
          address = models.CharField(max_length=255)
          
          
          def __str__(self):
             return f"{self.user.username} "
         
    
# Signal to create corresponding role objects based on the role selected
@receiver(post_save, sender=User)
def create_role_instance(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'seller':
            Seller.objects.create(user=instance)
        elif instance.role == 'client':
            Client.objects.create(user=instance)


class Product(models.Model):
    
    product_name = models.CharField(max_length=100)
    product_size = models.DecimalField(max_digits=10, decimal_places=2)
    product_description = models.TextField(blank=True, null=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    category = models.IntegerField(blank=False, null=False)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.product_name


class Product_seller(models.Model):
    choose_condition = [
        ('new', 'New'),
        ('used', 'Used'),
    ]
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition = models.CharField(max_length=10, choices=choose_condition)

    def __str__(self):
        return f"{self.seller.user.username} - {self.product.product_name}"

class Orderdetails(models.Model):
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    order_products = models.ForeignKey(Product_seller, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.quantity} of {self.order_products.product.product_name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    order_details = models.ManyToManyField(Orderdetails)
    order_date = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return sum(detail.quantity * detail.order_products.price for detail in self.order_details.all())

    def __str__(self):
        return f"Order {self.id} - {self.client.user.username} - Total: {self.total_price()}"

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('card', 'Card')
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Payment {self.payment_method} - {self.order.client.username} - Total: {self.amount}"

