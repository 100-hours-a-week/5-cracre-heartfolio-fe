export function GetHoldings(){
    return useFetch("http://localhost:8080/api/portfolio/totalStocks");
}