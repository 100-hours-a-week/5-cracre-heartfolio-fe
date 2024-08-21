function BuyModal(props) {
  return (
    <>
      <div id="my_modal_5" className="modal modal-bottom sm:modal-middle " open>
        <div className="modal-box text-center" style={{ width: "350px" }}>
          <h3 className="font-bold text-lg p-3">매수 거래 체결 완료!</h3>
          <p>수량 : {props.orderDetails.quantity}</p>
          <p>가격 : {props.orderDetails.price} KRW</p>
          <p>총액 : {props.orderDetails.total} KRW</p>
          <div className="modal-action">
            <button className="btn" onClick={props.onClick}>
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
        <div className="modal-box text-center" style={{ width: "350px" }}>
          <h3 className="font-bold text-lg p-3">매도 거래 체결 완료!</h3>
          <p>수량 : {props.sellDetails.quantity}</p>
          <p>가격 : {props.sellDetails.price} KRW</p>
          <p>총액 : {props.sellDetails.total} KRW</p>
          <div className="modal-action">
            <button className="btn" onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { BuyModal, SellModal };
