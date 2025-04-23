from . import views
from django.urls import path
from .views import *

urlpatterns = [
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
]
