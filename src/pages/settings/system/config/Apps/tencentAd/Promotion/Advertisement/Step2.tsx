import { Typography } from 'antd';
import style from './style.less';
import Advertisement from '../components/Advertisement';
import ExposureDetails from "../components/ExposureDetails";

const { Title } = Typography;

const Step2 = () => {
  return (
    <>
      <Title level={5}>
        推广计划
      </Title>
      <div className={style['step2']}>
        <div className={style['step2-left']}>
          <Advertisement />
        </div>
        <div className={style['step2-right']}>
          <ExposureDetails />
        </div>
      </div>
    </>
  );
};

export default Step2;
