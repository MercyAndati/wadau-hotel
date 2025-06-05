from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('category/', views.category, name='category'),
    path('mytray/', views.mytray, name='mytray'),
    path('payment/', views.payment, name='payment'),
    path('subscription/', views.subscription, name='subscription'),
]
