import { Avatar, Layout, theme } from 'antd'

const { Header: AntHeader } = Layout

const Header = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    return (
        <AntHeader className="h-ins-header-height bg-transparent flex items-center justify-between" style={{ background: colorBgContainer }}>
            Antd Header Hello
            <Avatar>Hello</Avatar>
        </AntHeader>
    )
}

export default Header
