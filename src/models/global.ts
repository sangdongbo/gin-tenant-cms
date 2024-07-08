

export default function globalModel() {
  // landing模版数据
  const templateList = [
    {
      id: 1,
      previewImage:
        'https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/uploads/20220915/6322e9274dab4.png',
      title: '资料下载模版',
    },
    {
      id: 2,
      previewImage:
        'https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/uploads/20220915/6322e95622f9f.png',
      title: '会议邀请模版',
    },
  ];
  // 下载资料默认邮箱样式
  const downloadEmailRichText = {
    clickKey: 'header',
    header: '<p style="line-height: 1.5;"><span style="font-size: 14px; font-family: 微软雅黑;">尊敬的测试用户，您好：</span></p><p style="line-height: 1.5;"><span style="font-size: 14px; font-family: 微软雅黑;">感谢您对本产品的使用，您所下载的资料如下所示，请您查看</span></p>',
    // footer: '<p style=\"text-align: left; line-height: 1.5;\"><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\">北京青云智慧科技发展有限公司</span></p><p style=\"text-align: left; line-height: 1.5;\"><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\">Website: </span><span style=\"font-size: 14px;\"><u>www.blue-dot.cn</u></span><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\"> </span></p><p style=\"text-align: left; line-height: 1.5;\"><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\">Address：Room 2803, DiSanZhiye Tower B, Chaoyang District, Beijing</span></p><p style=\"text-align: left; line-height: 1.5;\"><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\">北京市朝阳区曙光西里甲1号，第三置业B座2803</span></p><p style=\"text-align: left; line-height: 1.5;\"><img src=\"https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651738892096.png\" alt=\"eidt-image-upload-1651738892096\" data-href=\"https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651738892096.png\" style=\"width: 556.38px;height: 77.28px;\"></p>',
    footer: '<p style=\"text-align: left; line-height: 1.15;\"><span style=\"color: rgb(51, 51, 51); font-size: 14px; font-family: 微软雅黑;\">北京青云智慧科技发展有限公司</span></p><p style=\"text-align: left; line-height: 1.15;\"><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px; font-family: Arial;\">公司网站：</span><a href=\"https://ai.blue-dot.com.cn\" target=\"_blank\"><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px; font-family: Verdana;\"><em><strong>https://ai.blue-dot.com.cn</strong></em></span></a></p><p style=\"text-align: left; line-height: 1.15;\"><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-family: Arial;\">Address：</span><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Arial;\">Room 2803, DiSanZhiye Tower B, Chaoyang District, Beijing</span></p><p style=\"text-align: left; line-height: 1.15;\"><span style=\"font-size: 14px; font-family: Arial;\">北京市朝阳区曙光西里甲1号，第三置业B座2803</span></p><p style=\"line-height: 1.15;\"><span style=\"font-size: 14px; font-family: Arial;\">Shanghai Office: 10L, Hengji Mansion, Huangpu District, Shanghai</span></p><p style=\"line-height: 1.15;\"><span style=\"font-size: 14px; font-family: Arial;\">上海办公室：上海市黄浦区淮海东路99号，恒积大厦10L</span></p><p style=\"line-height: 1.15;\"><br></p><p style=\"text-align: left; line-height: 1.5;\"><a href=\"https://ai.blue-dot.com.cn/\" target=\"_blank\" style=\"text-align: start;\">点击此处，抢先了解AI热门营销案例</a><img src=\"https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/uploads/20231130/656831823bc5b.jpg\" alt=\"eidt-image-upload-1701327233848\" data-href=\"https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/uploads/20231130/656831823bc5b.jpg\" style=\"width: 100%;\"></p>',
    subject: '资料下载',
    from_name: '资料中心',
  };
  // 注册提醒默认邮箱样式
  const userRegisterEmailRichText = {
    clickKey: 'header',
    header: '<p>您有新的用户填写留资表单，请及时登录测试系统后台查看</p>',
    footer: false,
    title: '',
    alisa_title: '',
  };

  return {
    templateList,
    downloadEmailRichText,
    userRegisterEmailRichText,
  };
}
