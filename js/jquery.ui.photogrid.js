(function($) {  
	$.widget("project.photogrid", {  

		options: {
	      rowHeight: 200
	   },

	   _create: function() {
		   // this.count = 0;
		   // this.currentRow = 0;
		   var self = this;
		   console.log("_create: " + self);
		   self.count = 0;
		   self.currentRowWidth = 0;
		   self.currentRow = 0;

		   self.screenWidth = self.element.innerWidth();
		   self._createRow();
		   // self.photos = self.element.find('img');


			//assign your api key equal to a variable
			var apiKey = '1bd23e0e03ad1d12c7441a0e507e7af7';
			
			
			//the initial json request to flickr
			//to get your latest public photos, use this request: http://api.flickr.com/services/rest/?&amp;method=flickr.people.getPublicPhotos&amp;api_key=' + apiKey + '&amp;user_id=29096781@N02&amp;per_page=15&amp;page=2&amp;format=json&amp;jsoncallback=?
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=7279aed288c2a426af1ec3ff28ebb4eb&photoset_id=72157628871855657&per_page=30&format=json&nojsoncallback=1&api_sig=e3611536b32200189f1c3a5d158554fe', function( data ) {

				var photoSet = [];
				$.each( data.photoset.photo, function( key, val ) {
				//	$('<img src="http://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '.jpg">').appendTo($('body'));
					var img = $('<img src="http://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '.jpg" height="' + self.options.rowHeight + '">');
					img.appendTo(self.element);	
				//	self._addToRow(img);
				});

				
			});

			$(window).on('resize', function() {

				var images = $('img', self.element).not('.spacer');
		      self.count = 0;
		      self.screenWidth = $('.photo-grid').innerWidth();
		      self.currentRow = 0;

		      $('.photo-grid-row').remove();

      		self._createRow();

				images.each(function(index, el) {
				//	console.log("width: " + $(el).width());
			   		console.log("o cia... " + $(el).width());
         this.currentRowWidth = this.currentRowWidth + $(el).width() + 8;
         $(el).appendTo(this.currentRow);
         $('<img src="img/spacer.png" class="spacer">').appendTo(this.currentRow);

         if (this.currentRowWidth > this.screenWidth) {

         	var ratio = this.currentRowWidth / this.screenWidth;
            var resizedRowHeight = (this.options.rowHeight / ratio);

            this.currentRow.width(this.screenWidth);
            this.currentRow.height(Math.ceil(resizedRowHeight) - 1);

            this.currentRowWidth = 0;
            this._createRow();
         }  
			   });
			});   
	   },

	   _setOption: function( key, value ) {
			this.options[ key ] = value;
		},
	 
	   _createRow: function() {
			$('<div class="photo-grid-row" id="photo-grid-row-' + this.count + '"></div>').appendTo(this.element);
			this.currentRow = $('#photo-grid-row-' + this.count);
			this.count++;


			// this.currentRow = $('#photo-grid-row-' + this.count);
		},

		_addToRow: function(index, el) {
			console.log("o cia... " + $(el).width());
         this.currentRowWidth = this.currentRowWidth + $(el).width() + 8;
         $(el).appendTo(this.currentRow);
         $('<img src="img/spacer.png" class="spacer">').appendTo(this.currentRow);

         if (this.currentRowWidth > this.screenWidth) {

         	var ratio = this.currentRowWidth / this.screenWidth;
            var resizedRowHeight = (this.options.rowHeight / ratio);

            this.currentRow.width(this.screenWidth);
            this.currentRow.height(Math.ceil(resizedRowHeight) - 1);

            this.currentRowWidth = 0;
            this._createRow();
         }   
      },
	});  
})(jQuery);  