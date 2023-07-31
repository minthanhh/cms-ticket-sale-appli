import { IconType } from 'react-icons/lib';

interface ActionProps {
   icon: IconType;
   className?: string;
}

const Action: React.FC<ActionProps> = ({ icon: Icon, className }) => {
   return <Icon className={className} />;
};

export default Action;
