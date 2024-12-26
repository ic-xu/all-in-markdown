import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {ipcRenderer } from 'electron';
import App from './App';
import './index.css';

// const FileMonitor:React.FC = () => {
//   const openDirectory = async () => {
//     try {
//       const result = await ipcRenderer.invoke('open-directory-dialog');
//       console.log('Selected directories:', result);
//       if (result.length > 0) {
//         ipcRenderer.invoke('set-watch-directory', result[0]);
//       }
//     } catch (error) {
//       console.error('Failed to open directory:', error);
//     }
//   };

//   useEffect(() => {
//     const handleFileChange = (event: any, data: { filename: string; eventType: string }) => {
//       console.log(`File ${data.filename} changed: ${data.eventType}`);
//     };

//     const handleNetworkChange = (event: any, networkInterfaces: any) => {
//       console.log('Network interfaces changed:', networkInterfaces);
//     };

//     ipcRenderer.on('file-changed', handleFileChange);
//     ipcRenderer.on('network-changed', handleNetworkChange);

//     return () => {
//       ipcRenderer.removeListener('file-changed', handleFileChange);
//       ipcRenderer.removeListener('network-changed', handleNetworkChange);
//     };
//   }, []);

//   return (
//     <button 
//       onClick={openDirectory}
//       className="px-4 py-2 bg-blue-500 text-white rounded"
//     >
//       选择监控目录
//     </button>
//   );
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <FileMonitor /> */}
  </React.StrictMode>,
);