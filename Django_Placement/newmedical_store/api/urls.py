from django.urls import path
from.import views

urlpatterns = [

   path('register',views.signup,name='register'),
   path('loginapi/',views.login,name='loginapi'),
   path('logoutapi/',views.logout,name='logoutapi'),
   path('createapi/',views.create_medicine,name='createapi'),
   path('get/',views.get_all_medicines,name='get'),
   path('view/<int:pk>/',views.get_single_medicine,name='view'),
   path('updateapi/<int:pk>/',views.update_medicine,name='updateapi'),
   path('deleteapi/<int:pk>/',views.delete_medicine,name='deleteapi'),
   path('searchapi/',views.search_medicine,name='searchapi'),

]