import React from 'react';
import './App.css';
import messaging from "./Messaging";
import Paho from "paho-mqtt";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			connected: false,
			messages: []
		};
		messaging.register(this.handleMessage.bind(this));
	}

	render() {
		const connected = this.state.connected;
		const sendButton = connected ? <button onClick={() => this.handleSendClick()}>Send</button> : <button disabled>Send</button>;
		return (
			<div className="App">
				<div class="buttons">
					<button onClick={() => this.handleConnectClick()}>{connected ? 'Disconnect' : 'Connect'}</button>
					{sendButton}
				</div>
				<ol>
					{this.state.messages.map((message, index) => {
						return <li key={index}>{message}</li>
					})}
				</ol>
			</div>
		  );
	}

	handleMessage(message) {
		this.setState(state => {
			const messages = state.messages.concat(message.payloadString);
			return {
				messages,
				connected: state.connected,
			};
		  });
	}

	handleSendClick() {
		let message = new Paho.Message(JSON.stringify({text: "Hello"}));
		message.destinationName = "exampletopic";
		messaging.send(message);
	}

	handleConnectClick() {
		if (this.state.connected) {
			messaging.disconnect();
			this.setState({
				connected: false,
				messages: this.state.messages
			});
		} else {
			messaging.connectWithPromise().then(response => {
				console.log("Succesfully connected to Solace Cloud.", response);
				messaging.subscribe("exampletopic");
				this.setState({
					connected: true,
					messages: this.state.messages
				});
			}).catch(error => {
				console.log("Unable to establish connection with Solace Cloud, see above logs for more details.", error);
			});
		}
	}

}



export default App;
