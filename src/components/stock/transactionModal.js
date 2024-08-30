function BuyModal(props) {
  return (
    <>
      <div id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
        <div className="modal-box text-center bg-white" style={{ width: "350px" }}>
          <h3 className="font-bold text-lg p-3  text-gray-600">매수 거래 체결 완료!</h3>
          <p className=" text-gray-600">수량 : {props.orderDetails.quantity}</p>
          <p className=" text-gray-600">가격 : {props.orderDetails.price.toLocaleString()} KRW</p>
          <p className=" text-gray-600">총액 : {props.orderDetails.total.toLocaleString()} KRW</p>
          <div className="modal-action">
            <button className="btn text-gray-600 bg-white shadow-custom" onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SellModal(props) {
  return (
    <>
      <div id="my_modal_5" className="modal modal-bottom sm:modal-middle " open>
        <div className="modal-box text-center bg-white" style={{ width: "350px" }}>
          <h3 className="font-bold text-lg p-3 text-gray-600">매도 거래 체결 완료!</h3>
          <p className=" text-gray-600">수량 : {props.sellDetails.quantity}</p>
          <p className=" text-gray-600">가격 : {props.sellDetails.price.toLocaleString()} KRW</p>
          <p className=" text-gray-600">총액 : {props.sellDetails.total.toLocaleString()} KRW</p>
          <div className="modal-action">
            <button className="btn text-gray-600 bg-white shadow-custom" onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { BuyModal, SellModal };
