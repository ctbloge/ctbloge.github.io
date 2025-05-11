# Django进阶提升学习指南



## （一）模型高级用法

### 1. 自定义管理器

管理器是 Django 模型与数据库之间的接口，可以通过自定义管理器来扩展模型的功能，从而实现更复杂的查询逻辑。

#### 示例：使用自定义管理器

```python
from django.db import models
from django.utils import timezone

class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status='published')

class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', '草稿'),
        ('published', '已发布'),
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    objects = models.Manager()  # 默认管理器
    published = PublishedManager()  # 自定义管理器
```

- `PublishedManager` 是一个自定义管理器，它继承自 `models.Manager`，并重写了 `get_queryset` 方法，以便只返回状态为“已发布”的文章。
- `Post` 模型中有两个管理器：`objects` 是默认管理器，而 `published` 是自定义管理器，使用时可以通过 `Post.published.all()` 获取已发布文章。

### 2. 信号

信号机制允许你在一个事件发生时触发一些操作。Django 内置了一些常见的信号，比如 `post_save` 和 `pre_save`，你也可以自定义信号。

#### 示例：使用信号

```python
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
```

- `post_save` 信号在保存模型实例后发送。
- `@receiver` 装饰器用于定义信号接收器，当 `post_save` 信号触发时，执行相应的函数。
- `create_user_profile` 函数在创建新的 `User` 实例时创建一个对应的 `Profile` 实例。
- `save_user_profile` 函数在更新 `User` 实例时同步更新其 `Profile` 实例。

### 3. 多对多关系和中间表

Django 的多对多关系可以通过 `ManyToManyField` 实现，如果需要在多对多关系中添加额外的字段，可以使用中间表（通过 `through` 参数指定）。

#### 示例：使用中间表

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=128)

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='Membership')

class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

- `Group` 模型中定义了一个多对多关系字段 `members`，并通过 `through` 参数指定了中间表 `Membership`。
- `Membership` 模型包含了 `Person` 和 `Group` 的外键关系，以及额外的字段 `date_joined` 和 `invite_reason`。

## （二）视图高级用法

### 1. 类视图

类视图是 Django 提供的一种面向对象的方式来编写视图，具有更好的代码复用性。

#### 常用的类视图：

- `ListView`: 用于显示对象列表。
- `DetailView`: 用于显示单个对象的详细信息。
- `CreateView`: 用于创建新的对象。
- `UpdateView`: 用于更新现有对象。
- `DeleteView`: 用于删除对象。
- `FormView`: 用于处理表单。

#### 示例：使用 `ListView`

```python
from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    context_object_name = 'posts'
    paginate_by = 3
    template_name = 'blog/post/list.html'
```

- `PostListView` 继承自 `ListView`。
- `model` 属性指定了要显示的模型。
- `context_object_name` 属性指定了模板中的上下文变量名。
- `paginate_by` 属性指定了每页显示的对象数量。
- `template_name` 属性指定了使用的模板文件。

### 2. 装饰器和 Mixins

装饰器和 Mixins 是用于增强视图功能的工具。装饰器可以用于函数视图，而 Mixins 可以与类视图结合使用。

#### 示例：使用 `LoginRequiredMixin`

```python
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView
from .models import Post

class PostDetailView(LoginRequiredMixin, DetailView):
    model = Post
    template_name = 'blog/post/detail.html'
```

- `LoginRequiredMixin` 是一个 Mixin，它确保只有登录用户才能访问该视图。
- `PostDetailView` 继承自 `LoginRequiredMixin` 和 `DetailView`。
- `model` 属性指定了要显示的模型。
- `template_name` 属性指定了使用的模板文件。

#### 示例：使用装饰器

```python
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from .models import Post

@login_required
def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)
    return render(request, 'blog/post/detail.html', {'post': post})
```

- `@login_required` 是一个装饰器，它会检查用户是否已登录，未登录用户将被重定向到登录页面。
- `post_detail` 是一个函数视图，用于显示单个文章的详细信息。

## （三）路由高级用法

### 1. 字符串路径转换器

Django 2.0 引入了路径转换器，可以用来指定 URL 参数的类型。除了默认的转换器之外，还可以自定义转换器。

#### 示例：使用字符串路径转换器

