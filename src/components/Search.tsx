import { SearchIcon } from '@/assets';

const Search = () => {
   return (
      <div className="w-[437px] h-[48px] border-none rounded-xl flex items-center gap-4 relative bg-[#ededed] shadow-sm">
         <input
            type="text"
            id="headerSearch"
            className="py-[10px] px-[16px] bg-transparent w-full h-full placeholder-placeholder font-normal outline-none text-base leading-[19.5px] italic"
            placeholder="Search"
         />

         <label htmlFor="headerSearch">
            <span className="w-7 h-7 absolute top-2/4 -translate-y-2/4 right-[16px] cursor-pointer">
               <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={SearchIcon}
                  alt="Search Icon"
               />
            </span>
         </label>
      </div>
   );
};

export default Search;
