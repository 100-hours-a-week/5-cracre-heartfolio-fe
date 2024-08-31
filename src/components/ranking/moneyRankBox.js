function MoneyRankBox() {
  const data = [
    {
      profile: "/profile/photo1",
      name: "Alice Kim",
      amount: 4900,
    },
    {
      profile: "/profile/photo2",
      name: "Bob Lee",
      amount: 4500,
    },
    {
      profile: "/profile/photo3",
      name: "Charlie Park",
      amount: 4000,
    },
    {
      profile: "/profile/photo4",
      name: "Diana Choi",
      amount: 3800,
    },
    {
      profile: "/profile/photo5",
      name: "Edward Jung",
      amount: 3700,
    },
    {
      profile: "/profile/photo6",
      name: "Fiona Yoon",
      amount: 3400,
    },
    {
      profile: "/profile/photo7",
      name: "George Han",
      amount: 3000,
    },
    {
      profile: "/profile/photo8",
      name: "Helen Lim",
      amount: 2800,
    },
    {
      profile: "/profile/photo9",
      name: "Ian Kim",
      amount: 2600,
    },
    {
      profile: "/profile/photo10",
      name: "Jessica Lee",
      amount: 2000,
    },
  ];

  const topThree = [data[1], data[0], data[2]];

  // 보여줄 순위를 커스텀하여 설정
  const customRanks = [2, 1, 3];

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Top 3 */}
        <div className="flex justify-center items-end mt-5 mb-3 gap-4">
          {topThree.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-center text-lg text-gray-800 font-bold">
                {customRanks[index]}
              </div>
              <div className="flex items-center">
                <div className="avatar">
                  <div
                    className={`rounded-full bg-gray-200 ${
                      index === 1 ? "h-18 w-18" :(index === 0 ? "h-16 w-16" : "h-14 w-14")
                    }`}
                  >
                    <img src={""} alt="profile image" />
                  </div>
                </div>
              </div>
              <div className="text-center font-bold text-gray-700 pt-2 w-24">{item.name}</div>
              <div className="text-center text-sm text-gray-700">
                {item.amount}원
              </div>
            </div>
          ))}
        </div>
        {/* Top 3 외 */}
        <div className="w-[350px]">
          <table className="table">
            <tbody>
              {data.slice(3).map((item, index) => (
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
                  <td className="text-right text-gray-600">
                    {item.amount}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MoneyRankBox;
