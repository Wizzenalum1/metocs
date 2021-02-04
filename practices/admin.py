from django.contrib import admin
from practices.models import ( 	
								Course,
								Topic,
								Question,
								Answer,
								QuestionText,
								AnswerText,
								)
# Register your models here.

class QuestionTextInline(admin.TabularInline):
	model = QuestionText
	extra = 1
class AnswerTextInline(admin.TabularInline):
	model = AnswerText
	extra = 1

class QuestionAdmin(admin.ModelAdmin):
	fieldsets = [
					(None,			{'fields':[	'topic',
												'question_name',
												'description',
												]}),
					# ('Question detail',{'fields':[inlines]})

	]	

	inlines = [QuestionTextInline]
class AnswerAdmin(admin.ModelAdmin):
	inlines = [AnswerTextInline]
class TopicInline(admin.TabularInline):
	model = Topic
	extra = 1
class CourseAdmin(admin.ModelAdmin):
	inlines = [TopicInline]


admin.site.register(Answer,AnswerAdmin)
admin.site.register(Question,QuestionAdmin)
admin.site.register(Course,CourseAdmin)