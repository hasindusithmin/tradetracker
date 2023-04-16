import Rodal from "rodal";
import DataTable from 'react-data-table-component';


export default function RTLModal({ reqRTL, setReqRTL }) {

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            omit: true
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
        },
        {
            name: 'QuoteQty',
            selector: row => row.quoteQty,
        },
        {
            name: 'Time(UTC)',
            selector: row => new Date(row.time).toLocaleString(),
        },
        {
            name: 'isBuyerMaker',
            selector: row => row.isBuyerMaker.toString(),
        },
        {
            name: 'isBestMatch',
            selector: row => row.isBestMatch.toString(),
        }
    ];

    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,"+'Id,price,Qty,QuoteQty,Time(UTC),IsBuyerMaker,IsBestMatch\n'
        csvContent += reqRTL.map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `RTL_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        setReqRTL([]);
    }


    return (
        <Rodal visible={reqRTL.length > 0} onClose={() => { setReqRTL([]) }} width={1200} height={600}>
            <div className="w3-margin">
                <div style={{ height: '500px', overflow: 'scroll' }}>
                    <DataTable
                        title="Recent Trades List"
                        columns={columns}
                        data={reqRTL}
                        pagination
                    />
                </div>
                <p>
                    <button className="w3-button w3-round-large w3-blue" onClick={downloadCSV}>Export as CSV</button>
                </p>
            </div>
        </Rodal>
    )
}