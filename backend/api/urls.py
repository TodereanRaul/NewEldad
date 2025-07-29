from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', views.register, name='register'),
    path('auth/authenticate/', views.authenticate_user, name='authenticate'),
    
    # Ajutorare endpoints
    path('ajutorare/', views.EldadAjutorareListCreateView.as_view(), name='ajutorare-list'),
    path('ajutorare/<uuid:id>/', views.EldadAjutorareDetailView.as_view(), name='ajutorare-detail'),
    
    # Media endpoints
    path('media/', views.EldadMediaListCreateView.as_view(), name='media-list'),
    path('media/<str:yt_id>/', views.EldadMediaDetailView.as_view(), name='media-detail'),
    path('media/findAll/<str:type>/', views.get_media_by_type, name='media-by-type'),
    path('media/<str:yt_video_code>/recommendations/', views.add_recommendation, name='add-recommendation'),
    path('media/test/', views.test_endpoint, name='media-test'),
    
    # Payment endpoints
    path('payment/create/', views.create_payment, name='create-payment'),
    path('payment/success/', views.payment_success, name='payment-success'),
    path('payment/cancel/', views.payment_cancel, name='payment-cancel'),
    path('payment/error/', views.payment_error, name='payment-error'),
] 