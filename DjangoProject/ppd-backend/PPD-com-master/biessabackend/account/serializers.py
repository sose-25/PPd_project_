# serializers.py
from rest_framework import serializers
from .models import *  # Ensure you're importing the custom User model

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username','password','role']

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        exclude = ('User',)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        exclude = ('User',)

class OrderdetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="order_products.product.product_name", read_only=True)
    seller_name = serializers.CharField(source="order_products.seller.username", read_only=True)  # Fix here
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product_seller.objects.all(), write_only=True)

    class Meta:
        model = Orderdetails
        fields = ['id', 'product_id', 'product_name', 'seller_name', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.User.username", read_only=True)
    order_details = OrderdetailSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'client', 'client_name', 'status', 'order_details', 'order_date', 'total_price']
        read_only_fields = ['client', 'order_date', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()
