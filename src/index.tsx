import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import locale from 'antd/locale/vi_VN'
import App from './App'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    colorPrimary: '#f15a29',
                },
                components: {
                    Button: {
                        borderRadius: 3,
                    },
                    Menu: {
                        itemBg: '',
                        itemColor: '#1e0d03',
                        itemSelectedColor: '#fff',
                        itemSelectedBg: '#f15a29',
                    },
                },
            }}>
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </React.StrictMode>,
)
