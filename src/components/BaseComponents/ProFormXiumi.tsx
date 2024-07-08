import React, { useEffect, useRef } from 'react';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// import "froala-editor/js/plugins.pkgd.min.js";
import 'froala-editor/js/languages/zh_cn.js';


import FroalaEditorComponent from 'react-froala-wysiwyg';

import { addMeta, deleteMeta } from '@/utils/meta';

interface PropsType extends ProFormItemProps {
  app_source?: string;
};

const CustomXiumi = (props: any) => {
  const editorRef = useRef(null);

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    return () => {
      deleteMeta('referrer');
    };
  }, []);

  return (
    <FroalaEditorComponent
      ref={editorRef}
      // tag='textarea'
      config={{
        htmlAllowedTags: ['svg', 'rect', 'animate', 'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'queue', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'style', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'],
        language: 'zh_cn',  // 设置为中文
        // // 例如，你可以设置 pasteDeniedTags 选项来排除 SVG 标签的转换
        // pasteAllowLocalImages: true,
        // imageUpload: (file: any) => {
        //   console.log('file', file);
        // }
      }}
    />
  );
};

const ProFormXiumi = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomXiumi {...props} />
    </ProForm.Item>
  );
};

export default ProFormXiumi;
