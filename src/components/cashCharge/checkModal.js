import { useNavigate } from "react-router-dom";

function CheckModal(props) {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-box bg-white w-[400px] h-[250px] content-center relative">
        <div className="text-xl text-gray-600  text-center pb-5">
          {props.category} 영역에 {props.amount}원을 <br />
          기부하시겠습니까?
        </div>
        <div className="flex justify-center">
          <div className="flex justify-around w-80">
            <div className="modal-action">
              <button
                className="btn bg-btnClickColor text-gray-600 border-0 hover:bg-[#ff99a1] w-32"
                onClick={() => navigate("/cashcharge/complete")}
              >
                예
              </button>
            </div>
            <div className="modal-action">
              <button
                className="btn bg-btnClickColor text-gray-600 border-0 hover:bg-[#ff99a1] w-32"
                onClick={props.onClose}
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckModal;
