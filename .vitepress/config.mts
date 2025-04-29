import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  title: "川塔文档",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }]
  ],
  themeConfig: {
    // 搜索
    search: {
      provider: 'algolia',
      options: {
        appId: 'G6QEK9X4WI',
        apiKey: '3be5076322e981f21c813f400e7c8ffd',
        indexName: 'hopetreeio',
        locales: {
          zh: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    },
    // 这里设置显示的大纲层级
    outline: {
      level: [2, 4] // 显示 h2 到 h4 的标题
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '个人博客', link: 'https://www.ctbloge.top' }
    ],
    // update date:2025-04-27 02:30:09
    sidebar: {
  "/blog/Django/": [
    {
      "text": "安装部署",
      "collapsed": false,
      "items": []
    },
    {
      "text": "定时任务",
      "collapsed": false,
      "items": [
        {
          "text": "Django使用Celery实现异步和定时任务功能",
          "link": "/blog/Django/django-celery"
        },
        {
          "text": "让定时任务支持执行自定义脚本",
          "link": "/blog/Django/task-for-script"
        },
        {
          "text": "把 Celery 定时任务变成实时触发的任务",
          "link": "/blog/Django/run-celery-task-now"
        },
        {
          "text": "使用 Python 的异步模块 asyncio 改造 I/O 密集型定时任务",
          "link": "/blog/Django/asyncio-task"
        },
        {
          "text": "Django博客网站可以用定时任务做些什么事？",
          "link": "/blog/Django/django-celery-tasks"
        }
      ]
    },
    {
      "text": "灾备方案",
      "collapsed": false,
      "items": [
        {
          "text": "博客灾备方案（2）：博客文章同步到VitePress静态站",
          "link": "/blog/Django/blog-sync-to-vitepress"
        },
      ]
    },
    {
      "text": "拓展",
      "collapsed": false,
      "items": [
        {
          "text": "Python-Markdown 自定义拓展",
          "link": "/blog/Django/python-markdown-extensions"
        }
      ]
    }
  ],
  "/blog/docker/": [
    {
      "text": "安装部署",
      "collapsed": false,
      "items": [
        {
          "text": "容器化部署博客（Django）—— 安装 docker 和 docker-compose",
          "link": "/blog/docker/install-docker"
        },
        {
          "text": "使用 Ansible 工具批量操作虚拟机集群，自动化安装 Docker",
          "link": "/blog/docker/ansible-and-docker"
        }
      ]
    },
    {
      "text": "镜像操作",
      "collapsed": false,
      "items": [
        {
          "text": "分享一个给 Django 镜像瘦身 50% 的经验",
          "link": "/blog/docker/docker-image-for-django"
        },
        {
          "text": "Dockerfile 中的 multi-stage 特性，Vue 项目多阶段构建实战",
          "link": "/blog/docker/dockerfile-multi-stage"
        }
      ]
    },
  ],
  "/blog/free/": [
    {
      "text": "无分类文章",
      "collapsed": false,
      "items": []
    }
  ],
  "/blog/git/": [
    {
      "text": "Git操作",
      "collapsed": false,
      "items": [
        {
          "text": "Git 提交信息规范与最佳实践",
          "link": "/blog/git/git-commit"
        },
        {
          "text": "Git 常用及特殊命令笔记",
          "link": "/blog/git/git-note"
        }
      ]
    },
  ],
  "/blog/linux/": [],
  "/blog/nginx/": [
    {
      "text": "Nginx配置学习",
      "collapsed": false,
      "items": [
        {
          "text": "Nginx配置中server模块的加载顺序和规则",
          "link": "/blog/nginx/nginx-server"
        },
        {
          "text": "终于理解了Nginx配置中location规则的优先级问题",
          "link": "/blog/nginx/nginx-location"
        }
      ]
    },
  ],
  "/blog/personal-notes/": [],
  "/blog/python/": [
    {
      "text": "实战经验",
      "collapsed": false,
      "items": [
        {
          "text": "Python 虚拟环境 Virtualenv 分别在 Windows 和 Linux 上的安装和使用",
          "link": "/blog/python/virtualenv-for-python"
        }
      ]
    },
    {
      "text": "自动化测试",
      "collapsed": false,
      "items": [
        {
          "text": "【Appium 自动化测试】搭建 Appium 环境踩坑记录",
          "link": "/blog/python/appium-env",
        }
      ]
    }
  ],
  "/blog/Redis/": [
    {
      "text": "安装部署",
      "collapsed": false,
      "items": [
        {
          "text": "Redis哨兵模式部署",
          "link": "/blog/Redis/redis-install-sentinel"
        },
        {
          "text": "Redis单机部署",
          "link": "/blog/Redis/redis-install"
        }
      ]
    }
  ],
},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ctbloge/ctbloge.github.io' }
    ]
  }
})

