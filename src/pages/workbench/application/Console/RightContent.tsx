import { ProRow } from '@/components/BaseComponents';
import UserInfo from './components/UserInfo';
import Notice from './components/Notice';
import ProblemFeedback from '@/pages/settings/system/components/ProblemFeedback';

export default ({ userInfoRef }: any) => {
  return (
    <ProRow>
      <ProRow.Col span={24}>
        <UserInfo userInfoRef={userInfoRef} />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <Notice />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <ProblemFeedback />
      </ProRow.Col>
    </ProRow>
  );
};
