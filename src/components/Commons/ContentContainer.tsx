import { theme, Typography } from 'antd'
import { twMerge } from 'tailwind-merge'

interface Props {
    children: React.ReactNode
    title: string
    className?: string
}

const ContentContainer = ({ children, title, className }: Props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <div
            className={twMerge('w-full h-full', className)}
            style={{
                padding: 16,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}>
            <Typography.Title level={2} className="font-bold">
                {title}
            </Typography.Title>
            {children}
        </div>
    )
}

export default ContentContainer
