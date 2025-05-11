# 使用 django-simpleui 美化 Django 后台

`django-simpleui` 是一个为 Django 管理后台提供精美 UI 的第三方库。通过简单的配置，你可以将 Django 的默认后台界面升级为更现代、更美观的样式。



### 步骤 1: 安装 `django-simpleui`

首先，你需要在你的 Django 项目中安装 `django-simpleui`。你可以通过 `pip` 来安装：

```bash
pip install django-simpleui
```

### 步骤 2: 配置 `INSTALLED_APPS`

在你的 Django 项目的 `settings.py` 文件中，找到 `INSTALLED_APPS` 配置项，并将 `simpleui` 添加到列表的最前面。这样可以确保 `simpleui` 能够覆盖默认的 Django 后台模板。

```python
INSTALLED_APPS = [
    'simpleui',  # 添加这一行，并放在最前面
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 其他你的应用
    'myapp',
]
```

### 步骤 3: 配置 `STATICFILES_DIRS`（可选）

如果你有自定义的静态文件（如 CSS 或 JavaScript），你可以将它们放在一个特定的目录中，并配置 Django 识别这个目录。通常这个目录会被命名为 `static`。

在你的 `settings.py` 文件中添加或确认 `STATICFILES_DIRS` 配置项：

```python
import os

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),  # 添加这一行
)
```

### 步骤 4: 创建自定义模板目录（可选）

如果你需要进一步自定义 `simpleui` 的样式或布局，可以在你的项目中创建一个模板目录，并在其中创建 `admin` 子目录。

在你的 Django 项目目录下创建 `templates` 文件夹，然后在其中创建一个名为 `admin` 的子文件夹。

```
myproject/
    myapp/
    templates/
        admin/
```

### 步骤 5: 配置模板路径（可选）

如果你有自定义的模板目录，需要在 `settings.py` 文件中配置 Django 使用这个模板路径：

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # 添加这一行
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### 步骤 6: 创建自定义CSS文件（可选）

在 `admin` 目录下创建一个 `css` 文件夹，并在其中创建一个名为 `custom.css` 的 CSS 文件。

```
myproject/
    myapp/
    templates/
        admin/
            css/
                custom.css
```

### 步骤 7: 编写自定义CSS（可选）

在你的 `custom.css` 文件中编写 CSS 代码，这将覆盖默认的 `django-simpleui` 样式。这里有一个简单的示例，修改了后台的背景颜色和字体。

```css
/* custom.css */
body {
    background-color: #f8f9fa;
    font-family: 'Arial', sans-serif;
}

#header {
    background-color: #4CAF50;
}

#content-main {
    padding: 20px;
    background-color: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
    color: #333;
}

tr.row1 td, tr.row2 td {
    background-color: #f0f8ff;
}
```

### 步骤 8: 创建自定义 `base_site.html` 模板（可选）

在 `admin` 目录下创建一个名为 `base_site.html` 的 HTML 文件，这个文件将覆盖 `django-simpleui` 的默认 base site 模板。

```
myproject/
    myapp/
    templates/
        admin/
            base_site.html
            css/
                custom.css
```

### 步骤 9: 重写 `base_site.html` 模板（可选）

在你的 `base_site.html` 文件中，加载默认的 `django-simpleui` 模板，并添加你自定义的 CSS 文件。

```html
{% extends "admin/base_site.html" %}

{% block extrastyle %}
    <link rel="stylesheet" type="text/css" href="{% static 'admin/css/custom.css' %}">
{% endblock %}
```

### 步骤 10: 收集静态文件

运行以下命令来收集静态文件：

```bash
python manage.py collectstatic
```

这将把所有静态文件收集到你的 `STATIC_ROOT` 目录中，确保你的服务器能够访问这些文件。

### 步骤 11: 测试更改

启动你的 Django 开发服务器，并访问后台管理界面，检查样式是否已经更新为你自定义的样式。

```bash
python manage.py runserver
```

然后在浏览器中打开 `http://127.0.0.1:8000/admin/` 进行查看。

### 配置 `simpleui` 的其他选项

`django-simpleui` 提供了许多配置选项来进一步自定义你的后台界面。以下是一些常用的配置选项：

#### 1. 自定义首页图标

你可以在 `settings.py` 中配置自定义首页图标：

```python
SIMPLEUI_HOME_ICON = 'fas fa-home'
```

#### 2. 自定义菜单图标

你可以在 `settings.py` 中配置自定义菜单图标：

```python
SIMPLEUI_MENU_ICON = {
    'myapp': 'fas fa-cogs',
    # 其他应用的图标
}
```

#### 3. 自定义登录页面

你可以通过设置 `SIMPLEUI_LOGIN_BG` 来更改登录页面的背景图片：

```python
SIMPLEUI_LOGIN_BG = '/static/login_bg.jpg'
```

#### 4. 自定义标题和欢迎信息

你可以在 `settings.py` 中设置自定义的标题和欢迎信息：

```python
SIMPLEUI_INDEX_TITLE = '欢迎使用我的后台管理系统'
SIMPLEUI_LOGO = '/static/logo.png'
```

### 示例配置文件

以下是一个完整的 `settings.py` 示例，包含了上述的所有配置：

```python
import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INSTALLED_APPS = [
    'simpleui',  # 添加这一行，并放在最前面
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 其他你的应用
    'myapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # 添加这一行
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'zh-hans'  # 设置为中文
TIME_ZONE = 'Asia/Shanghai'  # 设置为上海时区
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),  # 添加这一行
)

# simpleui 配置
SIMPLEUI_HOME_ICON = 'fas fa-home'
SIMPLEUI_MENU_ICON = {
    'myapp': 'fas fa-cogs',
    # 其他应用的图标
}
SIMPLEUI_LOGIN_BG = '/static/login_bg.jpg'
SIMPLEUI_INDEX_TITLE = '欢迎使用我的后台管理系统'
SIMPLEUI_LOGO = '/static/logo.png'
```

### 总结

通过以上步骤，你可以成功地使用 `django-simpleui` 美化 Django 的后台管理系统，并进行进一步的自定义。根据你的需要，你可以继续探索 `django-simpleui` 的其他配置选项，以获得你想要的效果。