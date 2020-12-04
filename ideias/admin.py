from django.contrib import admin
from .models import Ideia

# Register your models here.
class Ideias(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'descricao')
    list_display_links = ('id', 'titulo')
    search_fields = ('titulo',)

admin.site.register(Ideia, Ideias)