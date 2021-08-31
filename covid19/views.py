from django.http.response import JsonResponse

# //serializers Django import 

from django.core import serializers
from .models import cityStat
from django.shortcuts import render

from django.http import HttpResponse

from django.db.models import Sum




def index(request):
    ncas=cityStat.objects.aggregate(Sum('Ncas'))
    title='HOME'
    return render(request,'index.html',{'titre':title,'ncas':ncas})


def stat(request):
    ncas=cityStat.objects.aggregate(Sum('Ncas'))
    title='statistique'
    return render(request,'statistique.html',{'titre':title,'ncas':ncas})

def cartographie(request):
    
    ncas=serializers.serialize("json",cityStat.objects.all())
    # Convertir les données en JSON

    title='Cartographie'
    

    return render(request,'carte.html',{'titre':title,'ncas':ncas})
  