import { useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Account, Note, ProfileTag, Timeline } from './Component';
import { getRule, updateStarRule } from '../service';

export default () => {
  const params = useParams();
  const id: any = params.id;

  const [profile, handleProfile] = useState<any>(undefined);

  const init = () => {
    getRule(id).then((result) => handleProfile(result));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Account
            profile={profile}
            id={id}
            onStar={async () => {
              await updateStarRule(id, {
                star: profile?.star ? 0 : 1
              });
              handleProfile({
                ...profile,
                star: profile?.star ? 0 : 1
              });
            }}
          />
          <Note />
        </Col>
        <Col lg={17} md={24}>
          <ProfileTag
            id={id}
            profile={profile}
          />
          {/* <Authorizer profile={profile} /> */}
          <Timeline id={id} />
        </Col>
      </Row>
    </>
  );
};
