interface HeadingProps {
   title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
   return (
      <h2 className="leading-[54px] font-bold font-montserrat text-4xl text-secondary mb-8">
         {title}
      </h2>
   );
};

export default Heading;
