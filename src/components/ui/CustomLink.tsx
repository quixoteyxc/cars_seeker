import clsx from 'clsx';
import Link from 'next/link';

interface LinkProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  href: string;
}

const CustomLink: React.FC<LinkProps> = ({
  children,
  className,
  href,
  isDisabled,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        'px-5 pb-1 rounded flex justify-center items-center bg-blue-700 text-white text-base-medium cursor-pointer',
        { 'bg-gray-500 opacity-70 cursor-not-allowed': isDisabled },
        className
      )}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
