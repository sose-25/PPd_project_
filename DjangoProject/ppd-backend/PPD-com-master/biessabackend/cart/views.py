from urllib import request

from django.db import transaction
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Ordersdetails, Cart, Client, Product_seller, Order, Product
from .serializers import *

@api_view(['POST'])
def create_cart(request, product_seller_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "You have to login first"}, status=status.HTTP_401_UNAUTHORIZED)

    client = get_object_or_404(Client, user=user)
    cart, created = Cart.objects.get_or_create(client=client)

    request.session['cart_id'] = cart.id
    request.session.modified = True

    product_seller = get_object_or_404(Product_seller, id=product_seller_id)

    if product_seller.quantity < 1:
        return Response({"error": "Product out of stock"}, status=status.HTTP_400_BAD_REQUEST)

    order_detail, created = Ordersdetails.objects.get_or_create(cart=cart, order_products=product_seller)

    if not created:
        if order_detail.quantity + 1 > product_seller.quantity:
            return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)
        order_detail.quantity += 1

    order_detail.save()
    total_price = cart.total_price() if hasattr(cart, 'total_price') else None

    return Response(
        {
            "message": "Product added to cart successfully",
            "cart_id": cart.id,
            "total_price": total_price,
            "product_name": product_seller.product.product_name,
            "quantity": order_detail.quantity,
        },
        status=status.HTTP_201_CREATED,
    )

@api_view(['GET'])
def get_cart(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "You have to login first"}, status=status.HTTP_401_UNAUTHORIZED)

    cart_id = request.session.get('cart_id')
    if not cart_id:
        return Response({"error": "Cart not found in session"}, status=status.HTTP_404_NOT_FOUND)

    cart = get_object_or_404(Cart, id=cart_id)
    cart_items = Ordersdetails.objects.filter(cart=cart)

    cart_data = [
        {
            "product_name": item.order_products.product.product_name,
            "quantity": item.quantity,
            "price_per_unit": item.order_products.price,
            "total_price": item.quantity * item.order_products.price,
        }
        for item in cart_items
    ]

    total_price = cart.total_price() if hasattr(cart, 'total_price') else sum(item["total_price"] for item in cart_data)

    return Response({"cart": cart_data, "total_price": total_price}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_cart(request, product_seller_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "You have to login first"}, status=status.HTTP_401_UNAUTHORIZED)

    cart_id = request.session.get('cart_id')
    if not cart_id:
        return Response({"error": "Cart not found in session"}, status=status.HTTP_404_NOT_FOUND)

    cart = get_object_or_404(Cart, id=cart_id)
    order_detail = get_object_or_404(Ordersdetails, cart=cart, order_products_id=product_seller_id)

    new_quantity = request.data.get("quantity")
    if new_quantity is None or new_quantity < 1:
        order_detail.delete()
        return Response({"message": "Product removed from cart"}, status=status.HTTP_204_NO_CONTENT)

    if new_quantity > order_detail.order_products.quantity:
        return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)

    order_detail.quantity = new_quantity
    order_detail.save()

    total_price = cart.total_price() if hasattr(cart, 'total_price') else None

    return Response({
        "message": "Cart updated successfully",
        "cart_id": cart.id,
        "product_name": order_detail.order_products.product.product_name,
        "quantity": order_detail.quantity,
        "total_price": total_price,
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_cart(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "You have to login first"}, status=status.HTTP_401_UNAUTHORIZED)

    cart_id = request.session.get('cart_id')
    if not cart_id:
        return Response({"error": "Cart not found in session"}, status=status.HTTP_404_NOT_FOUND)

    cart = get_object_or_404(Cart, id=cart_id)
    Ordersdetails.objects.filter(cart=cart).delete()
    cart.delete()

    request.session.pop('cart_id', None)
    request.session.modified = True

    return Response({"message": "Cart cleared successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def add_order(request):
    user = request.user

    if not user.is_authenticated or not hasattr(user, 'client'):
        return Response({'error': 'You must log in to place an order'}, status=status.HTTP_403_FORBIDDEN)

    client = user.client
    cart_id = request.session.get('cart_id')

    if not cart_id:
        return Response({'error': 'Cart not found in session'}, status=status.HTTP_404_NOT_FOUND)

    cart = get_object_or_404(Cart, id=cart_id)
    cart_items = Ordersdetails.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({'error': 'No items in cart'}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        order = Orders.objects.create(client=client, status='pending')

        for item in cart_items:
            if item.quantity > item.order_products.quantity:
                return Response({'error': f'Not enough stock for {item.order_products.product.product_name}'},
                                status=status.HTTP_400_BAD_REQUEST)

            item.order_products.quantity -= item.quantity
            item.order_products.save()

            Ordersdetails.objects.create(
                order=order,
                order_products=item.order_products,
                quantity=item.quantity
            )

        cart_items.delete()
        cart.delete()
        request.session.pop('cart_id', None)
        request.session.modified = True

    return Response({
        "message": "Order placed successfully",
        "order_id": order.id,
        "client_name": client.user.get_full_name() or client.user.username,
        "status": order.status,
    }, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def remove_order(request,order_id):
    user = request.user
    if not user.is_authenticated or not hasattr(user, 'client'):
        return Response({'error': 'You must log in to remove an order'}, status=status.HTTP_403_FORBIDDEN)

    order = get_object_or_404(Orders, id=order_id, client=user.client)

    if order.status != 'pending':
        return Response({'error': 'Only pending orders can be deleted'}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        for item in order.orders_details.all():
            item.order_products.quantity += item.quantity
            item.order_products.save()

        order.orders_details.all().delete()
        order.delete()

    return Response({"message": "Order deleted successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def show_orders(request):
    user = request.user
    if not user.is_authenticated or not hasattr(user, 'client'):
        return Response({'error': 'You must log in to see your orders'}, status=status.HTTP_403_FORBIDDEN)

    orders = Orders.objects.filter(client=user.client).order_by('order_date')

    order_list = []
    for order in orders:
        order_list.append({
            "order_id": order.id,
            "status": order.status,
            "order_date": order.order_date,
            "total_price": order.total_price(),
            "items": [
                {
                    "product": detail.order_products.product.product_name,
                    "quantity": detail.quantity,
                    "price": detail.order_products.price
                }
                for detail in order.orders_details.all()
            ]
        })

    return Response({"orders": order_list}, status=status.HTTP_200_OK)
