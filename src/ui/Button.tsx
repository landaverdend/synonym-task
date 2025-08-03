'use client';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};
export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={`border border-gray-300 rounded-md p-2 hover:cursor-pointer hover:bg-gray-500 ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}
