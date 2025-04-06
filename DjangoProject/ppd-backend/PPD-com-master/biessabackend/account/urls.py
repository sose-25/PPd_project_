from django.urls import path, include
from . import views

urlpatterns = [
    path('signup/',views.RegisterUserView.as_view(),name='signup'),
    path('signin/',views.user_login,name='signin'),
    path('cart/', include('cart.urls'))
]
