from django.shortcuts import (
								render, 
								get_object_or_404,
								get_list_or_404,
								)
from django.views.generic import ListView, DetailView
from practices.models import (
								Topic,
								Question,
								Course,
								Answer,

								)


def course_list_view(request):
	queryset = Course.objects.all()
	context = {'courses':queryset}
	return render(request,'practices/course-list.html',context)


def topic_list_view(request,course_id):
	queryset = Course.objects.get(id = course_id).topic_set.all()
	context = {'topics':queryset}
	return render(request,'practices/topic-list.html',context)


def question_list_view(request,course_id,topic_id):
	queryset = Topic.objects.get(id = topic_id).question_set.all()
	context = {	'question_list':queryset,
				'topic_id':topic_id,
				'course_id':course_id}
	return render(request,'practices/question-list.html',context)


def question_view(request,course_id,topic_id,question_id):
	question = get_object_or_404(Question,id=question_id)
	question_area_set = question.questiontext_set.all()
	answer_set = question.answer_set.all();
	# you have to convert this for multiple answers.
	answer_area_set = answer_set[0].answertext_set.all()
	context = {	'question':question,
				'question_area_set':question_area_set,
				'answer_area_set':answer_area_set}
	return render(request,'practices/question.html',context)


