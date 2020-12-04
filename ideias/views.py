from django.shortcuts import render
from rest_framework import viewsets
from ideias.models import Ideia
from ideias.serializers import IdeiaSerializer

# Create your views here.
class IdeiaViewSet(viewsets.ModelViewSet):
    queryset = Ideia.objects.all()
    serializer_class = IdeiaSerializer