const data = [
    "오늘은 창의적인 아이디어가 떠오르는 날입니다.",
    "자신감을 가지고 도전하는 것이 성공의 열쇠입니다.",
    "가까운 사람과의 소통을 통해 행복을 느낄 수 있는 날입니다.",
    "경제적인 소비를 하여 재정 건강을 유지하세요.",
    "사랑하는 사람과의 관계가 더욱 깊어지는 날입니다.",
    "건강을 위해 물을 많이 마시고 규칙적인 운동을 하세요.",
    "주변 사람들과 협력하여 큰 성과를 이루게 됩니다.",
    "신중한 판단이 요구되는 중요한 결정을 앞두고 있습니다.",
    "오늘은 예상치 못한 좋은 소식이 있을 것입니다."
]

const randomValue = data[Math.floor(Math.random() * data.length)];

function MyLuck(props) {
    return (
      <div 
        className="flex justify-center pt-[20px] h-20 p-6 mt-2 rounded-xl bg-gradient-to-r from-amber-200/50 to-pink-200/50"
      >
        {randomValue}
      </div>
    );
  }
  
  export default MyLuck;