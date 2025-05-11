# Django进阶学习指南



## 1. Django类视图

Django类视图是Django提供的另一种处理请求的方式，它将视图逻辑封装在类中，而不是函数中。类视图更加灵活和可复用。

### 1.1 视图函数与类视图

#### 视图函数

视图函数是我们最开始接触的视图形式，它是处理请求并返回响应的Python函数。

```python
# views.py
from django.http import HttpResponse

def my_view(request):
    return HttpResponse("Hello, World!")
```

#### 类视图

类视图则使用Python类来封装视图逻辑。

```python
# views.py
from django.views import View
from django.http import HttpResponse

class MyView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse("Hello, World from Class View!")
```

## 2. URL路由

Django的URL路由系统是非常强大的，它允许你将URL模式映射到特定的视图函数或者类视图。

### 2.1 基本路由配置

#### 函数视图路由

在Django中配置路由，需要在`urls.py`文件中使用`path()`或`re_path()`函数。

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.my_view, name='my_view'),
]
```

#### 类视图路由

对于类视图，需要使用`path()`或`re_path()`函数的`as_view()`方法。

```python
# urls.py
from django.urls import path
from .views import MyView

urlpatterns = [
    path('hello-class/', MyView.as_view(), name='my_class_view'),
]
```

### 2.2 路由参数

Django的路由系统允许你从URL中捕获参数。

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('greet/<str:name>/', views.greet, name='greet'),
]
```

```python
# views.py
from django.http import HttpResponse

def greet(request, name):
    return HttpResponse(f"Hello, {name}!")
```

## 3. 模板系统

Django的模板系统是一个强大的工具，它允许你将HTML代码和Python数据结合起来，动态生成网页。

### 3.1 渲染模板

在视图中渲染模板，可以使用`render()`函数。

```python
# views.py
from django.shortcuts import render

def my_template_view(request):
    context = {'name': 'Fitten Code'}
    return render(request, 'my_template.html', context)
```

然后在`my_template.html`中使用变量。

```html
<!-- my_template.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Greeting</title>
</head>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```

## 4. 表单处理

Django内置了强大的表单处理系统，可以简化表单的创建、验证和渲染。

### 4.1 创建一个表单

首先，我们需要创建一个表单类。

```python
# forms.py
from django import forms

class MyForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
```

### 4.2 使用表单

然后在视图中使用这个表单。

```python
# views.py
from django.shortcuts import render
from .forms import MyForm

def my_form_view(request):
    if request.method == 'POST':
        form = MyForm(request.POST)
        if form.is_valid():
            # 处理有效数据
            return HttpResponse(f"Hello, {form.cleaned_data['name']}!")
    else:
        form = MyForm()

    return render(request, 'my_form.html', {'form': form})
```

最后，在模板中渲染表单。

```html
<!-- my_form.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Form Example</title>
</head>
<body>
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Submit</button>
    </form>
</body>
</html>
```

## 5. 模型

Django的模型层是基于ORM（对象关系映射），允许你使用Python代码来定义你的数据结构，并且自动处理数据库相关操作。

### 5.1 定义模型

首先，定义一个模型类。

```python
# models.py
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    page_number = models.IntegerField(default=0)

    def __str__(self):
        return self.title
```

### 5.2 查询集

然后，使用查询集来操作数据库。

```python
# views.py
from django.shortcuts import render
from .models import Book

def book_list_view(request):
    books = Book.objects.all()  # 获取所有书籍
    return render(request, 'book_list.html', {'books': books})
```

在模板中显示书籍列表。

```html
<!-- book_list.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Book List</title>
</head>
<body>
    <ul>
        {% for book in books %}
            <li>{{ book.title }} by {{ book.author }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```

以上就是Django进阶学习的一些内容，包括类视图、URL路由、模板系统和模型的基本使用。通过这些学习，你可以更好地理解和使用Django来构建复杂的Web应用。