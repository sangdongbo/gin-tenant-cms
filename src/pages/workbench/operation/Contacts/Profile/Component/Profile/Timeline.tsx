import React, { useState, useRef, useEffect } from 'react';
import { Timeline, Tag, Space, Radio, Spin, Badge, Empty } from 'antd';
// import moment from 'moment';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
// import { queryTimelineRule } from '../../service';
import ProTooltip from '@/components/BaseComponents/ProTooltip';
import Scroll from '@/components/Scroll/index';
import { queryTimelineRule } from '../../../service';
import styles from './timeline.less';

const pageEventType = {
  view: '访问',
  click: '点击',
  user_register_success: '注册',
  user_preview: '预览',
  user_download: '下载',
  user_search: '搜索',
};

const pageType: any = {
  microbook: {
    title: '微刊',
    color: '#ffcb00',
  },
  data_download: {
    title: '资料下载',
    color: MAINCOLOR2,
  },
  activity_center: {
    title: '活动中心',
    color: '#d86c49',
  },
  landing_page: {
    title: '落地页',
    color: '#31384e',
  },
  ai_wechat_gpt: {
    title: 'WeChat GPT',
    color: '#b37feb',
  },
  ai_sales_gpt: {
    title: 'Sales GPT',
    color: '#d3f261',
  },
  official_account: {
    title: '公众号',
    color: '#00ebae',
  },
  unknown: {
    title: '其他',
    color: '#ff7875',
  },
};

const typeArray = [
  {
    event: ['user_register_success', 'user_search', 'user_download', 'user_preview'],
    title: 'H5',
    type: 1,
    color: PRIMARYCOLOR,
  },
  {
    event: ['$MPMessage'],
    title: '公众号',
    type: 2,
    color: pageType.official_account.color || '',
  },
  {
    event: [],
    title: '小程序',
    color: 'purple',
  },
];

