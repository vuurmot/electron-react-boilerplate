import { Tree } from 'react-arborist';
import icon from '../../assets/icon.svg';
import Node from './Node';

function Entry() {
  const data = [
    { id: '1', name: 'Unread', price: 100 },
    { id: '2', name: 'Threads' },
    {
      id: '3',
      name: 'Chat Rooms',
      children: [
        { id: 'c1', name: 'General' },
        { id: 'c2', name: 'Random' },
        { id: 'c3', name: 'Open Source Projects' },
      ],
    },
    {
      id: '4',
      name: 'Direct Messages',
      children: [
        { id: 'd1', name: 'Alice' },
        { id: 'd2', name: 'Bob' },
        { id: 'd3', name: 'Charlie' },
      ],
    },
  ];
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="Hello">
        <Tree initialData={data}>{Node}</Tree>
      </div>
    </div>
  );
}
export default Entry;
