import React from "react";
import ReactDOM from 'react-dom';
import axios from "axios";

const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card {...profile} key={profile.id} />)}
    </div>
);

class Card extends React.Component {
    render () {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    };
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const url = "https://api.github.com/users/" + this.state.userName;
        const resp = await axios.get(url).catch(error => {
            console.log(error);
        });

        if (resp != undefined) {
            console.log(resp.status);
            this.props.onSubmit(resp.data);
            this.setState({userName: ""});
        }
    };

    handleClear = () => {
        this.props.onClear();
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                  <input type="text"
                         placeholder="GitHub username"
                         value={this.state.userName}
                         onChange={event => this.setState( {userName: event.target.value })}
                         required />
                    <button>Add card</button>
                    <button type="button" onClick={this.handleClear}>Clear</button>
                </form>

            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
        };
    }

    addNewProfile = (profileData) => {
        //console.log(profileData);
        this.setState(prevState => ({
          profiles: [...prevState.profiles, profileData],
        }));
    };

    clearProfiles = () => {
      this.setState({profiles: []});
    };

    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} onClear={this.clearProfiles}/>
                <CardList profiles={this.state.profiles} />
            </div>
        );
    };
}

ReactDOM.render(
    <App title="The GitHub Cards App"/>,
    document.getElementById('root')
);