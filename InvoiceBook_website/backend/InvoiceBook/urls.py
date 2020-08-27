from django.urls import include, path
from rest_framework import routers
from . import views
from . import api


router = routers.DefaultRouter()
router.register(r'users', api.UserViewSet, basename='users')
router.register(r'test', api.TestViewSet, basename='test')
router.register(r'factures', api.FacturesViewSet, basename='factures')
#router.register(r'clients', api.ClientsViewSet, basename='clients')
#router.register(r'fournisseurs', api.FournisseursViewSet, basename='fournisseurs')
#router.register(r'search', api.searchViewSet, basename='search')

urlpatterns = [
    path('', views.index, name='index'),
    path(r'api/', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]