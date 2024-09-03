import { memo } from 'react'
import HappenedError from '@/assets/images/happened-error.png'
import { Button, Typography } from 'antd'

interface Props {
    description: string
    imageNotFound?: string
    hasAction?: boolean
    onActionClick?: () => void
    actionTitle?: string
    buttonIcon?: React.ReactNode
}

const EmptyError = ({ description, buttonIcon, hasAction, imageNotFound, actionTitle, onActionClick }: Props) => {
    return (
        <div className="flex my-5 flex-col gap-2 w-full h-full items-center justify-center">
            <img className="aspect-square w-60" src={imageNotFound || HappenedError} alt="Không tồn tại kết quả" />
            <Typography.Text>{description}</Typography.Text>
            {hasAction && (
                <Button icon={buttonIcon} onClick={onActionClick} htmlType="button" type="primary" className="bg-primary">
                    {actionTitle}
                </Button>
            )}
        </div>
    )
}

export default memo(EmptyError)
