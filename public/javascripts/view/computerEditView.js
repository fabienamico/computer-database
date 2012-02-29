window.ComputerEditView = Backbone.View.extend({
		el : $('#app-container'),

		initialize : function() {
			this.template = _.template($('#computer-edit-template').html());

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
			
			this.computer.set({ name:$('#name').val() });
			

			this.$('input[type="text"]').val(''); //on vide le form
			
			if (this.computer.isNew()) {
				router.computersCollectionView.collection.create(this.computer)
			} else {
				this.computer.save();
			}

		},
        
		error : function(model, error) {
            console.log(model, error);
            return this;
        }

	});