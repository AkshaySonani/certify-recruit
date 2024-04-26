const Button = ({ title, btnClass, titleClass, handleClick }: any) => {
  return (
    <button
      onClick={handleClick}
      className={`${btnClass} mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-2 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
    >
      <span
        className={`${titleClass} flex justify-center text-sm font-medium text-white`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
