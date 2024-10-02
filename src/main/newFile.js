import { ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store();


const runExtended = () => {
 function doSomeWork(data) {
    return data + 's';
  }
  
  ipcMain.on('get-data', async (event) => {
    const newdata = store.get('jsontree');
    console.log('store get: ' + newdata)

    event.reply('get-data-reply', newdata);
  });

  ipcMain.on('set-data', async (event, data) => {
    store.set('jsontree', data);
    console.log('store set: ' + data)
    event.reply('set-data-reply');
  });
};
export default runExtended;
