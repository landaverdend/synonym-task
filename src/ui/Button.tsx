
'use client'

export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button className="border border-gray-300 rounded-md p-2 hover:cursor-pointer" onClick={onClick}>
      {children}
    </button>
  );
}