module.exports = {
  title: 'storm',
  description: 'storm的学习',
  base: '/blog',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  repo: 'https://github.com/stormspirit055/blog',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav:[
      { text: '前端算法', link: '/algorithm/' }, // 内部链接 以docs为根目录
      { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/OBKoro1' },
          {
            text: '算法仓库',
            link: 'https://github.com/OBKoro1/Brush_algorithm'
          }
        ]
      }        
    ],
    sidebar:[
      {
        title: '第一章',
        collapsable: true,
        children: [
            '/sword/section1/README1.md',
            '/sword/section1/README2.md',
        ]
      },
      {
        title: '第二章',
        collapsable: true,
        children: [
            '/sword/section2/README1.md'
            // '/sword/section2/README2.md',
        ]
      },
      {
        title: '第四章',
        collapsable: true,
        children: [
            '/sword/section4/README1.md'
            // '/sword/section2/README2.md',
        ]
      }
    ]
  }
}
