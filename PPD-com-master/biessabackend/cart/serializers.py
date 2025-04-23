from django.db import transaction
from rest_framework import serializers
from .models import Order, Orderdetails, Product_seller, Client


class OrderItemSerializer(serializers.Serializer):
    product_seller_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class CreateOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = ['id', 'client', 'status', 'items', 'order_date']
        read_only_fields = ['id', 'client', 'status', 'order_date']

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")

        for item in value:
            product_seller_id = item['product_seller_id']
            quantity = item['quantity']

            try:
                product_seller = Product_seller.objects.get(id=product_seller_id)
                if product_seller.quantity < quantity:
                    raise serializers.ValidationError(
                        f"Not enough stock for {product_seller.product.product_name}. Available: {product_seller.quantity}"
                    )
            except Product_seller.DoesNotExist:
                raise serializers.ValidationError(
                    f"Product seller with id {product_seller_id} does not exist."
                )

        return value

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            client = Client.objects.get(user=user)
        except Client.DoesNotExist:
            raise serializers.ValidationError("User is not registered as a client.")

        items = validated_data.pop('items')

        with transaction.atomic():
            order = Order.objects.create(client=client, status='pending')

            for item in items:
                product_seller = Product_seller.objects.select_for_update().get(
                    id=item['product_seller_id']
                )
                quantity = item['quantity']

                product_seller.quantity -= quantity
                product_seller.save()

                order_detail = Orderdetails.objects.create(
                    order_products=product_seller,
                    quantity=quantity
                )

                order.order_details.add(order_detail)

                order.pro_seller.add(product_seller)

        return order

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        order_details = instance.order_details.all()

        representation['items'] = [
            {
                'product_seller_id': detail.order_products.id,
                'product_name': detail.order_products.product.product_name,
                'quantity': detail.quantity,
                'price': float(detail.order_products.price),
                'total_price': float(detail.quantity * detail.order_products.price)
            }
            for detail in order_details
        ]

        representation['total_price'] = float(instance.total_price())

        return representation