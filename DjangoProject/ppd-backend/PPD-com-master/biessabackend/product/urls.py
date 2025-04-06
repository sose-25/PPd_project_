from . import views
from django.urls import path



from .views import ProductCatalogView

urlpatterns = [
    path('', ProductCatalogView.as_view(), name='product-list'),  # Handles /api/products/
    path('category/<str:category>/', ProductCatalogView.as_view(), name='product-category'),
    path('search/', ProductCatalogView.as_view(), name='product-search'),
]