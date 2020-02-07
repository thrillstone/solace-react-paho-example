export default {
	userName: "solace-cloud-client",
	password: "<connection details password>",
	invocationContext: {
		host: "<WebSocket Secured MQTT Host>",
		port: 8443,
		clientId: ""
	},
	timeout: 3,
	keepAliveInterval: 60,
	cleanSession: true,
	useSSL: true,
	reconnect: true
};