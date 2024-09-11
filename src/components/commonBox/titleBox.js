function TitleBox(props) {
  return (
    <div className="flex justify-between pt-[20px]">
      <p className="text-lg ml-[10px] text-gray-600 font-bold font-TmoneyRoundWindExtraBold">
        {props.title}
      </p>
      {props.seeMore !== "none" ? (
        <div
          className="text-sm py-1 float-right mr-[5px] pt-[10px] text-gray-600 cursor-pointer"
          onClick={props.onClick}
        >
          더보기
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TitleBox;
