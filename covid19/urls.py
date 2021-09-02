# importer le chemin 
from django.urls import path

from . import views

urlpatterns = [
    path('',views.index),
    path('home',views.index),
    path('statistique',views.stat),
    path('carte',views.cartographie),
    path('apropos',views.About),
    path('symptom',views.symptom),
    path('prevention',views.prevention),
    path('question',views.question),
]
