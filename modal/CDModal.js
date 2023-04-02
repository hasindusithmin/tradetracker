import Rodal from "rodal";
import DataTable from 'react-data-table-component';


export default function CDModal({ reqCD, setReqCD }) {

    const columns = [
        {
            name: 'openTime',
            selector: row => new Date(row.openTime).toLocaleString(),
        },
        {
            name: 'open',
            selector: row => row.open,
        },
        {
            name: 'high',
            selector: row => row.high,
        },
        {
            name: 'low',
            selector: row => row.low,
        },
        {
            name: 'close',
            selector: row => row.close,
        },
        {
            name: 'volume',
            selector: row => row.volume,
        },
        {
            name: 'closeTime',
            selector: row => new Date(row.closeTime).toLocaleString(),
        },
        {
            name: 'Quote asset volume',
            selector: row => row['Quote asset volume'],
        },
        {
            name: 'Number of trades',
            selector: row => row['Number of trades'],
        },
        {
            name: 'Taker buy base asset volume',
            selector: row => row['Taker buy base asset volume'],
        },
        {
            name: 'Taker buy quote asset volume',
            selector: row => row['Taker buy quote asset volume'],
        },

    ];

    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,"+'openTime,open,high,low,close,volume,closeTime,Quote asset volume,Number of trades,Taker buy base asset volume\n'
        csvContent += reqCD.map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `CD_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        setReqCD([]);
    }


    return (
        <Rodal visible={reqCD.length > 0} onClose={() => { setReqCD([]) }} width={800} height={600}>
            <div className="w3-margin">
                <div style={{ height: '500px', overflow: 'scroll' }}>
                    <DataTable
                        title="Candlestick Data"
                        columns={columns}
                        data={reqCD}
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