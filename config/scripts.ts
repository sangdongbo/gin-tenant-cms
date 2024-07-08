export default [
  // WebOffice兼容
  '//lookstar.oss-cn-beijing.aliyuncs.com/static/js/browser.5.8.35.min.js',
  '//lookstar.oss-cn-beijing.aliyuncs.com/static/js/browser-polyfill.5.8.35.min.js',

  // 腾讯地图api
  // '//map.qq.com/api/gljs?v=1.exp&libraries=service&key=5CRBZ-MF4K3-SY33U-YPLTW-XM5SJ-ZRFRM',
  '//wemapvis.map.qq.com/api/gljs?v=1.exp&libraries=service&key=5CRBZ-MF4K3-SY33U-YPLTW-XM5SJ-ZRFRM',
  '//g.alicdn.com/IMM/office-js/1.1.15/aliyun-web-office-sdk.min.js',
  // 8小时不操作自动退出
  `let ICE_CONTAINER = document.getElementById('root');
    let oldTime = new Date().getTime();
    let newTime = new Date().getTime();
    let outTime = 8 * (60 * (60 * 1000)); //设置超时时间

    ICE_CONTAINER.addEventListener('mousemove', function () {
      // 更新最后的操作时间
      oldTime = new Date().getTime();
    });

    checkTime = () => {
      newTime = new Date().getTime(); //更新未进行操作的当前时间
      if (newTime - oldTime > outTime && !window.location.href.includes('/user/login')) {
        //判断是否超时不操作
        let redirect = encodeURI(window.location.href);
        localStorage.setItem('blue-dot-middle-platform-authority', '');
        window.location.href = '/tenant/user/login';
      }
    };
    window.setInterval(checkTime, 1000);`,
  // 解决360浏览器删除按钮是返回键的问题
  `document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener('keydown', function (event) {
            // 检查按下的是否是 Backspace 键
            if (event.keyCode === 8) {
                var doPrevent = true;
                var types = ["text", "password", "file", "textarea", "number", "email", "search", "url"];

                // 检查焦点所在的元素
                if (event.target) {
                    var tag = event.target.tagName.toLowerCase();
                    if (tag === 'input') {
                        var type = event.target.type.toLowerCase();
                        if (types.indexOf(type) > -1) {
                            doPrevent = event.target.readOnly || event.target.disabled;
                        }
                    } else if (tag === 'textarea') {
                        doPrevent = event.target.readOnly || event.target.disabled;
                    } else if (event.target.isContentEditable) {
                        // 如果是可编辑内容（例如富文本编辑器）
                        doPrevent = false;
                    }
                }

                // 阻止默认行为
                if (doPrevent) {
                    event.preventDefault();
                }
            }
        });
    });`,
];
