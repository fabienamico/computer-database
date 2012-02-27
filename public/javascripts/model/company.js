window.Company = Backbone.Model.extend({

		defaults : {
			id : "???",
			name : "Company name"
			
		},

		validate : function(attributes) {
			if (attributes.name == '') {
				return "Company name can't be empty !!!";
			} 
		},

		initialize : function Doc() {
			console.log('Company Constructor');

			this.url = "/companies/" + this.getId();

			this.bind("error", function(model, error) {
				console.log(error);
			});

		}

	});