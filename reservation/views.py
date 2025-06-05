from django.shortcuts import render
from django.http import Http404

def index(request):
    return render(request, 'reservation/index.html')

def category(request):
    # Get query parameters
    category = request.GET.get('category')
    subcategory = request.GET.get('subcategory')
    subsubcategory = request.GET.get('subsubcategory')

    # If no category is provided, redirect to home
    if not category:
        return render(request, 'reservation/index.html')

    context = {
        'category': category,
        'subcategory': subcategory,
        'subsubcategory': subsubcategory,
    }

    return render(request, 'reservation/category.html', context)


def mytray(request):
    return render(request, 'reservation/mytray.html')

def payment(request):
    return render(request, 'reservation/payment.html')

def subscription(request):
    return render(request, 'reservation/subscription.html')

