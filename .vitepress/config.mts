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
      "text": "基础入门",
      "collapsed": false,
      "items": [
          {
            "text": "Django-入门篇",
            "link": "/blog/Django/django-introduce"
          },
          {
            "text": "Django-进阶篇",
            "link": "/blog/Django/django-advance"
          },
          {
            "text": "Django-提升篇",
            "link": "/blog/Django/django-improve"
          },
          {
            "text": "使用django-simpleui美化后台管理",
            "link": "/blog/Django/django-simpleui"
          },
          {
            "text": "Django如何操作数据库",
            "link": "/blog/Django/django-database"
          },
          {
            "text": "Django如何使用过滤器查询数据",
            "link": "/blog/Django/django-filter"
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
      "text": "基础入门",
      "collapsed": false,
      "items": [
        {
          "text": "Python 基础语法",
          "link": "/blog/python/python-basic"
        },
        {
          "text": "Python 数据结构",
          "link": "/blog/python/python-advance"
        },
        {
          "text": "Python 面向对象编程",
          "link": "/blog/python/python-oop"
        },
          ]
    },
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

