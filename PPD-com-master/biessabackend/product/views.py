from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Prefetch
from .models import Product, Product_seller
from .serializers import ProductSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, Prefetch

class ProductCatalogView(APIView):
    def get(self, request, category=None):
        queryset = Product.objects.prefetch_related(
            Prefetch('product_seller_set',
                   queryset=Product_seller.objects.select_related(
                       'seller',
                       'seller__user'
                   ).filter(quantity__gt=0))
        )
                
        
        if category:
            queryset = queryset.filter(category__iexact=category)
            
        search_query = request.GET.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(product_name__icontains=search_query) |
                Q(brand__icontains=search_query) |
                Q(product_description__icontains=search_query))
        
        serializer = ProductSerializer(
            queryset,
            many=True,
            context={'request': request}
        )
        
        return Response({
            'status': 'success',
            'count': len(serializer.data),
            'products': serializer.data
        })