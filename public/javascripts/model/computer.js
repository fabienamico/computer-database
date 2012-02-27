window.Computer = Backbone.Model.extend({

		defaults : {
			id : "???",
			name : "Computer name",
			introduced : "Introduced date",
			discontinued : "Discontinued date",
			company : "Computer company"
		},

		validate : function(attributes) {
			if (attributes.name == '') {
				return "Computer name can't be empty !!!";
			} 
			else if (attributes.company == '') {
				return "Computer company can't be empty !!!";
			}
		},

		initialize : function Doc() {
			console.log('Computer Constructor');

			this.url = "/computers/" + this.getId();

			this.bind("error", function(model, error) {
				console.log(error);
			});

		}

	});