from django.shortcuts import render
from django.http import HttpResponse
from .models import *


# Create your views here.
def index(request):
	output = """
		<!DOCTYPE html>
			<html lang="fr">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>InvoiceBook</title>
					<style>
						html {
							background-color: #0093E9;
							background-image: linear-gradient(90deg, #b95050 0%, #80D0C7 100%);
						}
						div {
							width: 99%;
							padding: 5px;
							position: absolute;
							top: 50%;
							left: 50%;
							-ms-transform: translateX(-50%) translateY(-50%);
							-webkit-transform: translate(-50%,-50%);
							transform: translate(-50%,-50%);
							font-family: "Courier New", Courier, monospace;
							text-align: center;
						}
						h1 {
							font-size: 2.5em;
						}
						#links {
							font-size: 1.5em;
						}
						#check p {
							font-size: 1em;
						}
					</style>
				</head>
				<body>
					<div>
						<h1>Bienvenue sur le serveur de test de InvoiceBook!</h1>
						<section id="check">
							<p>&#x2705 Correctement connecté à la DB en 127.0.0.1:3306</p>
							<p>&#x2705 Django à  démarré le serveur de développement</p>
						</section>
						<br><br>
						<section id="links">
							Click <a href="https://documenter.getpostman.com/">here</a> to check our API or
							<a href="http://127.0.0.1:8000/admin/">here</a> to login as admin.
						</section>
					</div>
					<img src="/media/work-in-progress-icon.png" />
				</body>
			</html>
	"""

	return HttpResponse(output)
