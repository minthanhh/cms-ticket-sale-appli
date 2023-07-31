import { HiOutlineMail } from 'react-icons/hi';
import { FiBell } from 'react-icons/fi';
import Action from './Action';
import Avatar from './Avatar';

const UserHeader = () => {
   return (
      <div className="flex items-center gap-6">
         <Action icon={HiOutlineMail} className="h-6 w-6 text-secondary" />
         <Action icon={FiBell} className="h-6 w-6 text-secondary" />
         <Avatar />
      </div>
   );
};

export default UserHeader;
