
import Rodal from "rodal";

export default function SOBModal({ reqSOB, setReqSOB }) {


    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8," + 'symbol,bidPrice,bidQty,askPrice,askQty\n'
        csvContent += [reqSOB].map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `SOB_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        setReqSOB({});
    }


    return (
        <Rodal visible={Object.keys(reqSOB).length > 0} onClose={() => { setReqSOB({}) }} width={800} height={600}>
            <div className="w3-margin">
                <div style={{ height: '500px', overflowY: 'scroll' }}>
                    <h3>Symbol Order Book</h3>
                    <tbody className="w3-table" style={{paddingBottom:'5px'}}>
                        {
                            Object.entries(reqSOB).map(([key, value]) => (
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