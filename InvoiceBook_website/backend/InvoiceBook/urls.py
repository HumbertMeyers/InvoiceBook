from django.urls import path
from rest_framework import routers
from . import views


#router = routers.DefaultRouter()
#router.register(r'users', api.usersViewSet, basename='users')
#router.register(r'factures', api.facturesViewSet, basename='factures')
#router.register(r'clients', api.clientsViewSet, basename='clients')
#router.register(r'fournisseurs', api.fournisseursViewSet, basename='fournisseurs')
#router.register(r'search', api.searchViewSet, basename='search')

urlpatterns = [
    path('', views.index, name='index'),
    #path(r'api/', include(router.urls)),
]