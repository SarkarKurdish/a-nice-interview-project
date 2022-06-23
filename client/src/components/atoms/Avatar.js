export default function Avatar({ src }) {
  return (
    <div className="w-11 h-11 rounded-full bg-gray-100 shrink-0 overflow-hidden">
      <img src={src} className="w-full h-100 object-cover" alt="" />
    </div>
  );
}
