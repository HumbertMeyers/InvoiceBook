from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
	return HttpResponse("<html><body><h1> Hello World </h1> </br> This is the InvoiceBook</body></html>")