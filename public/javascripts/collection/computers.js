window.Computers = Backbone.Collection.extend({
		model : Computer,

		// localStorage : new Store("docs"),
		// local: false, // always fetched and saved locally
		// remote: true, // never cached, dualStorage is bypassed entirely
		url : "/computers",

		initialize : function() {
			console.log('Computer collection Constructor');

		}
	});