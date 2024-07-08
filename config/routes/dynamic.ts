/**
 * backPath： 菜单显示返回icon 的路径
 * reg?: 自定义验证规则。不填默认为 path
 */
const materialRouters = {
  backPath: '/workbench/application/console',
  path: '/workbench/material/forms',
  name: '表单库',
  access: 'canForms',
  routes: [
    {
      path: '/workbench/material/forms/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          layout: false,
          path: '/workbench/material/forms/basic/edit',
          name: '表单编辑',
          component: './workbench/material/Forms/Edit',
        },
        {
          path: '/workbench/material/forms/basic/settings',
          name: '项目设置',
          component: './workbench/material/Forms/Settings',
        },
      ],
    },
    {
      path: '/workbench/material/forms/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/workbench/material/forms/data/user',
          name: '注册用户',
          component: './workbench/material/Forms/User',
        },
      ],
    },
  ],
};

const salesGPTLayoutRouters = {
  path: '/ai/gpt/project/sales',
  name: 'SalesGPT',
  access: 'canAI',
  routes: [
    {
      path: '/ai/gpt/project/sales/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/ai/gpt/project/sales/basic/settings',
          name: '项目设置',
          component: './Ai/Gpt/Project/Sales/Settings',
        },
        {
          path: '/ai/gpt/project/sales/basic/ai-config',
          name: 'AI配置',
          component: './Ai/Gpt/Project/Sales/AiConfig',
        },
        {
          path: '/ai/gpt/project/sales/basic/preview',
          name: 'AI预览',
          component: './Ai/Gpt/Project/Sales/Preview',
        },
        {
          path: '/ai/gpt/project/sales/basic/share',
          name: '分享设置',
          component: './Ai/Gpt/Project/Sales/Share',
        },
        {
          path: '/ai/gpt/project/sales/basic/utm',
          name: '生成链接',
          component: './Ai/Gpt/Project/Sales/Utm',
        },
      ],
    },
    {
      path: '/ai/gpt/project/sales/knowledge-base',
      name: '知识库',
      icon: 'database',
      routes: [
        {
          path: '/ai/gpt/project/sales/knowledge-base/content',
          name: '内容设置',
          component: './Ai/Gpt/Project/Sales/KnowledgeBase/Content',
        },
      ],
    },
    {
      path: '/ai/gpt/project/sales/data',
      name: '数据管理',
      icon: 'DatabaseOutlined',
      routes: [
        {
          path: '/ai/gpt/project/sales/data/history',
          name: '历史记录',
          component: './Ai/Gpt/Project/Sales/History',
        },
      ],
    },
  ],
};

const wechatGPTLayoutRouters = {
  backPath: '/ai/gpt/project',
  path: '/ai/gpt/project/wechat',
  name: 'WeChatGPT',
  access: 'canAI',
  routes: [
    {
      path: '/ai/gpt/project/wechat/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/ai/gpt/project/wechat/basic/settings',
          name: '项目设置',
          component: './Ai/Gpt/Project/WeChat/Settings',
        },
        {
          path: '/ai/gpt/project/wechat/basic/ai-config',
          name: 'AI配置',
          component: './Ai/Gpt/Project/WeChat/AiConfig',
        },
        {
          path: '/ai/gpt/project/wechat/basic/share',
          name: '分享设置',
          component: './Ai/Gpt/Project/WeChat/Share',
        },
        {
          path: '/ai/gpt/project/wechat/basic/utm',
          name: '生成链接',
          component: './Ai/Gpt/Project/WeChat/Utm',
        },
      ],
    },
    {
      path: '/ai/gpt/project/wechat/knowledge-base',
      name: '知识库',
      icon: 'database',
      routes: [
        {
          path: '/ai/gpt/project/wechat/knowledge-base/settings',
          name: '基础配置',
          component: './Ai/Gpt/Project/WeChat/KnowledgeBase/Settings',
        },
        {
          path: '/ai/gpt/project/wechat/knowledge-base/content',
          name: '内容设置',
          component: './Ai/Gpt/Project/WeChat/KnowledgeBase/Content',
        },
      ],
    },
    {
      path: '/ai/gpt/project/wechat/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/ai/gpt/project/wechat/data/user',
          name: '注册用户',
          component: './Ai/Gpt/Project/WeChat/User',
        },
        {
          hideInMenu: true,
          path: '/ai/gpt/project/wechat/data/user/email-config',
          name: '邮箱设置',
          component: './Ai/Gpt/Project/WeChat/User/EmailConfig',
        },
        {
          path: '/ai/gpt/project/wechat/data/dashboard',
          name: '访问统计',
          component: './Ai/Gpt/Project/WeChat/Dashboard',
        },
        {
          path: '/ai/gpt/project/wechat/data/question',
          name: '问题列表',
          component: './Ai/Gpt/Project/WeChat/Question',
        },
        {
          path: '/ai/gpt/project/wechat/data/feedback',
          name: '评分反馈',
          component: './Ai/Gpt/Project/WeChat/Feedback',
        },
      ],
    },
  ],
};