const svgDom = (name: string, color?: string) => {
  let dom: any = '';
  if (name == 'tagEvent') {
    dom = (
      // <svg
      //   style={{ display: 'block' }}
      //   fill={color || MAINCOLOR2}
      //   viewBox="0 0 1024 1024"
      //   xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      // >
      //   <path
      //     d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8c-3.1 3.1-3.1 8.2 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z"
      //     p-id="5577"
      //   ></path>
      //   <path
      //     d="M605.958852 324.826232a48 48 0 1 0 67.881066-67.883435 48 48 0 1 0-67.881066 67.883435Z"
      //     p-id="5578"
      //   ></path>
      //   <path d="M889.7 539.8l-39.6-39.5c-3.1-3.1-8.2-3.1-11.3 0l-362 361.3-237.6-237c-3.1-3.1-8.2-3.1-11.3 0l-39.6 39.5c-3.1 3.1-3.1 8.2 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z"></path>
      // </svg>
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M699.6 411.7c-26.5 0-51.8-10-71.2-28.1-20.3-19-32-44.8-33-72.6-0.9-27.8 9-54.3 28.1-74.7 19.6-21 47.4-33 76.1-33 26.5 0 51.8 10 71.2 28.1 42 39.3 44.2 105.3 4.9 147.3-19.7 21-47.4 33-76.1 33z m0-168.4c-18 0-34.6 7.2-46.9 20.3-11.7 12.5-17.9 28.9-17.3 46 0.6 17.1 7.8 33 20.3 44.8 11.9 11.2 27.5 17.3 43.9 17.3 18 0 34.6-7.2 46.9-20.3 24.2-25.9 22.8-66.6-3-90.8-12-11.2-27.6-17.3-43.9-17.3z"></path>
        <path d="M424.2 980.7c-14.6 0-27.6-4.9-37.4-14L62.6 663.3c-13.1-12.2-18.9-30.9-15.9-51.3 2.6-18 11.8-36.1 25.8-51.1l387-413.6c22.7-24.2 51.9-40.3 80.1-44.1l230.6-30.8c7.3-1 14.6-1.5 21.8-1.5 39.7 0 75.6 15 101.1 42.3 26.2 28 39.1 66.4 36.3 108.1L914 453.5c-1.9 28.4-16 58.6-38.7 82.9L488.4 950c-18.1 19.2-42 30.7-64.2 30.7zM792 111c-5.4 0-10.9 0.4-16.5 1.1l-230.6 30.8c-19 2.5-40 14.4-56.2 31.7l-387 413.6c-8.4 8.9-14 19.7-15.4 29.6-0.5 3.4-1.2 11.8 3.6 16.3l324.2 303.4c2.3 2.2 5.7 3.3 10.1 3.3 8.7 0 22.5-4.8 34.9-18.1l387-413.6c16.2-17.3 26.7-39.1 27.9-58.2l15.4-232.1c2-30.6-7.1-58.4-25.6-78.2C846 121.5 820.5 111 792 111z"></path>
      </svg>
    );
  }
  if (name == 'address') {
    dom = (
      // <svg
      //   style={{ display: 'block' }}
      //   fill={color || MAINCOLOR2}
      //   viewBox="0 0 1024 1024"
      //   xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      // >
      //   <path
      //     d="M832 389.3c-0.5 49.1-16.2 94.1-37.5 137.4-31.8 65-74 123-119.8 178.6-42.6 51.7-88.5 100.6-137.4 146.4-17.1 16-32.7 16.5-50.2 0.8-90.6-81.4-172.1-170.6-234.3-276.1-10.1-17.2-19.3-34.9-27.2-53.2-7.5-17.4-1-35.5 15.1-43 16.2-7.5 33.9-0.9 41.8 16.2 37.2 80.8 90.6 149.5 150 214.6 22.9 25.1 46.9 50.2 71.8 73.4 3.1 2.9 9 4.2 13.4-0.2 82.4-83 158.5-170 214.6-273.6C748.6 480.5 768 425.9 768 389c0-52.3-5.7-75.5-30.3-121-46.8-86.5-119.2-140-218.7-140-113.1 0-213.4 69.6-249 177.3-8.9 27.1-13.6 54.8-14 83.3-0.3 20.4-13.7 34.7-32.1 34.7-18.5 0-32-14.8-31.9-34.8 0.4-151.5 104.8-282.8 252-316.8C565.8 43.6 696.2 94.1 769.9 198c40.7 57.3 60.9 121.2 62.1 191.3z"
      //     p-id="2297"
      //   ></path>
      //   <path
      //     d="M512.5 256c-70.9-0.1-128.5 57.2-128.5 128 0 70.3 57.3 127.9 127.5 128 70.8 0.2 128.5-57.3 128.5-128 0-70.4-57.3-127.9-127.5-128z m0.6 192c-36 0.3-65.2-28.4-65.1-64.1 0.1-35.3 28.8-63.9 64.4-63.9 34.7 0 63.5 28.7 63.6 63.6 0.1 34.9-28.3 64.1-62.9 64.4zM960 928v-0.4-1-0.6c0-0.4 0-0.7-0.1-1.1 0-0.2 0-0.4-0.1-0.5 0-0.3-0.1-0.6-0.1-1 0-0.2-0.1-0.4-0.1-0.7 0-0.2-0.1-0.5-0.1-0.7-0.1-0.3-0.1-0.6-0.2-1 0-0.1 0-0.2-0.1-0.3-0.9-3.9-2.4-7.5-4.6-10.7L827 689.3c-8.6-14.9-27.8-20-42.6-11.4l-1.4 0.8c-14.9 8.6-20 27.8-11.4 42.6L872.5 896h-721l100.3-173.7c8.8-15.2 3.5-34.9-11.7-43.7-15.2-8.8-34.9-3.5-43.7 11.7L68.3 912c-1.2 2.1-2.1 4.2-2.8 6.5v0.1c-0.1 0.4-0.3 0.9-0.4 1.3 0 0.1-0.1 0.3-0.1 0.4-0.1 0.3-0.2 0.7-0.2 1 0 0.2-0.1 0.5-0.1 0.7 0 0.2-0.1 0.5-0.1 0.7-0.1 0.3-0.1 0.7-0.1 1 0 0.2 0 0.3-0.1 0.5 0 0.4-0.1 0.8-0.1 1.2v0.2c-0.1 0.8-0.1 1.5-0.1 2.3 0 4.4 0.9 8.7 2.6 12.5 2.6 6.2 7.2 11.6 13.4 15.2 4.5 2.6 9.4 4 14.2 4.2h833.8c16.8 0 30.7-13.2 31.9-29.7v-0.2-1-0.7c-0.1 0-0.1-0.1-0.1-0.2z"
      //     p-id="2298"
      //   ></path>
      // </svg>
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M511.998977 65.290005c-173.638689 0-314.904063 138.294716-314.904063 308.281225 0 77.603449 31.020504 185.005574 85.10633 294.67023 53.746088 108.971877 124.852566 209.287607 195.185424 275.377838 8.955976 9.602705 21.51092 15.08865 34.612309 15.08865 12.913101 0 25.359574-5.358031 34.296107-14.736633 149.549038-140.014894 280.608979-406.358985 280.608979-570.401108C826.904063 203.584722 685.637666 65.290005 511.998977 65.290005zM517.467525 914.127613l-1.128707 1.13894c-0.816598 0.8913-2.232854 1.952468-4.339842 1.952468-2.245134 0-3.695159-1.251503-4.361331-1.997494l-1.294482-1.327228C366.207519 782.579555 238.584863 525.041014 238.584863 373.572254c0-147.109476 122.652458-266.791276 273.414113-266.791276 150.761656 0 273.415137 119.6818 273.415137 266.791276C785.414113 525.483082 657.700383 783.130094 517.467525 914.127613z"></path>
        <path d="M513.044796 181.616384c-91.091648 0-165.199483 74.112951-165.199483 165.210739 0 91.076298 74.107835 165.172877 165.199483 165.172877 91.083461 0 165.184133-74.096579 165.184133-165.172877C678.228929 255.729336 604.128257 181.616384 513.044796 181.616384zM513.044796 470.51005c-68.213591 0-123.709533-55.484685-123.709533-123.682927 0-68.219731 55.495942-123.720789 123.709533-123.720789 68.205405 0 123.694183 55.501058 123.694183 123.720789C636.738979 415.025365 581.2502 470.51005 513.044796 470.51005z"></path>
      </svg>
    );
  }
  if (name == 'source') {
    dom = (
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M768.73106 703.537712c-35.606921 0-67.945574 14.793214-91.167479 38.359147l-309.109357-171.670082c9.116748-17.545439 14.621199-37.155048 14.621199-58.312783 0-12.55703-2.408198-24.426004-5.676466-35.950949l304.63699-189.215522c22.705863 20.469679 52.464304 33.198723 85.146985 33.198723 70.525785 0 127.978498-57.452713 127.978498-127.978498S837.708718 63.989249 767.182933 63.989249s-127.978498 57.452713-127.978498 127.978498c0 14.621199 2.92424 28.382328 7.396607 41.455401L344.716278 420.746514c-23.049891-22.705863-54.700487-36.983034-89.791366-36.983034-70.525785 0-127.978498 57.452713-127.978498 127.978498s57.452713 127.978498 127.978498 127.978498c25.630102 0 49.540064-7.740635 69.493701-20.813707l321.150344 178.378633c-3.096254 11.008903-5.160423 22.18982-5.160423 34.058794 0 70.525785 57.452713 127.978498 127.978498 127.978498s127.978498-57.452713 127.978498-127.978498S839.256845 703.537712 768.73106 703.537712zM767.182933 127.978498c35.262893 0 63.989249 28.726356 63.989249 63.989249s-28.726356 63.989249-63.989249 63.989249-63.989249-28.726356-63.989249-63.989249S731.92004 127.978498 767.182933 127.978498zM191.107677 511.913993c0-35.262893 28.726356-63.989249 63.989249-63.989249s63.989249 28.726356 63.989249 63.989249-28.726356 63.989249-63.989249 63.989249S191.107677 547.176886 191.107677 511.913993zM768.73106 895.505459c-35.262893 0-63.989249-28.726356-63.989249-63.989249s28.726356-63.989249 63.989249-63.989249 63.989249 28.726356 63.989249 63.989249C832.720309 866.951117 803.993953 895.505459 768.73106 895.505459z"></path>
      </svg>
    );
  }
  if (name == 'officialAccount') {
    dom = (
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M682.409135 315.751361c11.047614 0 21.978571 0.811482 32.821523 2.01796-29.490661-137.322575-176.304402-239.35132-343.883071-239.35132-187.352015 0-340.821339 127.703497-340.821339 289.864784 0 93.603865 51.058886 170.46951 136.381134 230.087329l-34.088376 102.528118 119.145587-59.747779c42.632983 8.438183 76.839039 17.114796 119.384018 17.114796 10.694573 0 21.300119-0.528026 31.816636-1.354857-6.658653-22.786982-10.516518-46.653553-10.516518-71.417563C392.646682 436.592566 520.513908 315.751361 682.409135 315.751361zM499.153414 223.342718c25.662473 0 42.662659 16.882506 42.662659 42.529629 0 25.544793-17.000186 42.662659-42.662659 42.662659-25.544793 0-51.176566-17.117866-51.176566-42.662659C447.977871 240.225223 473.609645 223.342718 499.153414 223.342718zM260.625856 308.535005c-25.541723 0-51.321876-17.117866-51.321876-42.662659 0-25.647123 25.780153-42.529629 51.321876-42.529629 25.543769 0 42.544979 16.882506 42.544979 42.529629C303.169811 291.417139 286.169625 308.535005 260.625856 308.535005z"></path>
        <path d="M993.473753 581.399603c0-136.263453-136.353504-247.335155-289.497417-247.335155-162.160263 0-289.880133 111.071701-289.880133 247.335155 0 136.498814 127.718847 247.335155 289.880133 247.335155 33.94102 0 68.173682-8.558933 102.263082-17.10354l93.483114 51.191916-25.631774-85.173868C942.502871 726.32432 993.473753 658.265248 993.473753 581.399603zM609.989755 538.752294c-16.97051 0-34.088376-16.882506-34.088376-34.103726 0-16.98279 17.117866-34.085306 34.088376-34.085306 25.780153 0 42.662659 17.10354 42.662659 34.085306C652.652414 521.869788 635.769908 538.752294 609.989755 538.752294zM797.460474 538.752294c-16.85283 0-33.853016-16.882506-33.853016-34.103726 0-16.98279 17.000186-34.085306 33.853016-34.085306 25.543769 0 42.659589 17.10354 42.659589 34.085306C840.120063 521.869788 823.004243 538.752294 797.460474 538.752294z"></path>
      </svg>
    );
  }
  if (name == 'download') {
    dom = (
      // <svg
      //   style={{ display: 'block' }}
      //   fill={color || MAINCOLOR2}
      //   viewBox="0 0 1024 1024"
      //   version="1.1"
      //   xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      // >
      //   <path d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"></path>
      // </svg>
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M794.0096 445.2608a35.4304 35.4304 0 0 0-9.3696-24.9344l-0.512-0.512a34.49344 34.49344 0 0 0-24.01792-9.57952 36.5568 36.5568 0 0 0-26.33728 11.29472L547.84 607.4624V107.46368a35.84 35.84 0 1 0-71.68 0v499.8144L290.42688 421.53984c-6.97856-6.97856-15.97952-10.85952-25.41568-11.0848l-0.86016-0.01024c-9.1136 0-17.60768 3.43552-24.07936 9.37984l-0.512 0.512c-13.29664 13.83424-12.76416 36.38784 1.7152 50.3552l242.54464 242.54464a35.90656 35.90656 0 0 0 11.94496 9.82528c0.59392 0.31744 1.2032 0.59392 1.81248 0.87552 0.22528 0.09728 0.44544 0.20992 0.67584 0.30208 4.224 1.80224 8.7552 2.72896 13.3376 2.72896l0.08704-0.00512 0.32256 0.01536c0.09216 0 0.17408-0.01536 0.26624-0.01536 0.09728 0 0.18944 0.01536 0.28672 0.01536a33.75616 33.75616 0 0 0 20.224-6.67136c2.51904-1.79712 4.80768-3.8912 6.784-6.26176l243.36384-243.36896c6.97856-6.97344 10.85952-15.97952 11.0848-25.41568z"></path>
        <path d="M880.64 747.57632v61.44c0 39.58784-32.09216 71.68-71.68 71.68H215.04c-39.58784 0-71.68-32.09216-71.68-71.68v-61.44a35.84 35.84 0 1 0-71.68 0v61.44c0 79.17568 64.18432 143.36 143.36 143.36h593.92c79.17568 0 143.36-64.18432 143.36-143.36v-61.44a35.84 35.84 0 1 0-71.68 0z"></path>
      </svg>
    );
  }
  if (name == 'search') {
    dom = (
      // <svg
      //   style={{ display: 'block' }}
      //   fill={color || MAINCOLOR2}
      //   viewBox="0 0 1024 1024"
      //   version="1.1"
      //   xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      // >
      //   <path d="M896 64H128c-35.296 0-64 28.704-64 64v768c0 35.296 28.704 64 64 64h592a32 32 0 1 0 0-64H128V128h768v592a32 32 0 1 0 64 0V128c0-35.296-28.704-64-64-64z" p-id="3221"></path><path d="M791.744 746.496A206.752 206.752 0 0 0 832 624c0-114.688-93.312-208-208-208S416 509.312 416 624s93.312 208 208 208a206.752 206.752 0 0 0 122.496-40.256l110.88 110.88a31.904 31.904 0 0 0 45.248 0 31.968 31.968 0 0 0 0-45.248l-110.88-110.88zM480 624c0-79.392 64.608-144 144-144s144 64.608 144 144-64.608 144-144 144-144-64.608-144-144zM800 264a32 32 0 0 0-32-32H256a32 32 0 0 0 0 64h512a32 32 0 0 0 32-32zM256 422.656a32 32 0 0 0 0 64h96a32 32 0 0 0 0-64H256z"></path>
      // </svg>
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M955.069071 864.311021 740.015134 649.258107c-3.752464-3.751441-8.841366-5.860475-14.149255-5.860475-5.306866 0-10.395768 2.108011-14.149255 5.860475l-16.692171 16.692171-38.34226-38.34226c53.03796-59.810201 85.298711-138.442072 85.298711-224.478588 0-186.774871-151.952784-338.727655-338.727655-338.727655S64.527642 216.35456 64.527642 403.12943c0 186.775894 151.952784 338.728678 338.727655 338.728678 86.36909 0 165.276231-32.510438 225.170343-85.913718l38.303374 38.303374-17.34504 17.34504c-7.812943 7.813966-7.812943 20.48352 0 28.297486l215.051891 215.052914c3.753487 3.751441 8.841366 5.860475 14.149255 5.860475 5.306866 0 10.395768-2.108011 14.149255-5.860475l62.334697-62.334697C962.883037 884.794541 962.883037 872.124987 955.069071 864.311021zM104.546078 403.12943c0-164.709319 133.9999-298.709219 298.709219-298.709219s298.709219 133.9999 298.709219 298.709219S567.964616 701.839673 403.255297 701.839673 104.546078 567.838749 104.546078 403.12943zM878.585119 912.496463 691.829691 725.741036l34.036187-34.036187 186.755428 186.755428L878.585119 912.496463z"></path>
      </svg>
    );
  }
  if (name == 'preview') {
    dom = (
      <svg
        style={{ display: 'block' }}
        fill={color || MAINCOLOR2}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path d="M989.789091 482.466909a45.381818 45.381818 0 0 1 0 59.066182C924.904727 617.634909 735.511273 814.545455 512 814.545455S99.048727 617.634909 34.210909 541.533091a45.381818 45.381818 0 0 1 0-59.066182C99.048727 406.365091 288.465455 209.454545 512 209.454545s412.904727 196.910545 477.789091 273.012364zM512 744.727273c182.248727 0 347.415273-161.885091 410.856727-232.727273C859.415273 441.157818 694.248727 279.272727 512 279.272727c-182.248727 0-347.392 161.885091-410.856727 232.727273C164.584727 582.842182 329.728 744.727273 512 744.727273z m0-151.272728c-44.916364 0-81.454545-36.538182-81.454545-81.454545s36.538182-81.454545 81.454545-81.454545 81.454545 36.538182 81.454545 81.454545-36.538182 81.454545-81.454545 81.454545z m0-232.727272a151.458909 151.458909 0 0 0-151.272727 151.272727c0 83.409455 67.863273 151.272727 151.272727 151.272727s151.272727-67.863273 151.272727-151.272727-67.863273-151.272727-151.272727-151.272727"></path>
      </svg>
    );
  }
  return <div style={{ paddingRight: 4 }}>{dom}</div>;
};
const tagEventDom = (tagArray: any[]) => {
  if (tagArray) {
    return (
      <Space align="start" size={2}>
        <ProTooltip placement="left" tooltip="关联标签">
          <div style={{ paddingTop: 4 }}>{svgDom('tagEvent')}</div>
        </ProTooltip>
        <div>
          <Space size={[8, 8]} wrap>
            {tagArray.map((it, index: number) => {
              return (
                <Tag color="#e9e9e9" style={{ borderRadius: 11, color: '#000' }} key={index}>
                  {it}
                </Tag>
              );
            })}
          </Space>
        </div>
      </Space>
    );
  }
  return null;
};
const addressDom = (item: any) => {
  if (item.properties_country) {
    return (
      <Space align="center" size={2}>
        <ProTooltip placement="left" tooltip="IP所在地">
          {svgDom('address')}
        </ProTooltip>
        <span style={{ color: '#939393' }}>
          {`${item.properties_country}-${item.properties_province}-${item.properties_city}`}
        </span>
      </Space>
    );
  }
  return null;
};
const deviceDom = (device: string) => <>通过 {device || '未知设备'} </>;
const titleDom = (item: any, itemData: any) => {
  return (
    <>
      <b style={{ color: MAINCOLOR2 }}>{pageEventType[item.event]}</b>
      {item?.lookstar_app_title || item?.properties_title
        ? `《${item?.lookstar_app_title || item?.properties_title}》`
        : null}
    </>
  );
};
const downloadDom = (item: any) => {
  if (item.event == 'user_download') {
    return (
      <Space align="start" size={2}>
        <ProTooltip placement="left" tooltip="下载资料">
          <div style={{ paddingTop: 4 }}>{svgDom('download')}</div>
        </ProTooltip>
        <div>
          {isArray(item?.properties_item_key)
            ? item?.properties_item_key?.map((it: string, index: number) => (
                <div key={index}>{it}</div>
              ))
            : item?.properties_item_key}
        </div>
      </Space>
    );
  }
  return null;
};
const searchDom = (item: any) => {
  if (item.event == 'user_search') {
    return (
      <Space align="start" size={2}>
        <ProTooltip placement="left" tooltip="搜索内容">
          <div style={{ paddingTop: 4 }}>{svgDom('search')}</div>
        </ProTooltip>
        <div>{item.properties_item_key}</div>
      </Space>
    );
  }
  return null;
};
const previewDom = (item: any) => {
  if (item.event == 'user_preview' && item.properties_item_key) {
    return (
      <Space align="start" size={2}>
        <ProTooltip placement="left" tooltip="浏览内容">
          <div style={{ paddingTop: 4 }}>{svgDom('preview')}</div>
        </ProTooltip>
        <div>{item.properties_item_key}</div>
      </Space>
    );
  }
  return null;
};
const sourceDom = (source: string, sourceType?: string, color?: string) => {
  if (source) {
    return (
      <Space align="center" size={2}>
        {svgDom('source', color)}
        来源：{source} {sourceType}
      </Space>
    );
  }
  return null;
};

