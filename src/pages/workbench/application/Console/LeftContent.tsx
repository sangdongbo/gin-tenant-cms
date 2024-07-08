import { ProRow } from '@/components/BaseComponents';
import QuicklyCreate from './components/QuicklyCreate';
import ProList from '../Project/components/ProList';
import ProProjectList from '../Project/components/ProProjectList';

import { queryRule } from '../Project/service';

export default ({ onQuicklyCreate, onCreate, onDelete, onCopy }: any) => {
  return (
    <ProRow>
      <ProRow.Col span={24}>
        <QuicklyCreate onCreate={onQuicklyCreate} />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <ProProjectList onCreate={onCreate} onDelete={onDelete} onCopy={onCopy} />
      </ProRow.Col>
    </ProRow>
  );
};
