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
			"computer" : "createComputer"
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
		}

	});

	$(function() {
		/*--- initialisation du router ---*/
		router = new ComputerRouter();

		/*---
		    activation du monitoring des "hashchange events"
		    et dispatch des routes
		---*/
		Backbone.history.start();
	});

})(jQuery);
