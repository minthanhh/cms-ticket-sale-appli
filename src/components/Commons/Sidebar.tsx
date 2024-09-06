import { Layout, Menu, MenuProps } from 'antd'
import { useState } from 'react'
import { MailOutlined, HomeOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons'
import insightLogo from '@/assets/images/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

interface LevelKeysProps {
    key?: string
    children?: LevelKeysProps[]
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {}
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level
            }
            if (item.children) {
                func(item.children, level + 1)
            }
        })
    }
    func(items1)
    return key
}

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const defaultSelectKey = [location.pathname.split('/')[1]]
    const [stateOpenKeys, setStateOpenKeys] = useState(defaultSelectKey)

    const items: MenuItem[] = [
        {
            key: '',
            icon: <HomeOutlined />,
            label: 'Trang chủ',
            onClick: () => navigate('/'),
        },
        {
            key: 'manage-tickets',
            icon: <MailOutlined />,
            label: 'Quản lý vé',
            onClick: () => navigate('/manage-tickets'),
        },
        {
            key: 'checking-tickets',
            icon: <SettingOutlined />,
            label: 'Đối soát vé',
            onClick: () => navigate('/checking-tickets'),
        },
        {
            key: 'events',
            icon: <UnorderedListOutlined />,
            label: 'Danh sách sự kiện',
            onClick: () => navigate('/events'),
            disabled: true,
        },
        {
            key: 'manage-devices',
            icon: <SettingOutlined />,
            label: 'Quản lý thiết bị',
            onClick: () => navigate('/manage-devices'),
            disabled: true,
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
            onClick: () => navigate('/settings'),
        },
    ]

    const levelKeys = getLevelKeys(items as LevelKeysProps[])

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1)
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys.filter((key) => key !== currentOpenKey).findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            )
        } else {
            // close
            setStateOpenKeys(openKeys)
        }
    }

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type)
            }}
            className="bg-transparent px-4">
            <img src={insightLogo} alt="insight Logo" className="mt-10 my-20" />
            <Menu mode="inline" defaultSelectedKeys={defaultSelectKey} openKeys={stateOpenKeys} onOpenChange={onOpenChange} items={items} className="bg-transparent border-none" />
        </Sider>
    )
}

export default Sidebar
