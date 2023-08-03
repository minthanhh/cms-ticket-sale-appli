import { SearchIcon } from '@/assets';

interface TableSearchProps {
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   value?: string;
}

const TableSearch: React.FC<TableSearchProps> = ({ onChange, value }) => {
   return (
      <div className="w-[446px] h-[48px] bg-input border-none rounded-xl flex items-center gap-4 relative">
         <input
            type="text"
            id="headerSearch"
            className="py-[10px] px-[16px] bg-transparent w-full h-full placeholder-placeholder font-normal outline-none text-base leading-[19.5px] italic"
            placeholder="Tìm bằng số vé"
            onChange={onChange}
            value={value}
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

export default TableSearch;
