const Button = ({ title, btnClass, titleClass, handleClick }: any) => {
  return (
    <button
      onClick={handleClick}
      className={`${btnClass} rounded-xl w-full h-12 bg-meta-blue-2 hover:bg-hiring-btn-gradient border border-meta-light-blue-2 mb-8 transition duration-300 ease-in-out will-change`}
    >
      <span
        className={`${titleClass} flex justify-center font-medium text-sm text-white`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
