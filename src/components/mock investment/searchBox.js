function SearchBox(props) {
  return (
    <div className="w-[350px] flex flex-col items-center">
      <div
        className="flex flex-col h-15 text-left cursor-pointer w-[250px]"
        onClick={props.onClick}
      >
        <p className="text-gray-600">{props.korName}</p>
        <p className="text-gray-600">({props.engName})</p>
      </div>
      <div className="w-[390px] border-t border-gray-300 mt-2"></div>
    </div>
  );
}

export default SearchBox;
