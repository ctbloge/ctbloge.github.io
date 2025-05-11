# Django 入门指南

Django 是一个高级的 Python Web 框架，鼓励快速开发和清洁、实用的设计。以下是使用 Django 创建基础项目的详细步骤。



## 安装 Django

首先需要安装 Python，然后通过 pip 安装 Django。

```bash
pip install django
```

## 创建项目

安装完成后，可以使用 `django-admin` 命令行工具来创建一个新的项目。

```bash
django-admin startproject mysite
```

这将创建一个名为 `mysite` 的文件夹，其中包含项目的骨架结构。

### 项目结构

创建项目后，`mysite` 文件夹的结构如下：

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

- `manage.py`：这是一个命令行工具，用于与 Django 项目进行交互。

- ```
  mysite/
  ```

  ：这是一个 Python 包，包含了你的项目。

  - `__init__.py`：一个空文件，告诉 Python 这个目录应该被视为一个包。
  - `settings.py`：Django 项目的配置文件。
  - `urls.py`：Django 项目的 URL 声明。
  - `asgi.py`：用于 ASGI 兼容的 Web 服务器的入口。
  - `wsgi.py`：用于 WSGI 兼容的 Web 服务器的入口。

## 启动开发服务器

进入项目目录并启动 Django 开发服务器。

```bash
cd mysite
python manage.py runserver
```

现在，你可以在浏览器中访问 `http://127.0.0.1:8000/` 来查看你的新项目。

## 创建应用

每个 Django 项目可以包含多个应用。下面创建一个名为 `polls` 的应用。

```bash
python manage.py startapp polls
```

### 应用结构

创建应用后，`polls` 文件夹的结构如下：

```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

- `__init__.py`：一个空文件，告诉 Python 这个目录应该被视为一个包。

- `admin.py`：用于自定义 Django 管理界面。

- `apps.py`：应用的配置文件。

- ```
  migrations/
  ```

  ：包含数据库迁移脚本。

  - `__init__.py`：一个空文件，告诉 Python 这个目录应该被视为一个包。

- `models.py`：定义数据模型。

- `tests.py`：用于编写和运行测试。

- `views.py`：定义视图函数。

## 编写模型

在 `polls/models.py` 中定义数据模型。这里我们将定义一个简单的投票模型。

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

## 数据库迁移

在 `mysite/settings.py` 中添加 `'polls',` 到 `INSTALLED_APPS` 列表，然后运行数据库迁移命令。

```bash
python manage.py makemigrations polls
python manage.py migrate
```

## 使用 shell

可以使用 Django shell 来与数据库交互。

```bash
python manage.py shell
```

在 shell 中，你可以创建一些投票对象。

```python
from polls.models import Question, Choice

q = Question(question_text="What's new?", pub_date="2023-01-01 10:00")
q.save()

q.choice_set.create(choice_text='Not much', votes=0)
q.choice_set.create(choice_text='The sky', votes=0)
```

## 创建视图

在 `polls/views.py` 中创建视图函数。

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

## 配置 URL

创建一个新的 `polls/urls.py` 文件来配置 URL。

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

在项目的 `urls.py` 文件中包含 `polls/urls.py`。

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

## 运行项目

现在你的项目应该能够显示一个简单的 "Hello, world" 消息。

```bash
python manage.py runserver
```

访问 `http://127.0.0.1:8000/polls/` 你应该能看到 "Hello, world. You're at the polls index."。

## 总结

以上是使用 Django 创建一个基础项目的详细步骤。Django 还提供了许多其他功能，如表单处理、用户认证和管理接口等，这些都可以在官方文档中找到详细说明。

更多详细内容，请访问 [Django 官方文档](https://docs.djangoproject.com/en/stable/)。