const officialAccountFollow = (item: any) => {
  if (item.properties_mp_event == 'unsubscribe') {
    return <>取消关注</>;
  }
  if (item.properties_mp_event == 'subscribe') {
    return <>关注</>;
  }
  return null;
};
const officialAccountTitle = (wechat_name: string) => {
  return <>公众号 {wechat_name}</>;
};
const officialAccountEvent = (item: any) => {
  let dom: any = null;
  switch (item.properties_mp_msg_type) {
    case 'click':
      dom = (
        <>
          点击菜单 <b style={{ color: MAINCOLOR2 }}>{item.menu_text}</b>
        </>
      );
      break;
    case 'text':
      dom = (
        <>
          发送消息 <b style={{ color: MAINCOLOR2 }}>{item.properties_mp_content}</b>
        </>
      );
      break;
    case 'event':
      if (item.properties_mp_event == 'SCAN') {
        dom = <>扫描二维码《{item.mp_qrcode_name}》</>;
      } else if (['VIEW', 'view_miniprogram', 'CLICK'].includes(item.properties_mp_event)) {
        dom = (
          <>
            {item?.mp_menu_name ? (
              <>点击公众号菜单《{item.mp_menu_name}》</>
            ) : (
              <>点击公众号菜单：该菜单已被删除</>
            )}
          </>
        );
      }
      break;
    default:
      dom = '';
      break;
  }

  return <>{dom}</>;
};

