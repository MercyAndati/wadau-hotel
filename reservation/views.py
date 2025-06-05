from django.shortcuts import render

def index(request):
    return render(request, 'reservation/index.html')

def category(request):
    category = request.GET.get('category')
    subcategory = request.GET.get('subcategory')
    subsubcategory = request.GET.get('subsubcategory')

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

