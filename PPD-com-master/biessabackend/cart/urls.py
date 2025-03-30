from . import views
from django.urls import path
from .views import create_cart, get_cart,update_cart,delete_cart, add_order

urlpatterns = [
    path('addcart/<int:product_seller_id>/',create_cart,name='create_cart'),
    path('showcart/',get_cart,name='get_cart'),
    path('updatecart/<int:product_seller_id>/',update_cart,name='update_cart'),
    path('clearcart/',delete_cart,name='delete_cart'),
    path('addorder',add_order,name='add_order'),
]