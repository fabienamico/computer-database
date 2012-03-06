(function($) {


	// ********************************************************************
	//
	// Router
	//
	// ********************************************************************
	window.ComputerRouter = Backbone.Router.extend({

		initialize : function() {
			/* 1- Création d'une collection */
			this.computers = new Computers();

			/* 3- Création des vues + affichage */
			this.computerEditView = new ComputerEditView();
			this.computersCollectionView = new ComputersCollectionView({
				collection : this.computers
			});
			
			/* 2- Chargement de la collection */
			that = this;
			this.computers.fetch({
				success : function() {
					that.computersCollectionView.render();
				}
			});

		},

		routes : {
			"" : "root",
			"computer/:id" : "updateComputer",
			"computer" : "createComputer",
			"delete-computer/:id" : "deleteComputer"
		},

		root : function() {
			this.computersCollectionView.render();
		},

		updateComputer : function(id) {
			computer = this.computers.get(id);
			this.computerEditView.render(computer);
		},

		createComputer : function() {
			this.computerEditView.render(new Computer());
		},
		
		deleteComputer : function(id) {
			that = this;
			this.computersCollectionView.collection.get(id).destroy({
				success: function() {
					that.computersCollectionView.render();
			}});
		}

	});

	
	
	tpl.loadTemplates(['computer-edit', 'computer-list'],
		    function () {
				router = new ComputerRouter();
		        Backbone.history.start();
		    });
	

})(jQuery);
