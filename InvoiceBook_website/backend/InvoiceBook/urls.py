from django.urls import include, path
from rest_framework import routers
from . import views
from . import api


router = routers.DefaultRouter()
router.register(r'users', api.UserViewSet, basename='users')

urlpatterns = [
    path('', views.index, name='index'),
    path(r'api/', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]