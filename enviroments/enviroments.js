export const environment = {
	production: false,
	auth0: {
		clientID: 'mcVwIhh03QjPT60sR4tL5lQ200b9OFcy',
		domain: 'accounts-promethius.firebaseapp.com',
		responseType: 'token id_token',
		audience: 'https://shusson.au.auth0.com/userinfo',
		redirectUri: 'https://whatif-finances.firebaseapp.com',
		scope: 'openid'
	},
	firebase: {
		apiKey: "AIzaSyBA0IDTuWKKnU-YwEyr_z4q9eGUN9xWHmM",
		authDomain: "accounts-promethius.firebaseapp.com",
		databaseURL: "https://accounts-promethius.firebaseio.com",
		projectId: "accounts-promethius",
		storageBucket: "accounts-promethius.appspot.com",
		messagingSenderId: "18117329748"
	}
};
