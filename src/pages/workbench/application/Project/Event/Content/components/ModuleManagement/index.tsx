import { useModel } from '@umijs/max';
import Module from './Module';
import Introduction from '../Details/BeforeMeeting/Introduction';
import DataDownload from '../Details/BeforeMeeting/DataDownload';
import Schedule from '../Details/BeforeMeeting/Schedule';
import Guests from '../Details/BeforeMeeting/Guests';
import Address from '../Details/BeforeMeeting/Address';
import Register from '../Details/BeforeMeeting/Register';
import Remind from '../Details/BeforeMeeting/Remind';
import Notice from '../Details/DuringMeeting/Notice';
import LiveRoom from '../Details/DuringMeeting/LiveRoom';

const ShowModule = ({ eventId, projectId, menuKey }: any) => {
  if (menuKey == 'info') return <Introduction eventId={eventId} projectId={projectId} />;
  if (menuKey == 'data-download') return <DataDownload eventId={eventId} projectId={projectId} />;
  if (menuKey == 'schedule') return <Schedule eventId={eventId} projectId={projectId} />;
  if (menuKey == 'speaker') return <Guests eventId={eventId} projectId={projectId} />;
  if (menuKey == 'address') return <Address eventId={eventId} projectId={projectId} />;
  if (menuKey == 'form') return <Register eventId={eventId} projectId={projectId} />;
  if (menuKey == 'notice') return <Notice eventId={eventId} projectId={projectId} />;
  if (menuKey == 'remind') return <Remind eventId={eventId} projectId={projectId} />;
  if (menuKey == 'live') return <LiveRoom eventId={eventId} projectId={projectId} />;
  return null;
};

export default ({ eventId, projectId }: any) => {
  const { moduleManagementMenuKey, eventDetails } = useModel('event', (model) => model);

  return (
    <div>
      {
        moduleManagementMenuKey ? <ShowModule eventId={eventId} projectId={projectId} menuKey={moduleManagementMenuKey} /> : <Module />
      }
    </div>
  )
}
