from django.contrib import admin
from .models import User, Client, Seller, Product, Product_seller, Orderdetails, Order, Payment
#from biessabackend.cart.models import *
# Register your models
admin.site.register(User)
admin.site.register(Client)
admin.site.register(Seller)
admin.site.register(Product)
admin.site.register(Product_seller)
admin.site.register(Orderdetails)
admin.site.register(Order)
#admin.site.register(Cart)
admin.site.register(Payment)

