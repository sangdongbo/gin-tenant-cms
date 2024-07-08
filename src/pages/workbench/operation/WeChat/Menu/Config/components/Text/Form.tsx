import ProFormTextAreaLink from '@/components/BaseComponents/ProFormTextAreaLink';

export default (props: any) => {
  return (
    <>
      <ProFormTextAreaLink
        name="value"
        label="内容"
        rules={[{ required: true }]}
      />
    </>
  )
};
