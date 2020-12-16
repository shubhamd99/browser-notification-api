import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';
export default class App extends Component {

	constructor(props) {
		super(props)
		this.notifyMe = this.notifyMe.bind(this);
		this._askPermission = this._askPermission.bind(this);
	}
	
	componentDidMount() {
		this._askPermission();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
          </p>
					<span
						className="App-link"
						onClick={this.notifyMe}
					>
						Notify Me
          </span>
				</header>
			</div>
		)
	}

	async notifyMe(e) {
		// Let's check if the browser supports notifications
		if (!("Notification" in window) || !window.Notification) {
			alert("This browser does not support desktop notification");
			return;
		}

		if (window.Notification.permission === PERMISSION_GRANTED) {
			console.log("Already Granted");
			this.showNotification();
			// notification.onshow = e => {
			// 	console.log("OnShow", e);
				
			// };
			// notification.onclick = e => { console.log("onClick", e); };
		} else if (window.Notification.permission === PERMISSION_DENIED) {
			console.log("Requesting Permisson");
			this._askPermission();
		}
	}

	async _askPermission() { 
		if (this.checkNotificationPromise()) {
			window.Notification.requestPermission()
			.then((permission) => {
				console.log("Permission Granted..", permission);
			})
		} else {
			// For Safari
			window.Notification.requestPermission((permission) => {
				console.log("Permission Granted..", permission);
			});
		}
	}

	checkNotificationPromise() {
		try {
		  window.Notification.requestPermission().then();
		} catch(e) {
			// Safari dont return promise
		  return false;
		}
		return true;
	}

	showNotification() {
		const notification = new window.Notification("New Message", {
			body: "Hey Shubham"
		});
	}
}
