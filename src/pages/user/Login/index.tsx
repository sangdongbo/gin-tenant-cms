import { MailOutlined, LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Row, Col, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Crypto } from '@bluedot-tech/bluedot-antd';
import { getCaptchaRule } from '../../settings/service';
import { getErrcodeMessage } from '@/utils/errcode';
import homeRedirect from '@/utils/homeRedirect';

import { login } from '@/services/ant-design-pro/api';

import styles from './index.less';

import LoginMode from './components/LoginMode';
import Footer from '@/components/Layout/Footer';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Captcha = ({ name }: any) => {
  // Extend Input types from HTMLInputProps #5990
  return (
    <ProFormCaptcha
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined className={'prefixIcon'} />,
      }}
      captchaProps={{
        size: 'large',
      }}
      phoneName={name}
      placeholder={'请输入验证码'}
      captchaTextRender={(timing, count) => {
        if (timing) {
          return `${count} ${'获取验证码'}`;
        }
        return '获取验证码';
      }}
      name="code"
      rules={[
        {
          required: true,
          message: '请输入验证码！',
        },
      ]}
      onGetCaptcha={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        await getCaptchaRule({ [name]: crypt.aes_encrypt(value), action: 'login', crypt_key });
        message.success('获取验证码成功！');
      }}
    />
  );
};


const Login: React.FC = () => {
  const pageDom = useRef<HTMLDivElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loginStyle, setLoginStyle] = useState({});

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    const resData = await initialState?.fetchInit();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
        ...resData,
      });
    }
    return userInfo;
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);

    // 登录
    const crypt = new Crypto();
    values.email = crypt.aes_encrypt(values.email);
    values.phone = crypt.aes_encrypt(values.phone);
    values.password = crypt.aes_encrypt(values.password);
    values.crypt_key = crypt.rsa_key_encrypt();
    // 登录
    try {
      const result: any = await login({ ...values, type });
      console.log(result)
      if (result?.data?.access_token) {
        localStorage.setItem('lookstar-tenant-token', result?.data?.access_token);
        localStorage.setItem('lookstar-tenant-X-Tenant', '');
        message.success('登录成功！');
        const userInfo = await fetchUserInfo();
        const redirectUrl = homeRedirect(userInfo);
        setTimeout(() => {
          history.push(redirectUrl);
        }, 0);
        return;
      }
    } catch (error) {
      setUserLoginState(error);
    }

    setSubmitting(false);
  };
  const { errcode, errmsg } = userLoginState;

  const calculationLoginContainerBg = () => {
    const imgWidth = 960;
    const imgHeight = 1080;
    const windowWidth = pageDom.current?.clientWidth || 0;
    const windowHeight = pageDom.current?.clientHeight || 0;
    const imgBl = imgWidth / imgHeight;
    const windowBl = windowWidth / windowHeight;
    let loginContainerStyle = {};
    if (windowBl < imgBl) {
      loginContainerStyle = {
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right center',
      };
    } else {
      loginContainerStyle = {
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
      };
    }

    setLoginStyle({
      opacity: 1,
      ...loginContainerStyle,
    });
  };

  useEffect(() => {
    calculationLoginContainerBg();
    window.addEventListener('resize', () => {
      calculationLoginContainerBg();
    });
  }, []);

  return (
    <Row className={styles.loginContainer} align="middle">
      <Col span={12}>
        <div ref={pageDom} className={styles.loginContainerBg} style={loginStyle} />
      </Col>
      <Col span={12}>
        <div className={styles.loginRightContainer}>
          <Row className={styles.loginRightHeader} align="middle" justify="center">
            <Col>
              <img
                className={styles.loginRightLogo}
                src="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/landing/202202/rc-upload-1645671085202-2.png"
                alt="logo"
              />
            </Col>
            <Col className={styles.loginRightTitle} offset={1}>
              {/* 测试 */}
            </Col>
          </Row>
          <div className={styles.loginRightForm}>
            <ProForm
              initialValues={{
                autoLogin: true,
              }}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={async (values) => {
                handleSubmit(values as API.LoginParams);
              }}
            >
              <LoginMode
                list={[
                  {
                    key: 'account',
                    title: '账户登录',
                  },
                  {
                    key: 'mobile',
                    title: '手机号登录',
                  },
                  {
                    key: 'mail',
                    title: '邮箱登录',
                  },
                ]}
                activeKey={type}
                onChange={(key: string) => {
                  setUserLoginState({});
                  setType(key);
                }}
              />
              {[10103, 10102, 10101, 10108].includes(errcode) ? (
                <LoginMessage content={getErrcodeMessage(errcode) || errmsg} />
              ) : (
                ''
              )}
              {type === 'account' && (
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                      placeholder: '手机号/账户名/邮箱',
                    }}
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号/账户名/邮箱！',
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                      placeholder: '密码',
                    }}
                    rules={[
                      {
                        required: true,
                        message: '请输入密码！',
                      },
                    ]}
                  />
                </>
              )}
              {type === 'mail' && (
                <>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <MailOutlined className={'prefixIcon'} />,
                    }}
                    name="email"
                    placeholder={'请输入邮箱'}
                    rules={[
                      {
                        required: true,
                        message: '请输入邮箱',
                      },
                      {
                        pattern:
                          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        message: '邮箱格式错误！',
                      },
                    ]}
                  />
                  <Captcha name="email" />
                </>
              )}
              {type === 'mobile' && (
                <>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <MobileOutlined className={'prefixIcon'} />,
                    }}
                    name="phone"
                    placeholder={'请输入手机号'}
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '手机号格式错误！',
                      },
                    ]}
                  />
                  <Captcha name="phone" />
                </>
              )}
            </ProForm>
          </div>
          <Footer style={{ backgroundColor: '#ffffff' }} />
        </div>
      </Col>
    </Row>
  );
};

export default Login;
