window.ComputersCollectionView = Backbone.View.extend({
		el : $('#app-container'),

		initialize : function() {
			this.template = _.template(tpl.get('computer-list'));

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