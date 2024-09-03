function InputBox(props) {
  return (
    <>
      <div className="flex justify-between w-[320px] mb-2">
        <div className="text-gray-600 text-lg">{props.text}</div>
        <div className="text-gray-500">{props.data}</div>
      </div>
    </>
  );
}

export default InputBox;
