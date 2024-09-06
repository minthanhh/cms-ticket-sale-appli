import { Layout } from 'antd'
import { Header, Sidebar } from '@/components/Commons'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const SidebarLayout = () => {
    return (
        <Layout className="w-full h-full overflow-hidden flex">
            <Sidebar />
            <Layout>
                <Header />
                <Content className="h-ins-content-height mx-ins-content-margin mb-ins-content-margin">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default SidebarLayout
