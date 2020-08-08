from django.urls import include, path
from rest_framework import routers
from . import views
from . import apis


router = routers.DefaultRouter()
router.register(r'users', apis.UsersViewSet, basename='users')
router.register(r'factures', apis.FacturesViewSet, basename='factures')
#router.register(r'clients', apis.ClientsViewSet, basename='clients')
#router.register(r'fournisseurs', apis.FournisseursViewSet, basename='fournisseurs')
#router.register(r'search', apis.searchViewSet, basename='search')

urlpatterns = [
    path('', views.index, name='index'),
    path(r'api/', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]