import Spinner from '@/app/icons/Spinner';

const Button = ({
  title,
  disabled,
  btnClass,
  titleClass,
  handleClick,
  type = 'submit',
  isLoading = false,
}: any) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${btnClass} mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-2 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
    >
      <span
        className={`${titleClass} flex justify-center text-sm font-medium text-white`}
      >
        {isLoading ? (
          <Spinner width="25px" height="25px" className="spinner" />
        ) : (
          title
        )}
      </span>
    </button>
  );
};

export default Button;
