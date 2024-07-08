import { history } from 'umi';
import { Typography } from 'antd';
import { StepsForm } from '@ant-design/pro-components';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import style from './style.less';

const Create = () => {
  return (
    <div className={style.create}>
      <StepsForm
        onFinish={(values) => {
          history.back();
          return Promise.resolve(true);
        }}
        stepsRender={() => null}
        containerStyle={{ width: '100%' }}
      >
        <StepsForm.StepForm
          name="step1"
          onFinish={async (values) => {
            return true;
          }}
        >
          <Step1 />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="step2"
          onFinish={async (values) => {
            return true;
          }}
        >
          <Step2 />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="step3"
          onFinish={async (values) => {
            return true;
          }}
        >
          <Step3 />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};

export default Create;
