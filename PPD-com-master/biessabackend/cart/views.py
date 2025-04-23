from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import CreateOrderSerializer

class CreateOrderView(generics.CreateAPIView):
    serializer_class = CreateOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if not hasattr(request.user, 'client'):
            return Response({'error': 'You must be a client to place an order.'}, status=status.HTTP_403_FORBIDDEN)

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()
