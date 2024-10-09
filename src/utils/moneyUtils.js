export function moneyChange(money) {
  if (money === undefined || money === null) return "0";
  if (money >= 1000000000000) {
    let trillion = Math.floor(money / 1_0000_0000_0000);
    let billion = Math.floor((money % 1_0000_0000_0000) / 1_0000_0000);
    let million = Math.floor((money % 1_0000_0000) / 10000);
    return `${trillion}조 ${billion}억 ${million}만`;
  } else if (money >= 100000000) {
    let billion = Math.floor(money / 1_0000_0000);
    let million = Math.floor((money % 1_0000_0000) / 10000);
    return `${billion}억 ${million}만`;
  } else {
    return money.toLocaleString();
  }
}