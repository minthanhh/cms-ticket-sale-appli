import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <Layout className="w-full h-full">
            <Layout.Content>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}

export default RootLayout
