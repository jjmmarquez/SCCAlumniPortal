var profiles = (function() {

	var header = $('#header');
	var profiles = $('#profiles');
	var fab_search = $('#fab_search');

	var id = profiles.find('#profile_id');

	//var btn_edit = profiles.find('#btn_edit');
	var dashboard = profiles.find('#dashboard');
	var btn_about = profiles.find('#btn_about');
	var btn_threads = profiles.find('#btn_threads');
	var btn_work = profiles.find('#btn_work');

	var sidebar = profiles.find('#sidebar');
	var form_emailAFriend = sidebar.find('#form_emailAFriend');
	var friend_email = sidebar.find('#friend_email');
	var sidebar_progressBar = sidebar.find('#progress_bar');

	var mainContainer = header.find('#main_container');
	var searchContainer = header.find('#search_container');
	var input_search = header.find('#input_search');

	var progressBar = profiles.find('#progress_bar');
	var search_results = profiles.find('#search_results');
	var search_resultsHeader = profiles.find('#search_results_header');
	var search_resultsList = profiles.find('#search_results_list');

	var content = profiles.find('#content');

	var timer;






	btn_about.on('click',function(){

		var getView = $.get('/get/view/profile/'+ id.val() +'/profiles.includes.info');

		getView.done(function(view){

			content.hide().html(view).fadeIn();

		});
	});





	btn_threads.on('click',function(){

		var getView = $.get('/get/view/threads/'+ id.val() +'/profiles.includes.threads');

		getView.done(function(view){

			content.hide().html(view).fadeIn();

		});

	});




	
	/*btn_edit.on('click',function(){

		var getView = $.get('/get/view/profile/'+ id.val() +'/profiles.edit');

		getView.done(function(view){

			content.html(view);

		});

	});*/




	btn_work.on('click',function(){

		var getView = $.get('/get/view/employment_data/'+ id.val() +'/profiles.includes.work');

		getView.done(function(view){

			content.hide().html(view).fadeIn();

		});

	});





	fab_search.on('click',function(){

		mainContainer.toggle();
		searchContainer.toggle();

		if(searchContainer.is(':visible')){

			input_search.focus();

		}

	});




	input_search.on('keyup',function(){

		var input = $(this).val();

		if (input) {

			//Execute funcion when timer expires
			timer = setTimeout(function(){

				progressBar.fadeIn();

				searchProfile(input);				

			} , 1000 );

		}

	}).on('textinput keydown',function(){

		clearTimeout(timer);

	}).on('focusout',function(){

		if (!$(this).val()) {

			mainContainer.fadeIn();
			searchContainer.hide();

			search_results.hide();

		}
		
	});





	function clearSearchResults(input){

		if(!search_resultsList.is(':empty')){

			search_resultsList.empty();

		}
    	
    	if (!search_resultsHeader.is(':empty')) {

			search_resultsHeader.empty().append('Search results for: ' + input);

		}

	}





	function searchProfile(input,callback){

		var get = $.get('/profiles/search/' + input);

		get.done(function(profiles){

			clearTimeout(timer);

			clearSearchResults(input);

			render(search_template(profiles));

			progressBar.hide();

			!search_results.is(':visible') ? search_results.show() : null ;

		});

	}





	function search_template(profiles){

		var template = '';

		if (profiles.length) {

			for (var i = 0; i < profiles.length; i++) {

				var image_name = profiles[i].image_name ? profiles[i].image_name : 'default' ;

				template += "<a href='" + window.location.origin + "/profiles/" + profiles[i].id + "' class='collection-item avatar'>" +

						"<img src='" + window.location.origin + "/get/photo/profiles."+ profiles[i].id + ".profile_picture/" + image_name + "' alt='Avatar' class='circle'/>" +

						"<span class='title'>" + profiles[i].name + " (" + profiles[i].nickname + ")" + "</span>" +

					"</a>";

			}

		}else{

			template = "<li class='collection-item'> No results found. </li>";

		}

		return template;

	}





	function render(template){

		search_resultsList.append(template);
	    	
	}





	form_emailAFriend.on('submit',emailAFriend);

	function emailAFriend(e){

		typeof e !== 'undefined' ? e.preventDefault() : null ;

		var email = friend_email.val();

		form_emailAFriend.hide();
		sidebar_progressBar.show();

	   	var get = $.get(window.location.origin + '/profiles/email/' + email);

	   	get.done(function(data){

	   		sidebar_progressBar.hide();
	   		friend_email.val('');
	   		form_emailAFriend.show();

	   		alert(data);

	   	});
	}

})();