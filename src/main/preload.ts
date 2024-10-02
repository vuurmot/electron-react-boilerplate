// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    getData: () => {
      return new Promise((resolve) => {
        ipcRenderer.once('get-data-reply', (_, arg) => {
          resolve(arg);
        });
      
        ipcRenderer.send('get-data');
      });
    },
    setData: (arg: any) => {
      return new Promise((resolve) => {
        ipcRenderer.once('set-data-reply', (_, arg) => {
          resolve(arg);
        });
        ipcRenderer.send('set-data', arg);
      });
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
