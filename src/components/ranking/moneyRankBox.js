function MoneyRankTop3Box(props) {
  // 보여줄 순위를 커스텀하여 설정
  const customRanks = [2, 1, 3];

  // 데이터가 없을 경우 기본 placeholder 데이터 사용
  const defaultTopThree = [
    {
      profile: "/assets/images/profileDefault.png",
      name: "Unknown",
      amount: "0",
    },
    {
      profile: "/assets/images/profileDefault.png",
      name: "Unknown",
      amount: "0",
    },
    {
      profile: "/assets/images/profileDefault.png",
      name: "Unknown",
      amount: "0",
    },
  ];
  // topThree 배열이 3개 미만이면 나머지를 기본값으로 채워줌
  const topThree = [...(props.topThree || []), ...defaultTopThree].slice(0, 3);

  // 1위를 가운데로 배치하고 나머지를 좌우에 배치
  const reorderedTopThree = [topThree[1], topThree[0], topThree[2]];

  return (
    <>
      {/* Top 3 */}
      <div className="flex justify-center items-end mt-5 mb-3 gap-4">
        {reorderedTopThree?.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-center text-lg text-gray-800 font-bold">
              {customRanks[index]}
            </div>
            <div className="flex items-center">
              <div className="avatar">
                <div
                  className={`rounded-full bg-gray-200 ${
                    index === 1
                      ? "h-18 w-18"
                      : index === 0
                      ? "h-16 w-16"
                      : "h-14 w-14"
                  }`}
                >
                  <img src={item.profile || ""} alt="profile image" />
                </div>
              </div>
            </div>
            <div className="text-center font-bold text-gray-700 pt-2 w-24">
              {item.name}
            </div>
            <div className="text-center text-sm text-gray-700">
              {item.amount}원
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function MoneyRankBox(props) {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Top 3 외 */}
        <div className="w-[350px]">
          <table className="table">
            <tbody>
              {props.userRanking.slice(3).map((item, index) => (
                <tr key={index + 3} className="border-b-1 border-gray-300">
                  <td>
                    <div className="text-base text-bold text-gray-800">
                      {index + 4}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={""} alt="profile image" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600 font-bold">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right text-gray-600">{item.amount}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export { MoneyRankTop3Box, MoneyRankBox };
