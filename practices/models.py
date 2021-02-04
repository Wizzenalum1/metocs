from django.db import models
from django.utils.translation import gettext_lazy as gtl
"""
        level1- courses like fundamental computer science with java of python, data structure algorithm.
            level2 - in each course i will have topics like use for loop, print patteren, utilize arrays.
                level3 - for each topic it will have list of questions.
                    level4- here individual questions and answer will be shown with some like dislike and some kind of comment sectoins.

"""
class Course(models.Model):  # it will cerate data base for list of coureses

    class Meta:
        verbose_name        = "course"
        verbose_name_plural = "courses"

    def __str__(self):
        return self.course_name

    course_name = models.CharField(max_length=50)
    description = models.TextField()
    pub_date    = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

class Topic(models.Model): # it will cerate data base for list of topics

    class Meta:
        verbose_name        = "Topic"
        verbose_name_plural = "Topics"

    def __str__(self):
        return self.topic_name
    course      = models.ForeignKey(Course,on_delete=models.CASCADE)
    topic_name  = models.CharField(max_length=150,unique=True)
    description = models.TextField()
    pub_date    = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)  

    
class Question(models.Model):# it will cerate data base for question

    class Meta:
        verbose_name        = "Question"
        verbose_name_plural = "Questions"

    def __str__(self):
        return self.question_name
    topic           = models.ForeignKey(Topic, on_delete=models.CASCADE)
    question_name   = models.CharField(max_length=50)
    description     = models.CharField(max_length=250)
    pub_date        = models.DateTimeField(auto_now_add=True)
    update_date     = models.DateTimeField(auto_now=True)
class Answer(models.Model): # it will cerate data base for answer

    class Meta:
        verbose_name = "Answer"
        verbose_name_plural = "Answers"
    def __str__(self):
        if self.answer_name:
        	return self.answer_name
        else: return self.question.question_name
    question        = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_name     = models.CharField(max_length=100,blank=True,null=True)
    pub_date        = models.DateTimeField(auto_now_add=True)
    update_date     = models.DateTimeField(auto_now=True)


class QuestionText(models.Model): # place where i will write all the text.

    class Meta:
        verbose_name        = "PlainText"
        verbose_name_plural = "PlainTexts"

    def __str__(self):
        return self.question.question_name+" area number"+str(self.id) 
    class ChooseText(models.TextChoices):
        ENGLISH     = 'EN', gtl('English')
        PYTHON      = 'PY', gtl('Python Language')
        JAVA        = 'JL', gtl('Java Language')
        MATH        = 'ME', gtl('Math Expression')
        INPUT       = 'IN', gtl('Inputs to program')
        OUTPUT      = 'OT', gtl('Output of program')
        CONSTRAINT  = 'CO', gtl('Constraint or condition of output')
        PATTERN     = 'SP', gtl('Special patterns')

    text_type = models.CharField(max_length=2,choices=ChooseText.choices) 
    question  = models.ForeignKey(Question, on_delete=models.CASCADE, blank = True)
    text_area = models.TextField()

class AnswerText(models.Model): # place where i will write all the text.
    class Meta:
        verbose_name        = "PlainText"
        verbose_name_plural = "PlainTexts"
    def __str__(self):
        if self.answer.answer_name:
            return self.answer.answer_name+" area number"+str(self.id) 
        else: return self.answer.question.question_name+" area number"+str(self.id)  
    class ChooseText(models.TextChoices):
        ENGLISH     = 'EN', gtl('English')
        PYTHON      = 'PY', gtl('Python Language')
        JAVA        = 'JL', gtl('Java Language')
        MATH        = 'ME', gtl('Math Expression')
        INPUT       = 'IN', gtl('Inputs to program')
        OUTPUT      = 'OT', gtl('Output of program')
        CONSTRAINT  = 'CO', gtl('Constraint or condition of output')
        PATTERN     = 'SP', gtl('Special patterns')

    text_type = models.CharField(max_length=2,choices=ChooseText.choices)
    answer    = models.ForeignKey(Answer, on_delete=models.CASCADE, blank=True)
    text_area = models.TextField()

