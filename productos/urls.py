from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cart', views.cart, name='cart'),
    path('add/<int:id>', views.add, name='add'),
    path('delete/<int:id>', views.delete, name='delete'),
    path('buy', views.buy, name='buy'),
]