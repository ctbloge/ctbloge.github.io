# 使用Django操作数据库详细指南


#### 1. 安装Django

首先，确保你已经安装了Python。然后通过pip安装Django：

```bash
pip install django
```

#### 2. 创建Django项目和应用

创建一个新的Django项目和应用，以便进行数据库操作。

```bash
# 创建项目
django-admin startproject myproject

# 进入项目目录
cd myproject

# 创建应用
python manage.py startapp myapp
```

#### 3. 定义模型

在`myapp/models.py`中定义一个简单的模型：

```python
# myapp/models.py
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    birth_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
```

- **`CharField`**: 用于存储字符串，`max_length`参数指定最大长度。
- **`EmailField`**: 用于存储电子邮件地址，`unique=True`确保每个电子邮件地址在数据库中是唯一的。
- **`DateField`**: 用于存储日期。

#### 4. 注册应用并迁移数据库

在`myproject/settings.py`中注册应用：

```python
# myproject/settings.py
INSTALLED_APPS = [
    ...
    'myapp',
]
```

创建和应用迁移文件：

```bash
# 创建迁移文件
python manage.py makemigrations myapp

# 应用迁移
python manage.py migrate
```

迁移文件会根据你的模型定义生成数据库表。

#### 5. 使用Django Shell操作数据库

启动Django的交互式Python shell，进行数据库操作：

```bash
python manage.py shell
```

##### 创建记录

```python
from myapp.models import Person

# 创建一个Person对象
p = Person(first_name='John', last_name='Doe', email='john.doe@example.com', birth_date='1990-01-01')

# 保存到数据库
p.save()
```

##### 查询记录

使用Django的查询API来查询数据：

```python
from myapp.models import Person

# 获取所有记录
all_people = Person.objects.all()
print(all_people)

# 根据条件过滤记录
john_doe = Person.objects.filter(first_name='John', last_name='Doe')
print(john_doe)

# 获取单条记录
try:
    john_doe_single = Person.objects.get(first_name='John', last_name='Doe')
    print(john_doe_single)
except Person.DoesNotExist:
    print("Person does not exist")
```

- **`all()`**: 获取所有记录。
- **`filter()`**: 根据条件过滤记录，返回一个查询集。
- **`get()`**: 获取单条记录，如果记录不存在会抛出`Person.DoesNotExist`异常。

##### 更新记录

```python
from myapp.models import Person

# 获取要更新的记录
p = Person.objects.get(pk=1)  # 根据主键获取记录
p.email = 'new.email@example.com'
p.save()
```

- **`pk`**: 主键（Primary Key），每个模型默认都有一个主键字段。

##### 删除记录

```python
from myapp.models import Person

# 获取要删除的记录
p = Person.objects.get(pk=1)
p.delete()
```

#### 6. 使用视图和URL进行数据库操作

如果你希望通过视图和URL来操作数据库，可以按照以下步骤进行。

##### 创建视图

在`myapp/views.py`中定义视图函数来进行数据库操作：

```python
# myapp/views.py
from django.shortcuts import render, redirect, get_object_or_404
from .models import Person
from .forms import PersonForm  # 我们将在后面定义表单

# 添加Person视图
def add_person(request):
    if request.method == 'POST':
        form = PersonForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('person_list')
    else:
        form = PersonForm()
    return render(request, 'myapp/add_person.html', {'form': form})

# Person列表视图
def person_list(request):
    people = Person.objects.all()
    return render(request, 'myapp/person_list.html', {'people': people})

# 更新Person视图
def update_person(request, pk):
    p = get_object_or_404(Person, pk=pk)
    if request.method == 'POST':
        form = PersonForm(request.POST, instance=p)
        if form.is_valid():
            form.save()
            return redirect('person_list')
    else:
        form = PersonForm(instance=p)
    return render(request, 'myapp/update_person.html', {'form': form})

# 删除Person视图
def delete_person(request, pk):
    p = get_object_or_404(Person, pk=pk)
    if request.method == 'POST':
        p.delete()
        return redirect('person_list')
    return render(request, 'myapp/delete_person.html', {'person': p})
```

- **`get_object_or_404()`**: 这是一个方便的函数，如果对象不存在会返回404错误页面。

##### 定义表单

为了简化表单的创建和验证，我们可以使用Django的表单系统。在`myapp/forms.py`中定义表单：

```python
# myapp/forms.py
from django import forms
from .models import Person

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'email', 'birth_date']
```

- **`ModelForm`**: 基于模型自动生成表单。

##### 配置URL

在`myapp/urls.py`中配置URL：

```python
# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_person, name='add_person'),
    path('list/', views.person_list, name='person_list'),
    path('update/<int:pk>/', views.update_person, name='update_person'),
    path('delete/<int:pk>/', views.delete_person, name='delete_person'),
]
```

在`myproject/urls.py`中包含`myapp`的URL：

```python
# myproject/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
]
```

##### 创建模板

创建`add_person.html`、`person_list.html`、`update_person.html`和`delete_person.html`模板文件。

`add_person.html`：

```html
<!-- myapp/templates/myapp/add_person.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Add Person</title>
</head>
<body>
    <h1>Add Person</h1>
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Add</button>
    </form>
    <a href="{% url 'person_list' %}">Back to list</a>
</body>
</html>
```

`person_list.html`：

```html
<!-- myapp/templates/myapp/person_list.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Person List</title>
</head>
<body>
    <h1>People</h1>
    <ul>
        {% for person in people %}
            <li>
                {{ person.first_name }} {{ person.last_name }} - {{ person.email }}
                <a href="{% url 'update_person' person.pk %}">Update</a>
                <a href="{% url 'delete_person' person.pk %}">Delete</a>
            </li>
        {% endfor %}
    </ul>
    <a href="{% url 'add_person' %}">Add New Person</a>
</body>
</html>
```

`update_person.html`：

```html
<!-- myapp/templates/myapp/update_person.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Update Person</title>
</head>
<body>
    <h1>Update Person</h1>
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Update</button>
    </form>
    <a href="{% url 'person_list' %}">Back to list</a>
</body>
</html>
```

`delete_person.html`：

```html
<!-- myapp/templates/myapp/delete_person.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Delete Person</title>
</head>
<body>
    <h1>Delete Person</h1>
    <p>Are you sure you want to delete {{ person.first_name }} {{ person.last_name }}?</p>
    <form method="post">
        {% csrf_token %}
        <button type="submit">Confirm Delete</button>
    </form>
    <a href="{% url 'person_list' %}">Back to list</a>
</body>
</html>
```

#### 7. 运行服务器

最后，运行Django开发服务器：

```bash
python manage.py runserver
```

访问以下URL进行数据库操作：

- `http://127.0.0.1:8000/myapp/list/`：查看Person列表。
- `http://127.0.0.1:8000/myapp/add/`：添加新的Person记录。
- `http://127.0.0.1:8000/myapp/update/1/`：更新ID为1的Person记录。
- `http://127.0.0.1:8000/myapp/delete/1/`：删除ID为1的Person记录。

### 总结

这份指南详细介绍了如何使用Django进行数据库操作，包括创建、查询、更新和删除记录。通过使用视图和URL，你可以在Web界面中进行这些操作。

