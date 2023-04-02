
import Rodal from "rodal";

export default function TPCModal({ reqTPC, setReqTPC }) {


    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8," + 'symbol,priceChange,priceChangePercent,weightedAvgPrice,prevClosePrice,lastPrice,lastQty,bidPrice,bidQty,askPrice,askQty,openPrice,highPrice,lowPrice,volume,quoteVolume,openTime,closeTime,firstId,lastId,count\n'
        csvContent += [reqTPC].map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `TPC_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        setReqTPC({});
    }


    return (
        <Rodal visible={Object.keys(reqTPC).length > 0} onClose={() => { setReqTPC({}) }} width={800} height={600}>
            <div className="w3-margin">
                <div style={{ height: '500px', overflowY: 'scroll' }}>
                    <h3>24hr Ticker Price Change</h3>
                    <tbody className="w3-table" style={{paddingBottom:'5px'}}>
                        {
                            Object.entries(reqTPC).map(([key, value]) => (
                                <tr key={value} style={{border:'1px solid #f1f1f1'}}>
                                    <td><b>{key.toUpperCase()}</b></td>
                                    <td>{value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </div>
                <p>
                    <button className="w3-button w3-round-large w3-blue" onClick={downloadCSV}>Export as CSV</button>
                </p>
            </div>
        </Rodal>
    )
}