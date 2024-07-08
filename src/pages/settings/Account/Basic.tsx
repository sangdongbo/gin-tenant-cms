import { useModel } from '@umijs/max';
import { ProForm, ProFormText } from '@ant-design/pro-components';

import { updatePersonalRule } from '../service';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { message } from 'antd';
import style from './index.less';

import { Upload } from '@bluedot-tech/bluedot-antd';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    // const dataCustomization = await initialState?.fetchConfigRule();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
        // dataCustomization,
      });
    }
  };

  const onFinish = async (values: any) => {
    await updatePersonalRule(values);
    await fetchUserInfo();
    message.success('修改成功', 3);
  };

  return (
    <ProCard title="基本设置" className={style.basic}>
      <div style={{ maxWidth: 440 }}>
        <ProForm
          onFinish={onFinish}
          initialValues={{
            nickname: initialState?.currentUser?.nickname,
            avatar: initialState?.currentUser?.avatar,
          }}
          submitter={{
            render: (_, doms) => doms.pop(),
          }}
        >
          <ProForm.Item
            className="reset-upload-imgcrop"
            name="avatar"
            label="头像"
            rules={[{ required: true, message: '请上传头像' }]}
          >
            <Upload.ImgCrop
              uploadProps={{
                listType: 'picture-circle',
              }}
              imgCropProps={{
                aspect: 1,
              }}
            >
              上传头像
            </Upload.ImgCrop>
          </ProForm.Item>

          <ProFormText name="nickname" label="昵称" rules={[{ required: true }]} />
        </ProForm>
      </div>
    </ProCard>
  );
};