const classNameType = {
  'monitor-preview': '预览',
  'monitor-download': '下载',
};

const ProfileTimeline: React.FC<any> = ({ id }: any) => {
  const thisScroll = useRef(null);
  const autoScroll = useRef(true); // 是否需要自动滑动
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>({
    page: 1,
  });
  const [isEnd, setIsEnd] = useState(false);

  const [list, setList] = useState(null);

  const H5Details = (item: any) => {
    const itemData = pageType[item.lookstar_app_name] || {};

    let action = null;
    let share = null;
    if (item.page_event_type == '$pageview') {
      action = '查看';
    }
    if (item.page_event_type == '$WebClick') {
      action = classNameType[item.className];
    }
    if (item?.sourceName) {
      share = sourceDom(item.sourceName, `${item.sourceType}分享`);
    }
    return (
      <Space direction="vertical">
        <Space align="center" size={2} style={{ flexWrap: 'wrap' }}>
          {deviceDom(item.properties_user_agent_model)}
          {action}
          {titleDom(item, itemData)}
        </Space>
        {share}
        {previewDom(item)}
        {downloadDom(item)}
        {searchDom(item)}
        {tagEventDom(item.lookstar_tag)}
        {addressDom(item)}
      </Space>
    );
  };

  const officialAccount = (item: any, color: string) => {
    // let source = null;
    // if (item.sourceName) {
    //   source = sourceDom(item.sourceName, `《${item.sourceQrcodeTitle}》`, type[item.type].color);
    // }
    return (
      <Space direction="vertical">
        <Space align="center" size={2}>
          {officialAccountFollow(item)}
          {officialAccountEvent(item)}
        </Space>
        <Space align="center" size={2}>
          {svgDom('officialAccount', color)}
          {officialAccountTitle(item.mp_authorizer_nickname)}
        </Space>
        {tagEventDom(item.lookstar_tag)}
        {/* {source} */}
      </Space>
    );
  };

  const loadMoreData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!loading) {
          const currentParams = {
            ...params,
            page: params.page + 1,
          };
          setParams(currentParams);
        }
        resolve();
      }, 300);
    });
  };

  const getTimelineRule = () => {
    if (isEnd) return;
    if (loading) return;
    setLoading(true);
    queryTimelineRule(id, params)
      .then((res) => {
        setLoading(false);
        if (res.length == 0) {
          setIsEnd(true);
        }

        let currentList = [];
        if (params.page == 1) {
          currentList = res;
        } else {
          currentList = [...list, ...res];
        }
        setList(currentList);
      })
      .catch(() => setLoading(false));
  };

  const getTimelineItem = (event: any) => {
    return typeArray.filter((item) => item.event.includes(event))[0] || {};
  };

  useEffect(() => {
    getTimelineRule();
  }, [params]);

  useEffect(() => {
    if (list?.length) thisScroll.current.refresh();
  }, [list]);

  return (
    <ProCard
      bordered={false}
      style={{ marginBottom: 24 }}
      bodyStyle={{ position: 'relative', overflow: 'hidden' }}
      title="互动日志"
      extra={
        <Space>
          <Radio.Group
            buttonStyle="solid"
            size="small"
            onChange={(e) => {
              const currentParams: any = {
                page: 1,
              };
              if (e?.target?.value) currentParams.event = e?.target?.value;
              setIsEnd(false);
              setParams(currentParams);
              thisScroll?.current?.scrollTo(0, 0);
            }}
            defaultValue={params?.event || 0}
            optionType="button"
            options={[
              {
                label: '全部',
                value: 0,
              },
              {
                label: '注册',
                value: 'user_register_success',
              },
              {
                label: '搜索',
                value: 'user_search',
              },
              {
                label: '下载资料',
                value: 'user_download',
              },
              {
                label: '预览内容',
                value: 'user_preview',
              },
              {
                label: '公众号事件',
                value: '$MPMessage',
              },
            ]}
          />
        </Space>
      }
    >
      <div className={styles['badege']}>
        {Object.keys(pageType).map((item: any, index: number) => (
          <div key={index} style={{ padding: '5px 0' }}>
            <Badge color={pageType[item].color} text={pageType[item].title} />
          </div>
        ))}
      </div>
      <Spin spinning={loading}>
        <div style={{ position: 'relative', height: 500 }}>
          <Scroll
            click
            bounce={false} // 设置mouseWheel == true 的时候，最好关闭回弹否则会抖动
            mouseWheel={true}
            scrollbar={false}
            pullUpLoad={{
              txt: '',
            }}
            doScrollStart={() => {
              autoScroll.current = false;
            }}
            pullUpLoadMoreData={loadMoreData}
            isPullUpTipHide={true}
            refFun={(_scroll: any) => {
              thisScroll.current = _scroll;
            }}
            pullupStyle={{
              height: 1,
            }}
          >
            <div style={{ width: '100%', height: 10 }} />
            {!list?.length && list != null ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 500,
                  width: '100%',
                }}
              >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            ) : (
              <Timeline mode="left">
                {list?.map((item: any, index) => {
                  item.lookstar_app_name = item.lookstar_app_name || 'unknown';

                  const itemType = getTimelineItem(item.event);
                  if (item.lookstar_app_name)
                    itemType.color = pageType[item.lookstar_app_name]?.color || PRIMARYCOLOR;

                  return (
                    <Timeline.Item
                      className={styles['timeline-label']}
                      key={index}
                      label={dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
                      color={itemType.color || PRIMARYCOLOR}
                    >
                      {itemType.type === 1 ? H5Details(item) : null}
                      {itemType.type === 2
                        ? officialAccount(item, itemType.color || PRIMARYCOLOR)
                        : null}
                      {/*
                          {item.type == 1 ? H5Details(item) : null}
                          {item.type == 2 ? officialAccount(item) : null}
                        */}
                      {/*
                          {handleTextDom(item)}
                        */}
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            )}
          </Scroll>
        </div>
      </Spin>
    </ProCard>
  );
};
export default ProfileTimeline;
