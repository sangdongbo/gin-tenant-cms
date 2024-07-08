import ProList from './components/ProList';
import { queryRule } from './service';

export default () => {
  return (
    <ProList
      request={(parmas: any) => queryRule({ ...parmas, sort: '-state,-created_at' })}
      search={{}}
      headerTitle="所有项目"
      pagination={{ defaultPageSize: 12, showSizeChanger: false }}
      itemCardProps={{
        style: { padding: '0' },
      }}
    />
  );
};
