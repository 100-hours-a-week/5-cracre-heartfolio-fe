import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtomNavigation() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-white shadow-lg">
      <div className="btm-nav flex justify-around h-[45px] items-center">
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/login")}>
          <a class="material-symbols-outlined">login</a>
        </button>
        
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/")}>
          <a class="material-symbols-rounded">home</a>
        </button>
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/mypage")}>
        <a class="material-symbols-outlined">person</a>
        </button>
      </div>
    </div>
  );
}

export default ButtomNavigation;
