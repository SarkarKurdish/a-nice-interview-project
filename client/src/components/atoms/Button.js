export default function Button({ children, leftIcon }) {
  return (
    <button className="flex items-center hover:opacity-75 justify-center">
      {leftIcon}
      {children}
    </button>
  );
}
