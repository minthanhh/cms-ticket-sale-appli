import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import locale from 'antd/locale/vi_VN';
import App from './App';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <ConfigProvider locale={locale}>
         <Provider store={store}>
            <App />
         </Provider>
      </ConfigProvider>
   </React.StrictMode>
);
