import { ProFormText, ProFormList, ProFormTextArea } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProFormText
        name="standard_issues"
        label="标准问题"
      />
      <ProFormList
        name="similar_problems"
        label="相似问题"
        creatorButtonProps={{
          creatorButtonText: "新建"
        }}
      >
        <ProFormText
          name="text"
          width="lg"
        />
      </ProFormList>
      <ProFormTextArea
        name="answer"
        label="标准问题"
      />
    </>
  )
}
