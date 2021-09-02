from django.http.response import JsonResponse

# //serializers Django import 

from django.core import serializers
from .models import cityStat
from django.shortcuts import render

from django.http import HttpResponse

from django.db.models import Sum

def numActiveCase(x,y,z):
    case=x-(y+z)
    return case 



def index(request):
    ncas=cityStat.objects.aggregate(Sum('Ncas'))
    ndeces=cityStat.objects.aggregate(Sum('Ndeces'))
    ngueris=cityStat.objects.aggregate(Sum('Ngueris'))
    casActif=numActiveCase(ncas['Ncas__sum'],ndeces['Ndeces__sum'],ngueris['Ngueris__sum'])  
    title='HOME'
    return render(request,'index.html',{'titre':title,'ncas':ncas,'ndeces':ndeces,'ngueris':ngueris,'casActif':casActif,})


def stat(request):
    ncas=serializers.serialize("json",cityStat.objects.all())
    title='statistique'
    return render(request,'statistique.html',{'titre':title,'ncas':ncas})

def cartographie(request):
    
    ncas=serializers.serialize("json",cityStat.objects.all())
    # Convertir les données en JSON

    title='Cartographie'
    

    return render(request,'carte.html',{'titre':title,'ncas':ncas})


def About(request):
  
    return render(request,'AboutTemplate.html')

def symptom(request):
  
    return render(request,'symptom.html')

def prevention(request):
  
    return render(request,'prevention.html')


def question(request):
  
    return render(request,'question.html')