import { useEffect, useRef, useState } from 'react';
import { Menu } from 'antd';
import { useScroll } from 'ahooks';
import { ProFormTextArea, ProForm, ProFormSelect, ModalForm } from '@ant-design/pro-components';
import type { ProFormItemProps } from '@ant-design/pro-components';


interface PropsType extends ProFormItemProps {

}

export default (props: PropsType) => {
  const textAreaRef = useRef<any>();
  const form = ProForm.useFormInstance();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuStyle = useRef<any>({});
  const selectionStartRef = useRef(0);
  const constOptions = [
    {
      label: '姓名',
      value: 'salesperson_name',
    },
    {
      label: '职位',
      value: 'salesperson_role',
    },
    // {
    //   label: '年龄',
    //   value: 'salesperson_age',
    // },
    // {
    //   label: '性别',
    //   value: 'salesperson_gender',
    // },
    {
      label: '公司名称',
      value: 'company_name',
    },
    {
      label: '公司业务',
      value: 'company_business',
    },
    {
      label: '公司服务',
      value: 'company_service',
    },
    // {
    //   label: '公司价值观',
    //   value: 'company_values',
    // },
    {
      label: '对话目的',
      value: 'conversation_purpose',
    },
    // {
    //   label: '服务效益',
    //   value: 'service_benefits',
    // },
    // {
    //   label: '对话风格',
    //   value: 'tone_style',
    // }
  ];

  const handleAppendConst = async (value: any) => {
    const index = selectionStartRef.current;
    let str = `[${value.const}]`;
    let text = form.getFieldValue(props.name);
    const newStr = text.slice(0, index) + str + text.slice(index);
    form.setFieldValue(props.name, newStr);
    setOpen(false);
    return true;
  };

  useEffect(() => {
    // 点击页面任何地方都隐藏菜单
    document.addEventListener('click', function () {
      setOpenMenu(false);
    });
    document.addEventListener("scroll", function () {
      setOpenMenu(false);
    });

    textAreaRef.current?.resizableTextArea?.textArea.addEventListener('contextmenu', (event: any) => {
      event.preventDefault();
      selectionStartRef.current = event.target.selectionStart;
      menuStyle.current = {
        left: event.clientX + 4,
        top: event.clientY,
      };
      setOpenMenu(true);
    });
  }, []);

  return (
    <>
      <ProFormTextArea
        fieldProps={{
          ref: textAreaRef,
          autoSize: {
            minRows: 7,
          }
        }}
        extra="可以在输入框内右击设置变量"
        {...props}
        rules={[
          ...(props?.rules || []),
          {
            validator(rule, value) {
              if (value) {
                var regex = /\[([^[\]]+)]/g;
                var match;
                const values = constOptions.map(item => item.value);
                while ((match = regex.exec(value)) !== null) {
                  if (!values.includes(match[1])) {
                    return Promise.reject(new Error(`[${match[1]}]不存在，请删除后在提交`));
                  };
                };
              };
              return Promise.resolve();
            },
          }
        ]}
      />
      {
        openMenu ? (
          <Menu
            items={[
              {
                label: <div onClick={() => setOpen(true)}>设置变量</div>,
                key: 'const',
              }
            ]}
            style={{
              boxShadow: '2px 4px 12px rgba(0,0,0,.3)',
              width: 100,
              position: 'fixed',
              zIndex: 10,
              ...menuStyle.current,
            }}
          />
        ) : null
      }

      <ModalForm
        title="设置变量"
        modalProps={{
          destroyOnClose: true,
        }}
        open={open}
        onOpenChange={setOpen}
        layout="horizontal"
        onFinish={handleAppendConst}
        width={300}
        submitter={{
          render(props, doms) {
            doms.shift();
            return doms;
          }
        }}
      >
        <ProFormSelect
          label="变量"
          name="const"
          options={constOptions}
        />
      </ModalForm>
    </>
  )
}