```python
from django.urls import path
from . import views

urlpatterns = [
    path('article/<int:year>/', views.article_by_year, name='article_by_year'),
    path('article/<slug:slug>/', views.article_by_slug, name='article_by_slug'),
]
```

- `<int:year>` 表示 `year` 参数是一个整数。
- `<slug:slug>` 表示 `slug` 参数是一个符合 slug 规则的字符串。

### 2. 命名空间

使用命名空间可以避免不同应用之间的 URL 冲突。命名空间通常在包含 URL 的应用中定义，并在主项目的 URL 配置中包含该应用的 URL 时指定。

#### 示例：使用命名空间

```python
# blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('<int:year>/<int:month>/<int:day>/<slug:post>/', views.post_detail, name='post_detail'),
]

# main_project/urls.py
from django.urls import include, path

urlpatterns = [
    path('', include('blog.urls', namespace='blog')),
]
```

- `app_name = 'blog'` 定义了应用的命名空间。
- 在主项目的 URL 配置中，通过 `include()` 函数包含应用的 URL，并指定命名空间 `namespace='blog'`。
- 在模板中使用命名空间时，可以通过 `blog:post_detail` 来引用 URL。

### 3. 反向解析

反向解析允许你在不硬编码 URL 的情况下引用它们。可以通过 `{% url %}` 模板标签或者 `reverse()` 函数来进行反向解析。

#### 示例：使用 `{% url %}` 模板标签

```html
<a href="{% url 'blog:post_detail' post.publish.year post.publish.month post.publish.day post.slug %}">
    {{ post.title }}
</a>
```

- `{% url 'blog:post_detail' post.publish.year post.publish.month post.publish.day post.slug %}` 通过命名空间和参数生成 URL。

#### 示例：使用 `reverse()` 函数

```python
from django.urls import reverse
from django.shortcuts import redirect
from .models import Post

def some_view(request):
    post = get_object_or_404(Post, slug='some-slug', status='published')
    return redirect(reverse('blog:post_detail', args=[post.publish.year, post.publish.month, post.publish.day, post.slug]))
```

- `reverse('blog:post_detail', args=[post.publish.year, post.publish.month, post.publish.day, post.slug])` 通过命名空间和参数生成 URL。
- `redirect()` 函数用于重定向到指定的 URL。

### 4. URL 参数捕获

Django 的 URL 路由系统允许你从 URL 中捕获参数，并在视图中使用这些参数。

#### 示例：捕获 URL 参数

```python
# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('tag/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'),
]

# blog/views.py
from django.shortcuts import render, get_object_or_404
from .models import Post, Tag

def post_list(request, tag_slug=None):
    tag = None
    posts = Post.published.all()
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        posts = posts.filter(tags__in=[tag])
    return render(request, 'blog/post/list.html', {'posts': posts, 'tag': tag})
```

- `path('tag/<slug:tag_slug>/', views.post_list, name='post_list_by_tag')` 通过 `<slug:tag_slug>` 捕获 URL 中的 `tag_slug` 参数。
- `post_list` 视图函数通过 `tag_slug` 参数来过滤文章。

### 5. 可选参数

Django 的 URL 配置可以包含可选参数，以便在不同的 URL 模式下使用同一个视图。

#### 示例：可选参数

```python
# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('archive/<int:year>/', views.post_archive, name='post_archive_year'),
    path('archive/<int:year>/<int:month>/', views.post_archive, name='post_archive_month'),
]

# blog/views.py
from django.shortcuts import render
from .models import Post
from django.utils import timezone

def post_archive(request, year, month=None):
    posts = Post.published.filter(publish__year=year)
    if month:
        posts = posts.filter(publish__month=month)
    return render(request, 'blog/post/archive.html', {'posts': posts})
```

- `path('archive/<int:year>/', views.post_archive, name='post_archive_year')` 和 `path('archive/<int:year>/<int:month>/', views.post_archive, name='post_archive_month')` 都使用了同一个视图函数 `post_archive`。
- `post_archive` 视图函数通过检查 `month` 参数是否存在来决定是否进行额外的过滤。

## 总结

通过以上内容，我们深入探讨了 Django 模型、视图和路由的一些高级用法。通过应用这些技术，你可以更灵活地使用 Django 来构建功能更为复杂和交互性更强的 Web 应用程序。