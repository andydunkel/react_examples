import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function NetworkCheck(props) {
    const [zip, setZip] = useState("https://");
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState("");

    const updateList = async (zipCode) => {
        setZip(zipCode);

        const downloadUrl = "https://ekiwi-blog.de/tools/vodcheck/load.php?zip=" + zipCode;
        console.log(downloadUrl);
        const resp = await axios.get(downloadUrl).catch(error => {
            console.log(error);
        });

        if (resp !== undefined) {
            console.log(resp.data);

            if (resp.data.ttwos.returnMsg === "") {
                if (resp.data.ttwos !== undefined && resp.data.ttwos.tickets !== undefined) {
                    console.log("Tickets found");
                    setTickets(resp.data.ttwos.tickets);
                } else {
                    setMessage("Keine Einträge gefunden");
                    setTickets([]);
                }
            } else {
                console.log("No tickets");
                setMessage("Keine Einträge gefunden");
                setTickets([]);
            }
        }
    }

    return (
        <div>
            <ZipCode handleZipCode={updateList} />
            <StatusBar statusMessage={message} />
            <hr/>
            <OutputList tickets={tickets}/>
        </div>
    )
}

function ZipCode(props) {
    const [zip, setZip] = useState("73037")

    const handleSubmit = (evt) => {
        props.handleZipCode(zip);
        evt.preventDefault();
    };

    const handleChange = (evt) => {
        setZip( evt.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    PLZ eingeben: &nbsp;
                </label>
                <input type="text" value={zip} onChange={handleChange}></input>
                <input type="submit" value="Abfrage starten"></input>
            </form>
        </div>
    );
}

function StatusBar(props) {
    return (
        <div>
            <hr/>
            {props.statusMessage}
        </div>
    );
}

function OutputList(props)  {
    return (
        <div>
            {props.tickets.map(ticket => <Ticket {...ticket} key={ticket.ticketID} />)}
        </div>
    );
}

function Ticket(props) {
    return (
        <div>
            <h3>{props.type}</h3>
            <p><strong>Ticket-ID:</strong> {props.ticketID}</p>
            <strong>Kundentext:</strong>
            <pre>{props.customerText}</pre>
            <div><strong>Beginn: </strong> {props.begin}</div>
            <div><strong>Netz: </strong> {props.networks.toString()}</div>
            <div><strong>Services: </strong> {props.services.toString()}</div>
            <div><strong>Gebiete: </strong> {props.areas.toString()}</div>
            <hr/>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <NetworkCheck />
  </React.StrictMode>,
  document.getElementById('root')
);
