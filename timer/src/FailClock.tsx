import React, {useState} from 'react';

function FailClock() {
    const [currentTime, setCurrentTime] = useState("-");

    const updateStatus = () => {
        console.log("Timer 2 fired");
        let currentdate = new Date();
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

       setCurrentTime(datetime);
    }

    console.log("Starting timer 2");
    window.setInterval(updateStatus, 1000);

    return (
        <div>
            <p>{currentTime}</p>
        </div>
    );
}

export default FailClock;