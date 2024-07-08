export default [
  {
    name: 'login',
    layout: false,
    hideInMenu: true,
    path: '/user/login',
    component: './user/Login',
  },
  {
    path: '/workbench',
    name: '工作台',
    routes: [
      {
        path: '/workbench',
        hideInMenu: true,
        redirect: '/workbench/application/console',
      },
      {
        path: '/workbench/application',
        name: '我的应用',
        icon: 'home',
        access: 'canProject',
        routes: [
          {
            path: '/workbench/application/console',
            name: '我的面板',
            component: './workbench/application/Console',
          },
        ],
      },
      {
        path: '/workbench/material',
        name: '素材中心',
        icon: 'FolderOpenOutlined',
        access: 'canForms',
        routes: [
          {
            path: '/workbench/material',
            name: '表单库',
            component: './workbench/material/Forms',
          },
        ],
      },
      {
        name: '运营中心',
        path: '/workbench/operation',
        icon: 'block',
        // access: ['canContacts', 'canTag', 'canWechat'],
        routes: [
          {
            path: '/workbench/operation/group',
            name: '分组管理',
            access: 'canContacts',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/workbench/operation/group',
                component: './workbench/operation/Group',
              },
              {
                path: '/workbench/operation/group/settings/:id',
                name: 'settings',
                component: './workbench/operation/Group/Settings',
              },
              {
                path: '/workbench/operation/group/contacts/:type/:id',
                name: 'contacts',
                component: './workbench/operation/Group/Contacts',
              },
            ],
          },
          {
            path: '/workbench/operation/contacts',
            name: '联系人',
            component: './workbench/operation/Contacts',
            access: 'canContacts',
          },
          {
            path: '/workbench/operation/contacts/field',
            hideInMenu: true,
            component: './workbench/operation/Contacts/Field',
            access: 'canContacts',
          },
          {
            path: '/workbench/operation/contacts/profile/:id',
            name: 'profile',
            component: './workbench/operation/Contacts/Profile',
            hideInMenu: true,
            access: 'canContacts',
          },

          {
            path: '/workbench/operation/tag',
            name: '标签管理',
            component: './workbench/operation/Tag',
          },

          {
            path: '/workbench/operation/wechat',
            name: '微信管理',
            access: 'canWechat',
          },

          // 推送管理
          {
            path: '/workbench/operation/push',
            name: '推送管理',
            access: 'canPush',
            // redirect: '/workbench/operation/wechat/openid',
          },

          {
            component: './403',
          },
        ],
      },
    ],
  },
  {
    path: '/data-center',
    name: '数据中心',
    access: 'canDataCenter',
    routes: [
      {
        path: '/data-center',
        hideInMenu: true,
        redirect: '/data-center/system/lifecycle',
      },
      {
        path: '/data-center/system',
        name: '系统数据',
        icon: 'home',
        routes: [
          {
            path: '/data-center/system/lifecycle',
            name: '生命周期',
            component: './DataCenter/Lifecycle',
          },
          {
            path: '/data-center/system/analyze',
            name: '详细分析',
            component: './DataCenter/Analyze',
          },
        ],
      },
    ],
  },
  {
    layout: false,
    path: '/tencent-ad',
    name: '腾讯广告(Beta)',
    access: 'canAd',
    routes: [
      {
        path: '/tencent-ad',
        hideInMenu: true,
        redirect: '/tencent-ad/audience/custom',
      },
      {
        path: '/tencent-ad/audience',
        name: '系统数据',
        icon: 'TeamOutlined',
        routes: [
          {
            path: '/tencent-ad/audience/custom',
            name: '生命周期',
            component: './settings/system/config/Apps/tencentAd/Audience/Custom',
          },
        ],
      },
    ],
  },
  {
    path: '/ai',
    name: 'AI',
    access: 'canAI',
    routes: [
      {
        path: '/ai',
        redirect: '/ai/gpt',
      },
      {
        path: '/ai/gpt',
        name: '我的AI',
        icon: 'home',
        routes: [
          {
            path: '/ai/gpt',
            redirect: '/ai/gpt/project',
          },
          {
            path: '/ai/gpt/project',
            name: 'GPT',
            component: './Ai/Gpt/Project',
          },
        ],
      },
    ],
  },
  {
    path: '/workbench/application/project/preview',
    hideInMenu: true,
    layout: false,
    component: './workbench/application/Project/Preview',
    access: 'canProject',
  },
  {
    path: '/ai/gpt/project/preview-pdf',
    hideInMenu: true,
    layout: false,
    access: 'canAI',
    component: './Ai/Gpt/Project/PreviewPdf',
  },
  {
    path: '/hubspot/oauth-callback',
    name: 'oauth-callback',
    hideInMenu: true,
    layout: false,
    component: './hubspot/OauthCallback',
  },

  {
    layout: false,
    hideInMenu: true,
    path: '/ai/gpt/project/wechat/basic/preview',
    name: '预览',
    component: './Ai/Gpt/Project/WeChat/Preview',
  },
];
