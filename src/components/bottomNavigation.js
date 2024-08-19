import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

function ButtomNavigation() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-white shadow-lg">
      <div className="btm-nav flex justify-around h-[45px] items-center">
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/login")}>
          <LoginIcon className="text-black" style={{ fontSize: '24px' }} />
        </button>
        
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/")}>
          <HomeIcon className="text-black" style={{ fontSize: '24px' }} />
        </button>
        
        <button className="bg-btnNoClickColor p-0" onClick={() => navigate("/mypage")}>
          <PersonIcon className="text-black" style={{ fontSize: '24px' }} />
        </button>
      </div>
    </div>
  );
}

export default ButtomNavigation;
