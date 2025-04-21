from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'product-seller-search', ProductSellerSearchViewSet, basename='product-seller-search')

urlpatterns = [
    path('', ProductCatalogView.as_view(), name='product-list'),  # Handles /api/products/
    path('category/<str:category>/', ProductCatalogView.as_view(), name='product-category'),
    path('search/', ProductCatalogView.as_view(), name='product-search'),
    path('product_seller/create/', views.create_product_seller, name='create_product_seller'),
    path('product_seller/update/<int:pk>/', views.update_product_seller, name='update_product_seller'),
    path('product_seller/delete/<int:pk>/', views.delete_product_seller, name='delete_product_seller'),
    path('', include(router.urls)),
]