const Avatar = () => {
   return (
      <div className="w-12 h-12 relative rounded-full overflow-hidden shadow-md hover:cursor-pointer">
         <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://avatars.githubusercontent.com/u/94770601?v=4"
            alt="Avatar User"
         />
      </div>
   );
};

export default Avatar;
