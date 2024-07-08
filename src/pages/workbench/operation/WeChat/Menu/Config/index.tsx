import classnames from 'classnames';
import { useState, useEffect } from 'react';
import { Button, Form, message, Space, Empty, Alert } from 'antd';
import { ProForm, ProFormRadio, ProFormText, ProFormDependency } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { PlusOutlined } from '@ant-design/icons';

import { wechatMenuErrorCodeMessage } from '@/utils/wechatMenuErrorCode';

import ProFormMedia from './components/ProFormMedia';
import ProFormArticle from './components/ProFormArticle';
import ProFormVideo from './components/ProFormVideo';

import { getRule, createRule } from '../service';

import styles from './style.less';

/** 编辑过的菜单索引，用于判断《发送消息》或者《发送文章》是否第三方设置过菜单，如果有key，但是没有编辑过数据，判定为第三方设置过的菜单。
 *
 * 格式为：${name}-${firstIndex} || ${name}-${firstIndex}-${lastIndex}
 *
 */
const eidtMenuIndex: any = [];

const getEditMenuName = (
  key: string,
  firstIndex: number | boolean,
  lastIndex: number | boolean,
) => {
  let editName = key;
  if (firstIndex !== false) {
    editName = `${editName}-${firstIndex}`;
  }
  if (lastIndex !== false) {
    editName = `${editName}-${lastIndex}`;
  }
  return editName;
};

const menuDataValidation = (data: any[], isFirstMenu: boolean, parentIndex: number | boolean) => {
  let errorData: any = {
    message: '',
  };
  data.forEach((item: any, index: number) => {
    // h5跳转
    if (
      item.type === 'view' &&
      !/^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/.test(
        item.url,
      )
    ) {
      errorData.message = `“${item.name}”跳转url配置错误！`;
    }

    // 小程序跳转
    if (item.type === 'miniprogram') {
      if (!item.appid) {
        errorData.message = `“${item.name}”小程序appid配置错误`;
      }
      if (!item.pagepath) {
        errorData.message = `“${item.name}”小程序路径配置错误`;
      }
      if (
        !/^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/.test(
          item.url,
        )
      ) {
        errorData.message = `“${item.name}”备用网页配置错误`;
      }
    }

    // 发送消息
    if (item.type === 'click') {
      let firstIndex: number | boolean = false;
      let lastIndex: number | boolean = false;
      if (parentIndex !== false) {
        firstIndex = parentIndex;
        lastIndex = index;
      } else {
        firstIndex = index;
      }
      // 选择《类型》后也算编辑过了
      const editName = getEditMenuName('data', firstIndex, lastIndex);
      const editTypeName = getEditMenuName('type', firstIndex, lastIndex);

      if (eidtMenuIndex.includes(editName) || eidtMenuIndex.includes(editTypeName)) {
        // 已经编辑过了。
        if (!item?.data?.length) {
          errorData.message = `“${item.name}”未配置回推消息`;
        }
      } else {
        // 没有编辑过，判断是否在第三方编辑过。
        if (!item?.data?.length && !item.key) {
          errorData.message = `“${item.name}”未配置回推消息`;
        }
      }
    }

    // 发送图文
    if (item.type === 'article_id') {
      let firstIndex: number | boolean = false;
      let lastIndex: number | boolean = false;
      if (parentIndex !== false) {
        firstIndex = parentIndex;
        lastIndex = index;
      } else {
        firstIndex = index;
      }
      // 选择《类型》后也算编辑过了
      const editName = getEditMenuName('article_id', firstIndex, lastIndex);
      const editTypeName = getEditMenuName('type', firstIndex, lastIndex);

      if (eidtMenuIndex.includes(editName) || eidtMenuIndex.includes(editTypeName)) {
        // 已经编辑过了。
        if (!item?.article_id) {
          errorData.message = `“${item.name}”未配置图文`;
        }
      } else {
        // 没有编辑过，判断是否在第三方编辑过。
        if (!item?.article_id && !item.key) {
          errorData.message = `“${item.name}”未配置图文`;
        }
      }
    }

    // 发送图文
    if (item.type === 'media_id') {
      let firstIndex: number | boolean = false;
      let lastIndex: number | boolean = false;
      if (parentIndex !== false) {
        firstIndex = parentIndex;
        lastIndex = index;
      } else {
        firstIndex = index;
      }
      // 选择《类型》后也算编辑过了
      const editName = getEditMenuName('media_id', firstIndex, lastIndex);
      const editTypeName = getEditMenuName('type', firstIndex, lastIndex);
      if (eidtMenuIndex.includes(editName) || eidtMenuIndex.includes(editTypeName)) {
        // 已经编辑过了。
        if (!item?.media_id) {
          errorData.message = `“${item.name}”未配置视频`;
        }
      } else {
        // 没有编辑过，判断是否在第三方编辑过。
        if (!item?.media_id && !item.key) {
          errorData.message = `“${item.name}”未配置视频`;
        }
      }
    }

    if (item.name) {
      const str = item.name.toString().replace(/([^\u0000-\u00FF])/g, 'dd');
      if (isFirstMenu) {
        if (str.length > 8) {
          errorData.message = `“${item.name}”一级菜单不多于4个汉字或8个字母`;
        }
      } else {
        if (str.length > 16) {
          errorData.message = `“${item.name}”二级菜单不多于8个汉字或16个字母`;
        }
      }
    } else {
      errorData.message = '请配置正确的菜单名称';
    }

    if (item.sub_button?.length) {
      const suErrorData = menuDataValidation(item.sub_button, false, index);
      if (suErrorData.message) {
        errorData = suErrorData;
      }
    } else {
      if (isFirstMenu && !item.type) {
        errorData.message = `请选择“${item.name}”菜单类型`;
      }
    }
  });
  return errorData;
};

