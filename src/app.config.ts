export default defineAppConfig({
  pages: ['pages/index/index', 'pages/about/about'],
  tabBar: {
    list: [
      {
        iconPath: './icon/guide.png',
        selectedIconPath: './icon/guide_selected.png',
        pagePath: 'pages/index/index',
        text: '图鉴',
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
