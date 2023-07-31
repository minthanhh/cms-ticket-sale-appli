import { LogoInSight } from '@/assets';
import { Link } from 'react-router-dom';

const Logo = () => {
   return (
      <Link to={'/'} className="relative mr-auto mb-[59px]">
         <img className="w-[133px]" src={LogoInSight} alt="" />
      </Link>
   );
};

export default Logo;
