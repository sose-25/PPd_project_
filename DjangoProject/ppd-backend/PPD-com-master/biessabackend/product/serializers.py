from rest_framework import serializers
from .models import *






class MinimalSellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['id', 'shop_name', 'address']

class ProductSellerSerializer(serializers.ModelSerializer):
    seller = MinimalSellerSerializer()
    condition_display = serializers.CharField(source='get_condition_display', read_only=True)
    
    class Meta:
        model = Product_seller
        fields = ['id', 'seller', 'price', 'condition', 'condition_display', 'quantity']

class ProductSerializer(serializers.ModelSerializer):
    available_sellers = ProductSellerSerializer(
        source='product_seller_set', 
        many=True,
        read_only=True
    )
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id',
            'product_name',
            'product_description',
            'brand',
            'model',
            'year',
            'category',
            'image_url',
            'available_sellers'
        ]
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None