from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse   
import requests
from django.utils import timezone
from datetime import timedelta, date, datetime
import json

headers={'access_token': '22636ca690d932cc523065f4b3dea68ed3184bdb'}
url_producto='http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8383/v2/markets/1/collection/2/market_info.json'
response_producto = requests.get(url_producto, headers=headers).json()['data']
# params={'search_text': 'PISCO TRES ERRES 35º'}

url_market='http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8585/v1/cart.json'

# response_market = requests.get(url_market, data=data, headers=headers)

cart_list=[]

def index(request):
    context={'productos': response_producto}
    # print(context)
    return render(request, "productos/index.html", context)
    
       
def cart(request):
    context={'product_list': None}
    if len(cart_list)!=0:
        product_list=[]
        for i in cart_list:
            a = list(filter(lambda x:  i==x['id'], response_producto))[0]
            product_list.append(a)
        context={'product_list': product_list}
    # print(product_list)
    return render(request, "productos/cart.html", context)



def add(request, id):
    cart_list.append(id)
    print(cart_list)
    return redirect(reverse('index'))


def delete(request, id):
    cart_list.remove(id)
    return redirect(reverse('cart'))

def buy(request):
    print(request.POST['data'])
    data=request.POST['data']
    response_market = requests.get(url_market, data=data, headers=headers)
    print(response_market.json())
    cart_list.clear()
    return redirect(reverse('cart'))



    # headers={'access_token': '22636ca690d932cc523065f4b3dea68ed3184bdb'}
    # url_market='http://ec2-54-183-147-121.us-west-1.compute.amazonaws.com:8585/v1/cart.json'
    # data={"cartDetails": [{"quantity": 1,"unitValue": 1, "idVarianteProducto": 1}]}
    # response_market = requests.get(url_market, data=data, headers=headers)
    # print(response_market.json()['data'])
    # context={'productos': response_producto.json()['data'] }
    # print(context)
