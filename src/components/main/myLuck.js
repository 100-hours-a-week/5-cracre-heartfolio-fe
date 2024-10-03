function MyLuck(props) {
  return (
    <div className={`flex items-center justify-center pt-[20px] h-20 p-6 mt-2 rounded-xl bg-gradient-to-r from-amber-200/50 to-pink-200/50 ${props.ok ? "font-RixXladywatermelonR" : "font-semibold text-gray-600"}`}>
      {props.data}
    </div>
  );
}

export default MyLuck;
