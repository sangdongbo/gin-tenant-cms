import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Progress, ConfigProvider } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@/components/BaseComponents';
import { queryDocumentsRule } from '../../../service';


const Summary = ({ dataSource: baseDataSource, ...props }: any) => {
  const columns: ProColumns[] = [
    {
      title: '平均检索相关性得分',
      dataIndex: 'retrieval_relevancy_score',
      render(dom, entity) {
        return entity?.retrieval_relevancy_score?.toFixed(3) || 0;
      },
    },
    {
      title: '平均答案相似性得分',
      dataIndex: 'answer_similarity_score',
      render(dom, entity) {
        return entity?.answer_similarity_score?.toFixed(3) || 0;
      },
    },
    {
      title: '平均延迟',
      dataIndex: 'latency',
      render(dom, entity) {
        return entity?.latency?.toFixed(3) || 0;
      },
    },
  ];
  const [dataSource, setDataSource] = useState<any[]>([]);

  const handleDataSource = () => {
    if (!baseDataSource.length) return;
    let retrieval_relevancy_score = 0;
    let answer_similarity_score = 0;
    let latency = 0;
    baseDataSource.forEach((item: any) => {
      retrieval_relevancy_score += item.retrievalScore.score;
      answer_similarity_score += item.answerScore.score;
      latency += item.latency;
    });
    setDataSource([
      {
        retrieval_relevancy_score: retrieval_relevancy_score / baseDataSource.length,
        answer_similarity_score: answer_similarity_score / baseDataSource.length,
        latency: latency / baseDataSource.length,
      }
    ]);
  };

  useEffect(() => {
    handleDataSource();
  }, [baseDataSource]);

  return (
    <ProTable
      rowKey="id"
      search={false}
      pagination={false}
      cardProps={{
        bodyStyle: { padding: 0 },
      }}
      columns={columns}
      dataSource={dataSource}
      {...props}
    />
  );
};

const Content = ({ url, numEvalQuestions = 3 }: any) => {
  const columns: ProColumns[] = [
    {
      title: '问题',
      dataIndex: 'question',
    },
    {
      title: '预期回复',
      dataIndex: 'answer',
    },
    {
      title: '观察回复',
      dataIndex: 'result',
    },
    {
      title: '检索相关性得分',
      dataIndex: ['retrievalScore', 'justification'],
    },
    {
      title: '回复相似性得分',
      dataIndex: ['answerScore', 'justification'],
    },
    {
      title: '延迟（s）',
      dataIndex: 'latency',
      render(dom, entity) {
        return entity?.latency?.toFixed(3) || 0;
      },
    },
  ];
  const [dataSource, setDataSource] = useState<any[]>([]);

  const init = () => {
    queryDocumentsRule({
      file_url: url,
      num_eval_questions: numEvalQuestions,
    }, (res: any) => {
      setDataSource((sourceRes: any[]) => {
        return [
          ...sourceRes,
          res?.data,
        ];
      })
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ConfigProvider
        renderEmpty={() => <div style={{ width: '100%', justifyContent: 'center' }}>
          <Progress
            status="active"
            strokeColor={{
              '0%': '#0bc7ff',
              '100%': '#0afec6'
            }}
            type="circle"
            percent={dataSource.length / numEvalQuestions * 100}
            format={() => {
              return `${dataSource.length}/${numEvalQuestions}`
            }}
            style={{ margin: 0 }}
          />
        </div>}
      >
        <Summary
          headerTitle="总结"
          dataSource={dataSource?.length == numEvalQuestions ? dataSource : []}
        />
      </ConfigProvider>
      <ConfigProvider
        renderEmpty={() => <div style={{ textAlign: 'center', padding: '50px 0' }}>评估中</div>}
      >
        <div style={{ width: '100%', height: 24 }} />
        <ProTable
          rowKey="id"
          search={false}
          pagination={false}
          cardProps={{
            bodyStyle: { padding: 0 },
          }}
          columns={columns}
          headerTitle="实验结果"
          dataSource={dataSource}
        />
      </ConfigProvider>
    </>
  )
};

export default ({ trigger, url, numEvalQuestions, projectId, onReset, ...props }: any) => {
  const [open, setOpen] = useState(false);
  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    };

    return React.cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);

  return (
    <>
      {triggerDom}
      <Modal
        destroyOnClose={true}
        width={1000}
        footer={null}
        {...props}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Content url={url} numEvalQuestions={numEvalQuestions} />
      </Modal>
    </>
  )
}
