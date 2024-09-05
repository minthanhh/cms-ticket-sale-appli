import { Layout, theme } from 'antd'
import { Header, Sidebar } from '@/components/Commons'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const SidebarLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <Layout className="w-full h-full overflow-hidden">
            <Sidebar />
            <Layout>
                <Header />
                <Content className="h-ins-content-height mx-ins-content-margin mb-ins-content-margin">
                    <div
                        className="w-full h-full"
                        style={{
                            padding: 16,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SidebarLayout
