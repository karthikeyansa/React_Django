from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('movies', views.MovieViewset)
router.register('rating', views.RatingViewset)
router.register('users',views.UserViewset)

urlpatterns = [
    path('', include(router.urls))
]
