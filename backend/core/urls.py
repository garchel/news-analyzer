from django.contrib import admin
from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from news.views import NewsViewSet, trigger_crawler

router = DefaultRouter()
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
		path('api/', include(router.urls)), 
		path('api/trigger-crawl/', trigger_crawler),
]