const starshowGPTLayoutRouters = {
  backPath: '/ai/gpt/project',
  path: '/ai/gpt/project/starshow',
  name: '星拓GPT',
  access: 'canAI',
  routes: [
    {
      path: '/ai/gpt/project/starshow/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/ai/gpt/project/starshow/basic/settings',
          name: '项目设置',
          component: './Ai/Gpt/Project/Starshow/Settings',
        },
        {
          path: '/ai/gpt/project/starshow/basic/ai-config',
          name: 'AI配置',
          component: './Ai/Gpt/Project/Starshow/AiConfig',
        },
      ],
    },
    {
      path: '/ai/gpt/project/starshow/knowledge-base',
      name: '知识库',
      icon: 'database',
      routes: [
        {
          path: '/ai/gpt/project/starshow/knowledge-base/content',
          name: '内容设置',
          component: './Ai/Gpt/Project/Starshow/KnowledgeBase/Content',
        },
      ],
    },
    {
      path: '/ai/gpt/project/starshow/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/ai/gpt/project/starshow/data/business-card',
          name: '名片列表',
          component: './Ai/Gpt/Project/Starshow/BusinessCard',
        },
        {
          hideInMenu: true,
          path: '/ai/gpt/project/starshow/data/business-card/email-config',
          name: '邮箱设置',
          component: './Ai/Gpt/Project/Starshow/BusinessCard/EmailConfig',
        },
        {
          path: '/ai/gpt/project/starshow/data/dashboard',
          name: '访问统计',
          component: './Ai/Gpt/Project/Starshow/Dashboard',
        },
        {
          path: '/ai/gpt/project/starshow/data/question',
          name: '问题列表',
          component: './Ai/Gpt/Project/Starshow/Question',
        },
      ],
    },
  ],
};

const landingRouters = {
  backPath: '/workbench/application/console',
  path: '/workbench/application/project/landing',
  name: 'landing',
  access: 'canProject',
  routes: [
    {
      path: '/workbench/application/project/landing/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/workbench/application/project/landing/basic/edit',
          name: '落地页编辑',
          component: './workbench/application/Project/Landing/Edit',
        },
        {
          path: '/workbench/application/project/landing/basic/settings',
          name: '项目设置',
          component: './workbench/application/Project/Landing/Settings',
        },
        {
          path: '/workbench/application/project/landing/basic/share',
          name: '分享设置',
          component: './workbench/application/Project/Landing/Share',
        },
        {
          path: '/workbench/application/project/landing/basic/utm',
          name: '生成链接',
          component: './workbench/application/Project/Landing/Utm',
        },
      ],
    },
    {
      path: '/workbench/application/project/landing/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/workbench/application/project/landing/data/user',
          name: '注册用户',
          component: './workbench/application/Project/Landing/User',
        },
        {
          hideInMenu: true,
          path: '/workbench/application/project/landing/data/user/email-config',
          name: '邮箱设置',
          component: './workbench/application/Project/Landing/User/EmailConfig',
        },
        {
          path: '/workbench/application/project/landing/data/dashboard',
          name: '访问统计',
          component: './workbench/application/Project/Landing/Dashboard',
        },
      ],
    },
  ],
};

const microbookRouters = {
  backPath: '/workbench/application/console',
  path: '/workbench/application/project/microbook',
  name: '微刊',
  access: 'canProject',
  routes: [
    {
      path: '/workbench/application/project/microbook/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/workbench/application/project/microbook/basic/settings',
          name: '项目设置',
          component: './workbench/application/Project/MicroBook/Settings',
        },
        {
          path: '/workbench/application/project/microbook/basic/template',
          name: '内容设置',
          component: './workbench/application/Project/MicroBook/Template',
        },
        {
          path: '/workbench/application/project/microbook/basic/share',
          name: '分享设置',
          component: './workbench/application/Project/MicroBook/Share',
        },
        {
          path: '/workbench/application/project/microbook/basic/utm',
          name: '生成链接',
          component: './workbench/application/Project/MicroBook/Utm',
        },
      ],
    },
    {
      path: '/workbench/application/project/microbook/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/workbench/application/project/microbook/data/user',
          name: '注册用户',
          component: './workbench/application/Project/MicroBook/User',
        },
        {
          hideInMenu: true,
          path: '/workbench/application/project/microbook/data/user/email-config',
          name: '邮箱设置',
          component: './workbench/application/Project/MicroBook/User/EmailConfig',
        },
        {
          path: '/workbench/application/project/microbook/data/dashboard',
          name: '访问统计',
          component: './workbench/application/Project/MicroBook/Dashboard',
        },
      ],
    },
  ],
};

