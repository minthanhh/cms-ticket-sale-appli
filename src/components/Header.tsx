import Search from './Search';
import UserHeader from './UserHeader/UserHeader';

const Header = () => {
   return (
      <div className="mt-[17px] my-5 w-full flex items-center justify-between">
         <Search />
         <UserHeader />
      </div>
   );
};

export default Header;