export default ({ appid, ...props }: any) => {
  const [menu, handleMenu] = useState<any>({
    is_menu_open: 1,
    selfmenu_info: {
      button: [],
    },
  });
  const [publishLoading, setPublishLoading] = useState(false);
  // const [appid, setAppid] = useState<string>();
  const [firstIndex, setFirstIndex] = useState<any>(false);
  const [lastIndex, setLastIndex] = useState<any>(false);
  const [loading, setLoading] = useState(true);

  const [formRef] = Form.useForm();

  const getFirstChildren = () => {
    if (!menu?.selfmenu_info?.button.length || firstIndex === false) return null;
    return menu?.selfmenu_info?.button[firstIndex];
  };

  const handleFormSetFields = (fIndex: any, lIndex: any, nowMenu?: any) => {
    formRef.resetFields();
    if (lIndex !== false) {
      formRef.setFieldsValue(nowMenu.selfmenu_info.button[fIndex].sub_button[lIndex]);
    } else {
      formRef.setFieldsValue(nowMenu.selfmenu_info.button[fIndex]);
    }
  };

  const editMenuData = (field: string, value: any) => {
    if (lastIndex !== false) {
      menu.selfmenu_info.button[firstIndex].sub_button[lastIndex][field] = value;
    } else {
      if (field == 'type' && menu.selfmenu_info.button[firstIndex].hasOwnProperty('sub_button')) {
        delete menu.selfmenu_info.button[firstIndex].sub_button;
      }
      menu.selfmenu_info.button[firstIndex][field] = value;
    }
    handleMenu({ ...menu });
  };

  const handelEditMenuIndex = (changeValues: any) => {
    const keys = Object.keys(changeValues);
    const editString = getEditMenuName(keys[0], firstIndex, lastIndex);
    if (!eidtMenuIndex?.includes(editString)) {
      eidtMenuIndex.push(editString);
    }
  };

  const handleValuesChange = (changeValues: any) => {
    handelEditMenuIndex(changeValues);

    if (changeValues.hasOwnProperty('name')) {
      editMenuData('name', changeValues.name);
    } else if (changeValues.hasOwnProperty('type')) {
      editMenuData('type', changeValues.type);
    } else if (changeValues.hasOwnProperty('url')) {
      editMenuData('url', changeValues.url);
    } else if (changeValues.hasOwnProperty('appid')) {
      editMenuData('appid', changeValues.appid);
    } else if (changeValues.hasOwnProperty('pagepath')) {
      editMenuData('pagepath', changeValues.pagepath);
    } else if (changeValues.hasOwnProperty('data')) {
      editMenuData('data', changeValues.data);
    } else if (changeValues.hasOwnProperty('article_id')) {
      editMenuData('article_id', changeValues.article_id);
    } else if (changeValues.hasOwnProperty('media_id')) {
      editMenuData('media_id', changeValues.media_id);
    }
  };

  const handleClickMenu = (handelFirstIndex: any, handleLastIndex = false) => {
    setFirstIndex(handelFirstIndex);
    setLastIndex(handleLastIndex);
    handleFormSetFields(handelFirstIndex, handleLastIndex, menu);
  };

  const getState = () => {
    const fIndex = firstIndex;
    const lIndex = lastIndex;
    const nowMenu = menu;
    return { fIndex, lIndex, nowMenu };
  };
  const setState = (fIndex: any, lIndex: any, nowMenu: any) => {
    setFirstIndex(fIndex);
    setLastIndex(lIndex);
    handleFormSetFields(fIndex, lIndex, nowMenu);
    handleMenu({ ...nowMenu });
  };

  const handleDeleteMenu = () => {
    // eslint-disable-next-line prefer-const
    let { fIndex, lIndex, nowMenu } = getState();
    if (lIndex !== false) {
      nowMenu.selfmenu_info.button[fIndex].sub_button.splice(lIndex, 1);
      lIndex = lIndex === 0 ? false : lIndex - 1;
    } else {
      nowMenu.selfmenu_info.button.splice(fIndex, 1);
      fIndex = fIndex === 0 ? false : fIndex - 1;
    }
    setState(fIndex, lIndex, nowMenu);
  };

  const handleAddMenuItem = (parentIndex: any = false) => {
    const data = {
      type: 'view',
      name: '新建菜单',
    };
    // eslint-disable-next-line prefer-const
    let { fIndex, lIndex, nowMenu } = getState();
    if (parentIndex === false) {
      const _length = menu.selfmenu_info.button.push(data);
      fIndex = _length - 1;
      lIndex = false;
    } else {
      if (
        nowMenu.selfmenu_info.button[parentIndex] &&
        nowMenu.selfmenu_info.button[parentIndex]?.sub_button
      ) {
        const _length = nowMenu.selfmenu_info.button[parentIndex].sub_button.push(data);
        lIndex = _length - 1;
      } else {
        nowMenu.selfmenu_info.button[parentIndex] = {
          name: nowMenu.selfmenu_info.button[parentIndex].name,
          sub_button: [data],
        };
        lIndex = 0;
      }
    }
    setState(fIndex, lIndex, nowMenu);
  };

  const handleCreateMenu = async () => {
    const validationData = menuDataValidation(menu.selfmenu_info.button, true, false);

    if (validationData.message) {
      message.error(validationData.message);
      return;
    }

    try {
      const result = await createRule({ ...menu, appid: appid });
      if (result.errcode === 0) {
        message.success('发布成功');
      }
    } catch (error: any) {
      message.error(wechatMenuErrorCodeMessage[error.errcode] || error.errmsg);
    }
  };

  const reset = () => {
    setFirstIndex(false);
    setLastIndex(false);
    handleMenu({
      is_menu_open: 1,
      selfmenu_info: {
        button: [],
      },
    });
  };

  useEffect(() => {
    //  初始化菜单默认选中第一个
    if (menu.selfmenu_info?.button?.length > 0 && firstIndex === false) {
      handleClickMenu(0);
    }
  }, [menu, firstIndex]);

  useEffect(() => {
    reset();

    if (appid) {
      setLoading(true);
      getRule(appid)
        .then((result) => {
          setLoading(false);
          if (result.current.hasOwnProperty('is_menu_open') && result.current.is_menu_open !== 0) {
            for (const key in result.current.selfmenu_info.button) {
              if (result.current.selfmenu_info.button[key].hasOwnProperty('sub_button')) {
                result.current.selfmenu_info.button[key].sub_button =
                  result.current.selfmenu_info.button[key].sub_button.list;
              }
            }
            handleMenu(result.current);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [appid]);

  return (
    <ProCard split="vertical" bodyStyle={{ padding: 0 }} {...props} loading={loading}>
      <ProCard colSpan="360px" style={{ height: '100%' }}>
        <div style={{ width: 300, margin: '0 auto' }}>
          <div className={styles.menuPreview}>
            <div className={styles.headTitle} />
            <ul className={styles.menuList}>
              {appid ? (
                <>
                  {menu.selfmenu_info.button.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={classnames({
                        [styles.menuItem]: true,
                        [styles.menuItemCurrent]: lastIndex === false ? index == firstIndex : false,
                      })}
                      onClick={() => handleClickMenu(index)}
                    >
                      <a className={styles.menuLink} style={{ padding: '0 5px' }}>
                        {item.name}
                      </a>
                      <div
                        className={classnames({
                          [styles.subMenuBox]: true,
                          [styles.hiden]: firstIndex != index,
                        })}
                      >
                        <ul className={styles.subMenuList}>
                          {item?.sub_button?.map((i: any, k: number) => (
                            <li
                              key={`${index}_${k}`}
                              className={classnames({
                                [styles.subMenuItem]: true,
                                [styles.subMenuItemCurrent]: k === lastIndex,
                              })}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClickMenu(index, k);
                              }}
                            >
                              <a>{i.name}</a>
                            </li>
                          ))}
                          {item?.sub_button?.length >= 5 ? null : (
                            <li
                              className={classnames({
                                [styles.subMenuItem]: true,
                              })}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddMenuItem(index);
                              }}
                            >
                              <a>
                                <PlusOutlined />
                              </a>
                            </li>
                          )}
                        </ul>
                        <i className={styles.arrowOut} />
                        <i className={styles.arrowIn} />
                      </div>
                    </li>
                  ))}
                  {menu?.selfmenu_info?.button?.length <= 2 ? (
                    <li
                      className={styles.addMenuItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddMenuItem();
                      }}
                    >
                      <a className={styles.menuLink}>
                        <PlusOutlined />
                      </a>
                    </li>
                  ) : null}
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </ProCard>
      {(firstIndex !== false || lastIndex !== false) && appid ? (
        <ProCard
          title="新建菜单"
          headerBordered
          extra={
            <Space>
              <a onClick={() => handleDeleteMenu()}>删除菜单</a>
              <Button
                loading={publishLoading}
                type="primary"
                onClick={async () => {
                  setPublishLoading(true);
                  await handleCreateMenu();
                  setPublishLoading(false);
                }}
              >
                发布
              </Button>
            </Space>
          }
        >
          <div style={{ minHeight: 500 }}>
            <ProForm
              onValuesChange={handleValuesChange}
              form={formRef}
              submitter={{ render: () => <></> }}
            >
              <ProFormText
                name="name"
                label="菜单名称"
                extra={
                  lastIndex !== false
                    ? '二级菜单不多于8个汉字或16个字母'
                    : '一级菜单不多于4个汉字或8个字母'
                }
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (rule, value, callback) => {
                      try {
                        if (value) {
                          const str = value.toString().replace(/([^\u0000-\u00FF])/g, 'dd');
                          if (lastIndex !== false) {
                            if (str.length > 16) {
                              throw new Error('Something wrong!');
                            }
                          } else {
                            if (str.length > 8) {
                              throw new Error('Something wrong!');
                            }
                          }
                        }
                      } catch (err) {
                        callback('');
                      }
                    },
                    message: '菜单名称格式错误',
                  },
                ]}
              />
              {!getFirstChildren()?.sub_button?.length || lastIndex !== false ? (
                <ProFormRadio.Group
                  name="type"
                  label="菜单类型"
                  options={[
                    {
                      label: '跳转url',
                      value: 'view',
                    },
                    {
                      label: '跳转小程序',
                      value: 'miniprogram',
                    },
                    {
                      label: '发送消息',
                      value: 'click',
                    },
                    {
                      label: '发送视频',
                      value: 'media_id',
                    },
                    {
                      label: '发送文章',
                      value: 'article_id',
                    },
                  ]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              ) : null}
              <ProFormDependency name={['type', 'key']}>
                {({ type, key }) => {
                  const Warning = key ? (
                    <div style={{ paddingBottom: 20, display: 'flex' }}>
                      <Alert message="已在其他平台设置该菜单内容，暂不支持预览" type="warning" />
                    </div>
                  ) : null;

                  switch (type) {
                    case 'article_id':
                      return (
                        <>
                          <ProFormDependency name={['article_id', 'data']}>
                            {({ article_id, data }) => {
                              const editArticleIdString = getEditMenuName(
                                'article_id',
                                firstIndex,
                                lastIndex,
                              );
                              const editDataString = getEditMenuName('data', firstIndex, lastIndex);
                              const editTypeName = getEditMenuName('type', firstIndex, lastIndex);

                              if (
                                key &&
                                !eidtMenuIndex.includes(editArticleIdString) &&
                                !eidtMenuIndex.includes(editTypeName) &&
                                !eidtMenuIndex.includes(editDataString) &&
                                !article_id &&
                                !data?.length
                              ) {
                                return Warning;
                              }

                              return null;
                            }}
                          </ProFormDependency>

                          <ProFormArticle appid={appid} name="article_id" />
                        </>
                      );
                    case 'media_id':
                      return (
                        <>
                          <ProFormDependency name={['article_id', 'data']}>
                            {({ article_id, data }) => {
                              const editArticleIdString = getEditMenuName(
                                'article_id',
                                firstIndex,
                                lastIndex,
                              );
                              const editDataString = getEditMenuName('data', firstIndex, lastIndex);
                              const editTypeName = getEditMenuName('type', firstIndex, lastIndex);

                              if (
                                key &&
                                !eidtMenuIndex.includes(editArticleIdString) &&
                                !eidtMenuIndex.includes(editTypeName) &&
                                !eidtMenuIndex.includes(editDataString) &&
                                !article_id &&
                                !data?.length
                              ) {
                                return Warning;
                              }

                              return null;
                            }}
                          </ProFormDependency>

                          <ProFormVideo appid={appid} name="media_id" />
                        </>
                      );
                    case 'click':
                      return (
                        <>
                          <ProFormDependency name={['article_id', 'data']}>
                            {({ article_id, data }) => {
                              const editArticleIdString = getEditMenuName(
                                'article_id',
                                firstIndex,
                                lastIndex,
                              );
                              const editDataString = getEditMenuName('data', firstIndex, lastIndex);
                              const editTypeName = getEditMenuName('type', firstIndex, lastIndex);
                              if (
                                key &&
                                !eidtMenuIndex.includes(editArticleIdString) &&
                                !eidtMenuIndex.includes(editTypeName) &&
                                !eidtMenuIndex.includes(editDataString) &&
                                !article_id &&
                                !data?.length
                              ) {
                                return Warning;
                              }

                              return null;
                            }}
                          </ProFormDependency>
                          <ProFormMedia appid={appid} name="data" />
                        </>
                      );
                    case 'view':
                      return (
                        <>
                          <ProFormText
                            rules={[
                              {
                                required: true,
                              },
                              {
                                type: 'url',
                              },
                            ]}
                            name="url"
                            placeholder="请输入跳转url"
                            // label="跳转url"
                          />
                        </>
                      );
                    case 'miniprogram':
                      return (
                        <>
                          <ProFormText
                            rules={[{ required: true }]}
                            name="appid"
                            label="小程序 AppID"
                          />
                          <ProFormText
                            rules={[{ required: true }]}
                            name="pagepath"
                            label="小程序路径"
                          />
                          <ProFormText rules={[{ required: true }]} name="url" label="备用网页" />
                        </>
                      );
                  }
                }}
              </ProFormDependency>
            </ProForm>
          </div>
        </ProCard>
      ) : (
        <ProCard
          bodyStyle={{
            minHeight: 500,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请您先选择公众号" />
        </ProCard>
      )}
    </ProCard>
  );
};
