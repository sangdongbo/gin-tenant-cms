import React, { useEffect, useState } from 'react';
import { Button, Modal, Tabs, Space } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { ProForm } from '@ant-design/pro-components';
import { CloseCircleOutlined } from '@ant-design/icons';

import { News, Link, Text, Image, Video } from '.';
import TextContent from './Text/Content';
import LinkContent from './Link/Content';
import NewsContent from './News/Content';
import ImageContent from './Image/Content';
import VideoContent from './Video/Content';
import { getRule, getMaterialRule } from '../service';

import swap from '@/utils/swap';

// // key和value互换
// const interchangeKeyValue = (source: any) => {
//   const newVal: any = {};
//   Object.keys(source).forEach(item => {
//     newVal[source[item]] = item;
//   });
//   return newVal;
// };

// const typeEnum: any = {
//   1: 'article',
//   2: 'link',
//   3: 'text',
//   4: 'image',
// };

// // value和key互换
// const typeEnumValueKey: any = interchangeKeyValue(typeEnum);

const Content = ({ list, onDelete, onMoveUp, onDown }: any) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {list.map((item: any, index: number) => {
        return (
          <Space key={index}>
            <div style={{ width: 300, cursor: 'pointer' }}>
              {item.type == 'article' ? <NewsContent data={item.data?.content || {}} /> : null}
              {/*
                item.type == 2 通过id获取详情是数字。
                item.type == 'link' 通过表单获取是string
              */}
              {item.type == 'link' || item.type == 2 ? <LinkContent data={item.data} /> : null}
              {/*
                item.type == 3 通过id获取详情是数字。
                item.type == 'text' 通过表单获取是string
              */}
              {item.type == 'text' || item.type == 3 ? (
                <div style={{ border: '1px solid #eee', borderRadius: '2px' }}>
                  <TextContent data={item.data} />
                </div>
              ) : null}
              {item.type == 'image' ? <ImageContent data={item?.data || {}} /> : null}

              {item.type == 'video' ? <VideoContent data={item?.data || {}} /> : null}
            </div>
            {/*
              <UpCircleOutlined
                className={classNames({ 'btn-disabled': index == 0 })}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => {
                  if (index == 0) return;
                  onMoveUp?.(item, index);
                }}
              />
              <DownCircleOutlined
                className={classNames({ 'btn-disabled': index + 1 == list.length })}
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => {
                  if (index + 1 == list.length) return;
                  onDown?.(item, index);
                }}
              />
            */}
            <CloseCircleOutlined
              style={{ fontSize: 16, cursor: 'pointer' }}
              onClick={() => {
                // 删除数据
                onDelete?.(item, index);
              }}
            />
          </Space>
        );
      })}
    </Space>
  );
};

const SelectMaterial = ({
  appid,
  disabled,
  value = [],
  onChange,
  maxLength = 3,
  newsProps,
  linkProps,
  textProps,
}: any) => {
  let newValues = value ? [...value] : [];
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const hanldeClickRow = (values: any) => {
    const val: any = {
      // type: typeEnum[values.type],
      type: values.type,
      value: values.value,
    };

    // 只有图文+图片才需要素材数据
    if (['image', 'article', 'video'].includes(values.type)) {
      val.data = values.data;
    }

    newValues = [val, ...newValues];
    setList([values, ...list]);
    onChange(newValues);
    setOpen(false);
  };

  const onDelete = (item: any, index: any) => {
    newValues.splice(index, 1);
    list.splice(index, 1);
    setList(list);
    onChange(newValues);
  };

  const onMoveUp = (item: any, index: any) => {
    const currentNewValues = swap(newValues, index, index - 1);
    const currentList = swap(list, index, index - 1);
    setList(currentList);
    onChange(currentNewValues);
  };
  const onDown = (item: any, index: any) => {
    const currentNewValues = swap(newValues, index, index + 1);
    const currentList = swap(list, index, index + 1);
    setList(currentList);
    onChange(currentNewValues);
  };

  const getInitList = () => {
    const promiseArr: any[] = [];
    value.forEach((item: any) => {
      if (['link', 'text'].includes(item.type)) {
        promiseArr.push(getRule(item.value));
      }
      if (['image', 'article', 'video'].includes(item.type)) {
        promiseArr.push(
          new Promise<void>((resolve, reject) => {
            resolve(item);
          }),
        );
      }
    });
    setLoading(true);
    Promise.all(promiseArr)
      .then((res) => {
        setLoading(false);
        setList(res);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!value) {
      // 当value无值时需要滞空list
      setList([]);
      return;
    }
    if ((value.length && !list.length) || value.length != list.length) {
      getInitList();
    }
  }, [value]);

  // 如何appid发生变化，需要清空数据，首次执行不计入变化
  useUpdateEffect(() => {
    onChange([]);
    setList([]);
  }, [appid]);

  return (
    <>
      {maxLength > value?.length ? (
        <Button
          disabled={disabled}
          loading={loading}
          onClick={() => setOpen(true)}
          style={{ marginBottom: 8 }}
        >
          点击选择素材
        </Button>
      ) : null}
      <Content list={list} onDelete={onDelete} onMoveUp={onMoveUp} onDown={onDown} />
      <Modal open={open} onCancel={() => setOpen(false)} footer={false} width={1000}>
        <Tabs
          items={[
            {
              key: '1',
              label: '图文',
              children: (
                <News
                  {...newsProps}
                  appid={appid}
                  handleClickCard={(data: any) =>
                    hanldeClickRow({
                      type: 'article',
                      value: data.article_id,
                      data: data,
                    })
                  }
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                />
              ),
            },
            {
              key: '2',
              label: '外链',
              children: (
                <Link
                  {...linkProps}
                  handleClickCard={(data: any) =>
                    hanldeClickRow({
                      ...data,
                      type: 'link',
                      value: data.id,
                    })
                  }
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                />
              ),
            },
            {
              key: '3',
              label: '文本',
              children: (
                <Text
                  {...textProps}
                  handleClickCard={(data: any) =>
                    hanldeClickRow({
                      ...data,
                      type: 'text',
                      value: data.id,
                    })
                  }
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                />
              ),
            },
            {
              key: '4',
              label: '图片',
              children: (
                <Image
                  {...textProps}
                  appid={appid}
                  handleClickCard={(data: any) =>
                    hanldeClickRow({
                      type: 'image',
                      value: data.media_id,
                      data,
                    })
                  }
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                />
              ),
            },
            {
              key: '5',
              label: '视频',
              children: (
                <Video
                  {...textProps}
                  appid={appid}
                  handleClickCard={(data: any) =>
                    hanldeClickRow({
                      type: 'video',
                      value: data.media_id,
                      data,
                    })
                  }
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

const ProSelectMaterial = ({ appid, disabled, fieldProps, ...props }: any) => {
  return (
    <ProForm.Item name="replys" {...props}>
      <SelectMaterial disabled={disabled} appid={appid} {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProSelectMaterial;