const dataDownloadRouters = {
  backPath: '/workbench/application/console',
  path: '/workbench/application/project/data-download',
  name: '资料下载',
  access: 'canProject',
  routes: [
    {
      path: '/workbench/application/project/data-download/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/workbench/application/project/data-download/basic/settings',
          name: '项目设置',
          component: './workbench/application/Project/DataDownload/Settings',
        },
        {
          path: '/workbench/application/project/data-download/basic/template',
          name: '内容设置',
          component: './workbench/application/Project/DataDownload/Template',
        },
        {
          hideInMenu: true,
          path: '/workbench/application/project/data-download/basic/template/email-config',
          name: '邮件设置',
          component: './workbench/application/Project/DataDownload/Template/EmailConfig',
        },
        {
          path: '/workbench/application/project/data-download/basic/share',
          name: '分享设置',
          component: './workbench/application/Project/DataDownload/Share',
        },
        {
          path: '/workbench/application/project/data-download/basic/utm',
          name: '生成链接',
          component: './workbench/application/Project/DataDownload/Utm',
        },
      ],
    },
    {
      path: '/workbench/application/project/data-download/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/workbench/application/project/data-download/data/user',
          name: '注册用户',
          component: './workbench/application/Project/DataDownload/User',
        },
        {
          hideInMenu: true,
          path: '/workbench/application/project/data-download/data/user/email-config',
          name: '邮件设置',
          component: './workbench/application/Project/DataDownload/User/EmailConfig',
        },
        {
          path: '/workbench/application/project/data-download/data/dashboard',
          name: '访问统计',
          component: './workbench/application/Project/DataDownload/Dashboard',
        },
      ],
    },
  ],
};

const eventRouters = {
  backPath: '/workbench/application/console',
  path: '/workbench/application/project/event',
  name: '活动中心',
  access: 'canProject',
  routes: [
    {
      path: '/workbench/application/project/event/basic',
      name: '基础设置',
      icon: 'setting',
      routes: [
        {
          path: '/workbench/application/project/event/basic/settings',
          name: '项目设置',
          component: './workbench/application/Project/Event/Settings',
        },
        {
          path: '/workbench/application/project/event/basic/content',
          name: '内容设置',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/workbench/application/project/event/basic/content',
              name: '内容设置',
              component: './workbench/application/Project/Event/Content',
            },
            {
              path: '/workbench/application/project/event/basic/content/details',
              name: '活动详情',
              component: './workbench/application/Project/Event/Content/Details',
            },
            {
              path: '/workbench/application/project/event/basic/content/details/user',
              name: '活动详情',
              component: './workbench/application/Project/Event/Content/Details/User',
            },
          ],
        },
        {
          path: '/workbench/application/project/event/basic/share',
          name: '分享设置',
          component: './workbench/application/Project/Event/Share',
        },
        {
          path: '/workbench/application/project/event/basic/utm',
          name: '生成链接',
          component: './workbench/application/Project/Event/Utm',
        },
      ],
    },
    {
      path: '/workbench/application/project/event/data',
      name: '数据管理',
      icon: 'database',
      routes: [
        {
          path: '/workbench/application/project/event/data/user',
          name: '注册用户',
          component: './workbench/application/Project/Event/User',
        },
      ],
    },
  ],
};

const wechatRouters = {
  reg: `^/tenant/workbench/operation/wechat/.*`,
  path: '/workbench/operation',
  routes: [
    {
      path: '/workbench/operation/wechat',
      name: '微信管理',
      access: 'canWechat',
      icon: 'wechat',
      routes: [
        {
          hideInMenu: true,
          path: '/workbench/operation/wechat',
          redirect: '/workbench/operation/wechat/openid',
        },
        {
          path: '/workbench/operation/wechat/openid',
          name: '微信用户',
          component: './workbench/operation/WeChat/Openid',
        },
        {
          path: '/workbench/operation/wechat/menu',
          name: '菜单管理',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/workbench/operation/wechat/menu',
              component: './workbench/operation/WeChat/Menu',
            },
            {
              path: '/workbench/operation/wechat/menu/dashboard',
              name: 'menu-dashboard',
              component: './workbench/operation/WeChat/Menu/Dashboard',
            },
          ],
        },
        {
          path: '/workbench/operation/wechat/qrcode',
          name: '二维码管理',
          component: './workbench/operation/WeChat/Qrcode',
        },
        {
          path: '/workbench/operation/wechat/material',
          name: '素材管理',
          component: './workbench/operation/WeChat/Material',
        },
        {
          path: '/workbench/operation/wechat/reply',
          name: '自动回复',
          component: './workbench/operation/WeChat/Reply',
        },
        {
          path: '/workbench/operation/wechat/authorizer',
          name: '账号授权',
          component: './workbench/operation/WeChat/Authorizer',
        },
        {
          path: '/workbench/operation/wechat/template',
          name: '模板消息',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/workbench/operation/wechat/template',
              component: './workbench/operation/WeChat/Template',
            },
            {
              name: '任务',
              path: '/workbench/operation/wechat/template/task/:id',
              component: './workbench/operation/WeChat/Template/Task',
            },
          ],
        },
        {
          access: 'canAdmin',
          path: '/workbench/operation/wechat/intelligent-assistant',
          name: '智能助手',
          component: './workbench/operation/WeChat/IntelligentAssistant',
        },
      ],
    },
  ],
};

