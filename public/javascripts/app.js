(function($) {

	//********************************************************************
	//
	//		MODEL
	//
	//********************************************************************
	
	window.Computer = Backbone.Model.extend({

		defaults : {
			id : null,
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

			this.url = "/computers/" + this.id;

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

		initialize : function Doc() {
			console.log('Company Constructor');

			this.url = "/companies/" + this.id;

			this.bind("error", function(model, error) {
				console.log(error);
			});

		}

	});
	
	//********************************************************************
	//
	//		Collection
	//
	//********************************************************************
	
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
		//local: true, // always fetched and saved locally
		//remote: true, // never cached, dualStorage is bypassed entirely
		url : "/companies",

		initialize : function() {
			console.log('Company collection Constructor');
		}
	});
	
	
	//********************************************************************
	//
	//		View
	//
	//********************************************************************
	
	window.ComputersCollectionView = Backbone.View.extend({
        el : $('#app-container'),

        initialize : function() {
            this.template = _.template($('#computers-collection-template').html());

            /*--- binding ---*/
            _.bindAll(this, 'render');
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            /*---------------*/

        },

        render : function() {
            var renderedContent = this.template({ computers : this.collection.toJSON() });
            $(this.el).html(renderedContent);
            return this;
        }

    });
	
	window.ComputerEditView = Backbone.View.extend({
        el : $('#app-container'),

        initialize : function() {
            this.template = _.template($('#computer-edit-template').html());
           

        },
      
        events: {
            'submit form': 'save'
        },
         
        render : function(computer) {
        	this.computer = computer;
            var renderedContent = this.template({ computer : computer.toJSON() });
            $(this.el).html(renderedContent);
            return this;
        },
        
        save: function(e){
        	console.log("Save computer ...")
        	
        	newComputer = new Computer({
        	
        		id : this.$('.id').val(),
                name : this.$('.name').val()
        		
        	})
        	
        	console.log("Save id : ", newComputer.id, newComputer.name)
        	
        	if (newComputer.id){
        		this.computers.get(newComputer.id).set({name : newComputer.name});
        	}else {

        		this.computers.add(newComputer);
        	}
        	
        	this.computer.save();
        	router.navigate('/index.html', true)
        	router.computersCollectionView.render();
        }


    });
	
	//********************************************************************
	//
	//		Router
	//
	//********************************************************************
	window.ComputerRouter = Backbone.Router.extend({

        initialize : function() {
            /* 1- Création d'une collection */
            this.computers = new Computers();
            /* 2- Chargement de la collection */
            this.computers.fetch();

            /* 3- Création des vues + affichage */
            this.computerEditView = new ComputerEditView();
            this.computersCollectionView = new ComputersCollectionView({ collection : this.computers });
            this.computersCollectionView.render();
            

        },
	
		routes : {
			"" : "root",
			"computer/:id" : "computer"
		},
        
		root : function() { this.computersCollectionView.render();},
		
        computer : function(id){
        	computer =  this.computers.get(id);
            this.computerEditView.render(computer);
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
