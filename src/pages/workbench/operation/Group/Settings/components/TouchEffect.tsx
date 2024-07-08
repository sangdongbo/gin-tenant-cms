import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useModel, useParams } from '@umijs/max';
import { Statistic } from '@ant-design/pro-components';

import BaseCard from './BaseCard';
import { BaseOverview } from '@/components/Dashboard';
import { getTotalRule } from '../../service';

const defaultValue = [
  {
    type: 'wechat_cnt',
    title: '模板消息',
    value: '-',
    ColProps: {
      span: 8,
    },
  },
  {
    type: 'mobile_cnt',
    title: '短信',
    value: '-',
    ColProps: {
      span: 8,
    },
  },
  {
    type: 'email_cnt',
    title: '邮箱',
    value: '-',
    ColProps: {
      span: 8,
    },
  },
];

const handelTotal = (total: any) => {
  if (!total) return defaultValue;

  return defaultValue.map((item) => {
    if (item.type == 'wechat_cnt') {
      let value: any = '-';
      let wechatCntData = [];
      if (total?.wechat_cnt?.data !== '-') {
        value = 0;
        wechatCntData = total?.wechat_cnt?.data ? JSON.parse(total.wechat_cnt.data) : [];
        wechatCntData = wechatCntData.map((item: any) => {
          if (item.openid_cnt) {
            value += Number(item.openid_cnt);
          }
          let title = item.appid;
          total?.wechat_cnt?.authorizerList?.forEach((it: any) => {
            if (it.value == item.appid) {
              title = it.label;
            }
          });

          return {
            openid_cnt: item.openid_cnt,
            title,
          };
        });
      }

      return {
        ...item,
        value,
        statistic: (
          <>
            {wechatCntData.map((item: any) => (
              <Statistic title={item.title} value={` ${item.openid_cnt}`} />
            ))}
          </>
        ),
      };
    }

    return {
      ...item,
      value: total[item.type],
      // value: item.type == 'mobile_cnt' ? <Link to={`/workbench/operation/group/contacts/mobile/${total.id}`}>{total[item.type]}</Link> : total[item.type],
    };
  });
};

export default ({ showPredict, total, formFilterRef, ...props }: any) => {
  const params = useParams();

  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const authorizerList = initialState?.authorizer || [];

  const onPredict = async () => {
    try {
      const formValues = await formFilterRef.current?.validateFields();
      const res = await getTotalRule(formValues);

      setList(
        handelTotal({
          wechat_cnt: {
            data: res?.wechat_cnt || 0,
            authorizerList,
          },
          mobile_cnt: res?.mobile_cnt || 0,
          email_cnt: res?.email_cnt || 0,
        }),
      );
    } catch (error) {
      throw new Error('表单格式错误');
    }
  };

  useEffect(() => {
    setList(
      handelTotal({
        ...total,
        wechat_cnt: {
          data: total?.wechat_cnt,
          authorizerList,
        },
        id: params?.id,
      }),
    );
  }, [total]);

  return (
    <BaseCard
      title="预计触达效果"
      extra={
        <>
          {showPredict ? (
            <Button
              loading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  await onPredict();
                } catch (error) {}
                setLoading(false);
              }}
            >
              {total ? '重新计算' : '计算'}
            </Button>
          ) : null}
        </>
      }
    >
      <BaseOverview
        cardProps={{
          hover: false,
          style: {
            height: 'auto',
          },
        }}
        list={list}
        {...props}
      />
    </BaseCard>
  );
};
