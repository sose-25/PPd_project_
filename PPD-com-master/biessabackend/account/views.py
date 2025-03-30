from django.db import transaction
from django.shortcuts import render
from rest_framework.generics import *
from rest_framework.permissions import IsAuthenticated
from .serializers import * 
from .models import User
from rest_framework import *
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
import requests
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
# Create your views here.

    
class RegisterUserView(CreateAPIView):
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        else:
            # print("Invalid data received:")
            # print(request.data)
            # print("Serializer errors:")
            # print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        print(f"Attempting login with username/email: {username} and password: {password}")

        user = None

        if '@' in username:
            try:
                user = User.objects.get(email=username)
                print(f"User found by email: {user}")
            except ObjectDoesNotExist:
                print(f"No user found with email: {username}")

        if not user:
            user = authenticate(username=username, password=password)
            if user:
                print(f"User authenticated with username: {user}")
            else:
                print("Authentication failed for username/email.")

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)

            # Check if the user is a Tutor
            seller_data = None
            try:
                seller = Seller.objects.get(user=user)
                seller_data = SellerSerializer(seller).data  # Serialize Tutor data
            except Seller.DoesNotExist:
                print("User is not a seller.")

            return Response({
                'id': user.id,
                'token': token.key,
                'message': 'successful login',
                'username': serializer.data.get('username', None),
                'role': serializer.data.get('role', None),
                'is_seller': seller_data is not None,  # Boolean flag to indicate tutor status
                'seller_details': seller_data  # Return tutor details if they exist
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
