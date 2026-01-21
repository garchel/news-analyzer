from django.shortcuts import render
from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
import subprocess
from rest_framework.decorators import api_view
from rest_framework.response import Response

# ViewSet cria automaticamente os endpoints de listar e criar
class NewsViewSet(viewsets.ModelViewSet):
      queryset = News.objects.all().order_by('-created_at')
      serializer_class = NewsSerializer

@api_view(['POST'])
def trigger_crawler(request):
    try:
        venv_python = r"C:\Projects\news-analyzer\crawler_news\venv\Scripts\python.exe"
        crawler_path = r"C:\Projects\news-analyzer\crawler_news"

        subprocess.run(
            [venv_python, "-m", "scrapy", "crawl", "g1"],
            cwd=crawler_path,
            check=True
        )
        return Response({"message": "Scraping finalizado!"})
    except Exception as e:
        return Response({"error": str(e)}, status=500)