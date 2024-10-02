import { Tree } from 'react-arborist';
import icon from '../../assets/icon.svg';
import Node from './Node';
import { useEffect, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Button } from 'antd';

function Entry() {
  const [textR, setTextR] = useState([]);
  const treeRef = useRef();

  useEffect(() => {
    async function fetchData() {
      var reply = await window.electron.ipcRenderer.getData();
      console.log('get data reply: ' + JSON.stringify(reply));
    }
    fetchData();
  }, []);
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
  const generateJSON = async () => {
    const tree = treeRef.current;
    const data = tree.visibleNodes.reduce((acc, obj) => {
      acc.push(obj.data);
      return acc;
    }, []);
    // const data = JSON.parse(JSON.stringify(tree.visibleNodes));
    setTextR(data);
    await window.electron.ipcRenderer.setData(data);
  };
  return (
    <div>
      <div className="Hello">
        <Button onClick={generateJSON}>Generate JSON</Button>
        <div>{JSON.stringify(textR)}</div>
        <TextArea rows={4} />
      </div>
      <div className="Hello">
        <Tree ref={treeRef} initialData={data}>
          {Node}
        </Tree>
      </div>
    </div>
  );
}
export default Entry;
