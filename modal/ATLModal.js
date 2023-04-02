import Rodal from "rodal";
import DataTable from 'react-data-table-component';


export default function ATLModal({ reqATL, setReqATL }) {

    const columns = [
        {
            name: 'tradeId',
            selector: row => row.a,
        },
        {
            name: 'Price',
            selector: row => row.p,
        },
        {
            name: 'Quantity',
            selector: row => row.q,
        },
        {
            name: 'First tradeId',
            selector: row => row.f,
        },
        {
            name: 'Last tradeId',
            selector: row => row.l,
        },
        {
            name: 'Time(UTC)',
            selector: row => new Date(row.T).toLocaleString(),
        },
        {
            name: 'Was the buyer the maker',
            selector: row => row.m.toString(),
        },
        {
            name: 'Was the trade the best price match',
            selector: row => row.M.toString(),
        }
    ];

    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,"+'tradeId,Price,Quantity,First tradeId,Last tradeId,Time(UTC),Was the buyer the maker,Was the trade the best price match\n'
        csvContent += reqATL.map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ATL_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        setReqATL([]);
    }


    return (
        <Rodal visible={reqATL.length > 0} onClose={() => { setReqATL([]) }} width={800} height={600}>
            <div className="w3-margin">
                <div style={{ height: '500px', overflow: 'scroll' }}>
                    <DataTable
                        title="Aggregate Trades List"
                        columns={columns}
                        data={reqATL}
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