function UserRankingBox(props) {
  return (
    <>
      <div>
        <div className="w-[350px]">
          <table className="table">
            <tbody>
              {props.data?.map((item, index) => (
                <tr key={index} className="border-b-1 border-gray-300">
                  <td>
                    <div className="text-base text-bold text-gray-800">
                      {index + 1}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.profile} alt="profile image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-600">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${
                      parseFloat(item.percentage) > 0
                        ? "text-redColor"
                        : parseFloat(item.percentage) < 0
                        ? "text-blueColor"
                        : "text-gray-600"
                    } text-right`}
                  >
                    {item.percentage}%
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

export default UserRankingBox;
