import { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
   title: string;
   onClick?: () => void;
   icon?: IconType;
   disabled?: boolean;
   outline?: boolean;
   className?: string;
   type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({
   onClick,
   title,
   icon: Icon,
   outline,
   disabled,
   className,
   type,
}) => {
   return (
      <button
         onClick={onClick}
         className={twMerge(
            'border h-12 flex items-center gap-[10px] px-4 py-[11px] rounded-lg text-center justify-center',
            outline
               ? 'text-borderButton bg-white border-borderButton'
               : 'border-none bg-borderButton text-white',
            className
         )}
         disabled={disabled}
         type={type}
      >
         {disabled ? (
            <span className="loading loading-spinner loading-sm"></span>
         ) : (
            <>
               {Icon && <Icon size={24} />}
               <span className="leading-6 font-bold text-lg font-montserrat">
                  {title}
               </span>
            </>
         )}
      </button>
   );
};

export default Button;
