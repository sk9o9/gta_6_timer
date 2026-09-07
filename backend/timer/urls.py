from django.urls import path
from .views import countdown

urlpatterns = [
    path('countdown/', countdown, name='countdown'),
]
