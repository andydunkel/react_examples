import * as React from 'react';

class Clock extends React.Component<any, any> {
    private timerId: any;

    constructor(props: any) {
        super(props);
        this.state = {  currentTime : "-" };
    }

    componentDidMount() {
        console.log("Starting timer 1");
        this.timerId = setInterval(this.updateStatus, 1000);
    }

    componentWillUnmount() {
        console.log("Stopping timer 2");
        clearInterval(this.timerId);
    }

    updateStatus = () => {
        console.log("Timer 1 fired");
        let currentdate = new Date();
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        this.setState({ currentTime: datetime});
    }

    render() {
        return <div>
            <p>{this.state.currentTime}</p>
        </div>
    };
}

export default Clock;