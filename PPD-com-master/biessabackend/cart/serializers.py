from rest_framework import serializers
from .models import *

class OrdersdetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="order_products.product.product_name", read_only=True)
    seller_name = serializers.CharField(source="order_products.seller.username", read_only=True)

    class Meta:
        model = Ordersdetails
        fields = ['id', 'product_name', 'seller_name', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    orderdetails = OrdersdetailSerializer(many=True, read_only=True, source="orderdetails_set")
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'client', 'orderdetails', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()


class OrdersSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.User.username", read_only=True)
    order_details = OrdersdetailSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = ['id', 'client', 'client_name', 'status', 'order_details', 'order_date', 'total_price']
        read_only_fields = ['client', 'order_date', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()
