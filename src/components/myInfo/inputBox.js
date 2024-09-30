function InputBox(props) {
  return (
    <>
      <div className={`flex justify-between mb-2 ${props.width}`}>
        <div className="text-gray-600 text-lg">{props.text}</div>
        <div className="text-gray-500">{props.data}</div>
      </div>
    </>
  );
}

export default InputBox;
