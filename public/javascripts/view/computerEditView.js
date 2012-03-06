window.ComputerEditView = Backbone.View.extend({
		el : $('#app-container'),

		initialize : function() {
			this.template = _.template(tpl.get('computer-edit'));

		},

		events : {
			'submit form' : 'save'
		},

		render : function(computer) {
			this.computer = computer;
			var renderedContent = this.template({
				computer : computer.toJSON()
			});
			$(this.el).html(renderedContent);
			return this;
		},

		save : function(e) {
			
			e.preventDefault();
			
			this.computer.set({ name:$('#name').val(), introduced:$('#introduced').val(), discontinued:$('#discontinued').val(), company:$('#company').val()  });
			

			this.$('input[type="text"]').val(''); //on vide le form
			
			if (this.computer.isNew()) {
				var self = this;
				console.log('Create .. ');
				this.computer = router.computersCollectionView.collection.create(this.computer);
				console.log("Computer id : ", this.computer.id)
			} else {
				this.computer.save();
			}
			
			router.navigate("/", {replace: true});

		},
        
		error : function(model, error) {
            console.log(model, error);
            return this;
        }

	});