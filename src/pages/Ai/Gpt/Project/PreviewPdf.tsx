import { useEffect } from 'react';
import { useSearchParams } from '@umijs/max';
import { getRepositoryDataFilePreviewRule } from '@/pages/Ai/Gpt/service';

export default () => {
  const [searchParams] = useSearchParams();

  const previewInit = async (tokenInfo: any) => {
    let mount = document.querySelector('#containerPreviewPdf');
    let instance = aliyun.config({
      mount,
      url: tokenInfo.PreviewURL || tokenInfo.EditURL || tokenInfo.WebofficeURL,
      mode: 'simple',
      // refreshToken
    });
    instance?.setToken({ token: tokenInfo.AccessToken, timeout: 25 * 60 * 1000 });

    await instance.ready();
    const app = instance?.Application;
    try {
      //对文档窗口大小进行调整后，不缩放视图以适应文档窗口的尺寸
      app.ActiveDocument.ActiveWindow.View.Zoom.PageFit = 2;
    } catch (error) {

    }
  };

  useEffect(() => {
    getRepositoryDataFilePreviewRule({
      url: decodeURIComponent(searchParams.get('url') || ''),
    }).then(res => {
      const tokenInfo = res.aliReult.body;
      previewInit({
        // res.aliReult.body
        "RefreshToken": tokenInfo.refreshToken,
        "RequestId": tokenInfo.requestId,
        "AccessToken": tokenInfo.accessToken,
        "RefreshTokenExpiredTime": tokenInfo.refreshTokenExpiredTime,
        "WebofficeURL": tokenInfo.webofficeURL,
        "AccessTokenExpiredTime": tokenInfo.accessTokenExpiredTime,
      });
    });
  }, []);

  return (
    <div id="containerPreviewPdf" style={{ width: "100%", height: "100vh" }}></div>
  )
}
