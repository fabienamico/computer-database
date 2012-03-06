window.Computer = Backbone.Model.extend({

		defaults : {
			id : null,
			name : "",
			introduced : null,
			discontinued : null,
			company : "Computer company"
		},

		validate : function(attributes) {
			if (attributes.name == '') {
				return "Computer name can't be empty !!!";
			} else if (attributes.company == '') {
				return "Computer company can't be empty !!!";
			}
		},

		initialize : function Computer() {

			this.urlRoot = "/computers";

			this.bind("error", function(model, error) {
				console.log(error);
			});
			
		}

	});