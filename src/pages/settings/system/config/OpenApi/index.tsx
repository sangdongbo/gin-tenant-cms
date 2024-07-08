import { useEffect, useState } from 'react';
import ClientInfo from './components/ClientInfo';
import { getRule } from './service';
import NotClient from './components/NotClient';
import ProCard from '@/components/BaseComponents/ProCard';

export default () => {
  const [client, setClient] = useState<any>();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    setLoading(true);
    try {
      const res = await getRule();
      setClient(res);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ProCard title="开放平台信息" loading={loading}>
        {client?.id ? (
          <ClientInfo dataSource={client} clientId={client?.id} />
        ) : (
          <NotClient
            onCancel={() => {
              init();
            }}
          />
        )}
      </ProCard>
    </>
  );
};
