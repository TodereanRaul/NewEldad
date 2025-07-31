from django.urls import path
from . import views

app_name = 'ajutorare'

urlpatterns = [
    path('', views.EldadAjutorareListView.as_view(), name='ajutorare-list'),
    path('<uuid:id>/', views.EldadAjutorareDetailView.as_view(), name='ajutorare-detail'),
]
