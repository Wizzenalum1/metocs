from django.urls import path
from practices.views import (
							course_list_view,
							topic_list_view,
							question_list_view,
							question_view,
							)
app_name = 'practices'
urlpatterns=[
				path('',course_list_view,name='course-list'),
				path('<int:course_id>/',topic_list_view,name='topic-list'),
				path('<int:course_id>/<int:topic_id>/',question_list_view,name='question-list'),
				path('<int:course_id>/<int:topic_id>/<int:question_id>/'
						,question_view,
						name='question'),			
				]