const pushRouters = {
  reg: `^/tenant/workbench/operation/push/.*`,
  path: '/workbench/operation',
  routes: [
    {
      path: '/workbench/operation/push',
      name: '推送管理',
      access: 'canPush',
      icon: 'SendOutlined',
      routes: [
        {
          hideInMenu: true,
          path: '/workbench/operation/push',
          redirect: '/workbench/operation/push/mail',
        },
        {
          path: '/workbench/operation/push/mail',
          name: '邮件推送',
          hideChildrenInMenu: true,
          routes: [
            {
              path: '/workbench/operation/push/mail',
              component: './workbench/operation/Push/Mail',
            },
            {
              path: '/workbench/operation/push/mail/content',
              layout: false,
              name: '',
              component: './workbench/operation/Push/Mail/Content',
            },
            {
              path: '/workbench/operation/push/mail/task',
              name: 'task',
              layout: false,
              component: './workbench/operation/Push/Mail/Task',
            },
          ],
        },
        {
          path: '/workbench/operation/push/template',
          name: '微信模板消息',
          hideChildrenInMenu: true,
          access: 'canWechat',
          routes: [
            {
              path: '/workbench/operation/push/template',
              redirect: '/workbench/operation/wechat/template',
            },
          ],
        },
      ],
    },
  ],
};

const settingsRouters = {
  path: '/settings',
  name: 'settings',
  routes: [
    {
      path: '/settings/account',
      name: '个人设置',
      icon: 'user',
      routes: [
        {
          hideInMenu: true,
          path: '/settings/account',
          redirect: '/settings/account/basic',
        },
        {
          path: '/settings/account/basic',
          name: '个人中心',
          component: './settings/Account',
        },
      ],
    },
    {
      path: '/settings/staff',
      name: '权限管理',
      icon: 'unlock',
      access: 'canAdmin',
      routes: [
        {
          hideInMenu: true,
          path: '/settings/staff',
          redirect: '/settings/staff/user',
        },
        {
          path: '/settings/staff/user',
          name: '管理员设置',
          component: './settings/Staff/User',
          access: 'canAdmin',
        },
        {
          path: '/settings/staff/role',
          name: '部门设置',
          component: './settings/Staff/Role',
        },
      ],
    },
    {
      path: '/settings/system',
      name: '系统设置',
      access: 'canAdmin',
      icon: 'setting',
      routes: [
        {
          hideInMenu: true,
          path: '/settings/system',
          redirect: '/settings/system/config/mail',
        },
        {
          path: '/settings/system/config/mail',
          name: '邮箱管理',
          component: './settings/system/config/Mail',
        },
        {
          path: '/settings/system/config/sms',
          name: '短信管理',
          component: './settings/system/config/SMS',
        },
        // {
        //   path: '/settings/system/config/base',
        //   name: 'base',
        //   component: './settings/system/config/Base',
        // },
        {
          path: '/settings/system/config/apps',
          name: '应用中心',
          component: './settings/system/config/Apps',
        },
        {
          path: '/settings/system/config/open-api',
          name: '开放平台',
          component: './settings/system/config/OpenApi',
        },
        {
          path: '/settings/system/config/apps/hubspot',
          name: 'hubspot',
          component: './settings/system/config/Apps/HubSpot',
          hideInMenu: true,
          parentKeys: ['apps'],
        },
      ],
    },
  ],
};

// 菜单路由设置
const allRoutes = [
  materialRouters,
  starshowGPTLayoutRouters,
  wechatGPTLayoutRouters,
  salesGPTLayoutRouters,
  landingRouters,
  microbookRouters,
  dataDownloadRouters,
  eventRouters,
  wechatRouters,
  pushRouters,
  settingsRouters,
];

/**
 * 动态菜单切换数据
 */
export const dynamicMenu = allRoutes?.map((item: any) => {
  return {
    reg: item?.reg || `^/tenant${item?.path}/.*`,
    ...item,
  };
});

// 页面加载使用（必填）
export default allRoutes;
