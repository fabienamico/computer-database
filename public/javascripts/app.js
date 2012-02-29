(function($) {

	// ********************************************************************
	//
	// MODEL
	//
	// ********************************************************************

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

			this.url = "/computers";

			this.bind("error", function(model, error) {
				console.log(error);
			});

		}

	});

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

		initialize : function Company() {
			console.log('Company Constructor');

			this.url = "/companies/" + this.id;

			this.bind("error", function(model, error) {
				console.log(error);
			});

		}

	});

	// ********************************************************************
	//
	// Collection
	//
	// ********************************************************************

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

	window.Companies = Backbone.Collection.extend({
		model : Company,

		// localStorage : new Store("docs"),
		// local: true, // always fetched and saved locally
		// remote: true, // never cached, dualStorage is bypassed entirely
		url : "/companies",

		initialize : function() {
			console.log('Company collection Constructor');
		}
	});

	// ********************************************************************
	//
	// View
	//
	// ********************************************************************

	window.ComputersCollectionView = Backbone.View.extend({
		el : $('#app-container'),

		initialize : function() {
			this.template = _.template($('#computers-collection-template')
					.html());

			/*--- binding ---*/	
			this.collection.bind('change', this.render, this);
			this.collection.bind('add', this.render, this);
			/*---------------*/

		},

		render : function() {
			var renderedContent = this.template({
				computers : this.collection.toJSON()
			});
			$(this.el).html(renderedContent);
			return this;
		}

	});

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
