import { twMerge } from 'tailwind-merge';

const Status: React.FC = (value) => {
   return (
      <div
         className={twMerge(
            'py-2 px-3 rounded-[4px] w-max border flex items-center gap-2 text-xs leading-[14.63px] font-medium font-montserrat select-none mx-auto',
            value === 'expired' || value === 'turnOff'
               ? 'border-expired bg-bgExpired text-expired'
               : value === 'notUsedYet' || value === 'apply'
               ? 'border-notUsedYet bg-bgNotUsedYet text-notUsedYet'
               : value === 'used'
               ? 'border-used bg-bgUsed text-used'
               : ''
         )}
      >
         {value === 'expired' || value === 'turnOff' ? (
            <>
               <span className="block w-2 h-2 rounded-full bg-expired"></span>
               {value === 'turnOff' ? 'Tắt' : 'Hết hạn'}
            </>
         ) : value === 'notUsedYet' || value === 'apply' ? (
            <>
               <span className="block w-2 h-2 rounded-full bg-notUsedYet"></span>
               {value === 'apply' ? 'Đang áp dụng' : 'Chưa sử dụng'}
            </>
         ) : value === 'used' ? (
            <>
               <span className="block w-2 h-2 rounded-full bg-used"></span>
               Đã sử dụng
            </>
         ) : null}
      </div>
   );
};

export default Status;
