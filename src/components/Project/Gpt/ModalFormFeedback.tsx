import { Button } from "antd";
import { ModalForm, ProFormRadio, ProFormList, ProFormText, ProFormDependency } from "@ant-design/pro-components";
import type { ModalFormProps } from "@ant-design/pro-components";

interface PropsType extends ModalFormProps {

};

const FormDom = () => {
  return (
    <>
      <ProFormRadio.Group
        name={["data", "is_message_feedback"]}
        label="开启评价回复功能"
        initialValue={0}
        options={[
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 0,
          }
        ]}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProFormDependency name={[["data", "is_message_feedback"]]}>
        {({ data }) => {
          if (data?.is_message_feedback) {
            return (
              <ProFormList
                required
                name={["data", "message_feedback_arr"]}
                creatorButtonProps={{
                  creatorButtonText: '添加一行数据',
                }}
                copyIconProps={false}
                label="错误反馈选项"
                rules={[
                  {
                    validator(rule, value) {
                      if (!value?.length) return Promise.reject('请设置错误反馈选项！');
                      return Promise.resolve();
                    },
                  }
                ]}
              >
                <ProFormText
                  width="md"
                  name="label"
                  placeholder="建议不超过5个字"
                  fieldProps={{
                    maxLength: 10,
                  }}
                  rules={[
                    {
                      required: true,
                      message: '请输入错误反馈内容'
                    }
                  ]}
                />
              </ProFormList>
            );
          };

          return null;
        }}
      </ProFormDependency>


    </>
  )
}

export default (props: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      title="配置错误反馈"
      trigger={<Button type="primary">配置错误反馈</Button>}
      width={450}
      {...props}
    >
      <FormDom />
    </ModalForm>
  )
}
