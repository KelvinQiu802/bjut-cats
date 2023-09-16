export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/about/about',
    'pages/detail/detail',
    'pages/result/result',
    'pages/gallery/gallery',
    'pages/userName/userName',
    'pages/uploadImage/uploadImage',
    'pages/imageAdmin/imageAdmin',
    'pages/articles/articles',
  ],
  tabBar: {
    list: [
      {
        iconPath: './icon/guide.png',
        selectedIconPath: './icon/guide_selected.png',
        pagePath: 'pages/index/index',
        text: '图鉴',
      },
      // {
      //   iconPath: './icon/gallery.png',
      //   selectedIconPath: './icon/gallery_selected.png',
      //   pagePath: 'pages/gallery/gallery',
      //   text: '相册',
      // },
      {
        iconPath: './icon/article.png',
        selectedIconPath: './icon/article_selected.png',
        pagePath: 'pages/articles/articles',
        text: '文章',
      },
      {
        iconPath: './icon/about.png',
        selectedIconPath: './icon/about_selected.png',
        pagePath: 'pages/about/about',
        text: '关于',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
