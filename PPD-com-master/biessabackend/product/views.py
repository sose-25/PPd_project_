from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Prefetch
from .models import Product, Product_seller
from .serializers import *
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

class ProductSellerSearchViewSet(viewsets.ReadOnlyModelViewSet):
        serializer_class = ProductSellerSerializerSearch

        def get_queryset(self):
            queryset = Product_seller.objects.select_related('product', 'seller__user').all()
            search = self.request.query_params.get('search', None)
            if search:
                terms = search.split()
                for term in terms:
                    queryset = queryset.filter(
                        Q(product__product_name__icontains=term) |
                        Q(product__brand__icontains=term) |
                        Q(product__model__icontains=term) |
                        Q(product__year__icontains=term) |
                        Q(product__category__icontains=term) |
                        Q(product__product_description__icontains=term)
                    )
            return queryset


@api_view(['POST'])
def create_product_seller(request):
    if request.method == 'POST':
        serializer = ProductSellerSerializerCUD(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_product_seller(request, pk):
    try:
        product_seller = Product_seller.objects.get(pk=pk)
    except Product_seller.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProductSellerSerializerCUD(product_seller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product_seller(request, pk):
    try:
        product_seller = Product_seller.objects.get(pk=pk)
    except Product_seller.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        product_seller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    class ProductPriceFilterView(ListAPIView):
        serializer_class = ProductSellerSerializer

        def get_queryset(self):
            queryset = Product_seller.objects.all()

            min_price = self.request.query_params.get('min_price')
            max_price = self.request.query_params.get('max_price')

            try:
                if min_price is not None:
                    min_price = float(min_price)
                    queryset = queryset.filter(price__gte=min_price)
                if max_price is not None:
                    max_price = float(max_price)
                    queryset = queryset.filter(price__lte=max_price)
            except ValueError:
                raise ValidationError({"error": "provide a number please"})
            return queryset
