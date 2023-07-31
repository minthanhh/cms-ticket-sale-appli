interface HeadingModalProps {
   title: string;
}

const HeadingModal: React.FC<HeadingModalProps> = ({ title }) => {
   return (
      <h3 className="text-center mb-[27px] text-2xl leading-[30px] font-bold font-montserrat">
         {title}
      </h3>
   );
};

export default HeadingModal;
