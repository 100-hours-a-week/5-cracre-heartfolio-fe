function Accumulation() {
  const data = [
    {
      profile: "/profile/photo1",
      name: "John Doe",
      percentage: "300%",
    },
    {
      profile: "/profile/photo2",
      name: "Jane Smith",
      percentage: "270%",
    },
    {
      profile: "/profile/photo3",
      name: "Alice Johnson",
      percentage: "240%",
    },
    {
      profile: "/profile/photo4",
      name: "Michael Brown",
      percentage: "210%",
    },
    {
      profile: "/profile/photo5",
      name: "Emily Davis",
      percentage: "180%",
    },
    {
      profile: "/profile/photo6",
      name: "David Wilson",
      percentage: "150%",
    },
    {
      profile: "/profile/photo7",
      name: "Sophia Martinez",
      percentage: "120%",
    },
    {
      profile: "/profile/photo8",
      name: "James Anderson",
      percentage: "90%",
    },
    {
      profile: "/profile/photo9",
      name: "Olivia Taylor",
      percentage: "60%",
    },
    {
      profile: "/profile/photo10",
      name: "Benjamin Moore",
      percentage: "30%",
    },
  ];

  return (
    <>
      <div>
        <div className="w-[350px]">
          <table className="table">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b-1 border-gray-300">
                  <td>
                    <div className="text-base">{index + 1}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={""} alt="profile image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Accumulation;
