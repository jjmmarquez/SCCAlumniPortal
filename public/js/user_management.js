var users = (function(){

	var timer;

	var userManagement = $('#users');
	var nav = $('nav');
	var footer = $('footer');



	

	var tbl_userManagementContainer = userManagement.find('#tbl_userManagementContainer');

	var user_management_search = tbl_userManagementContainer.find('#user_management_search');
	var search_type = user_management_search.find('#search_type');
	var order_by = user_management_search.find('#order_by');
	var order = user_management_search.find('#order');
	var department_filter = user_management_search.find('#department_filter');

	var input_search_container = user_management_search.find('#input_search_container');
	var input_search = input_search_container.find('#input_search');

	var industry_container = user_management_search.find('#industry_container');
	var industry = industry_container.find('[name="industry"]');

	var lbl_printDepartment = tbl_userManagementContainer.find('#lbl_printedDepartment');
	var progressBar = tbl_userManagementContainer.find('#progress_bar');
	var tbl_userManagement = tbl_userManagementContainer.find('#tbl_userManagement');
	var pagination = tbl_userManagementContainer.find('#pagination');
	var btn_printTable = tbl_userManagementContainer.find('#btn_printTable');





	var form_userManagementContainer = userManagement.find('#form_userManagementContainer');

	var form_userManagement = form_userManagementContainer.find('#form_userManagement');
	var btn_back = form_userManagement.find('#btn_back');

	var laravel_method = form_userManagement.find('#laravel_method');	
	
	var lbl_name = form_userManagement.find('#lbl_name');
	var input_name = form_userManagement.find('#name');

	var lbl_email = form_userManagement.find('#lbl_email');
	var input_email = form_userManagement.find('#email');

	var lbl_username = form_userManagement.find('#lbl_username');
	var input_username = form_userManagement.find('#username');

	var select_department = form_userManagement.find('#department_id');
	var select_role = form_userManagement.find('#role_id');

	var btn_submit = form_userManagement.find('#btn_submit');
	var btn_delete = form_userManagement.find('#btn_delete');
	var btn_goToProfile = form_userManagement.find('#btn_goToProfile');
	var btn_createAccount = tbl_userManagementContainer.find('#btn_createAccount'); 





	var id;
	var profile_id;
	var name;
	var email;
	var username;
	var department_id;
	var course_id;
	var role_id;





	var search_value = '';





	tbl_userManagement.on('click','tr',function(){

		var selection = $(this);

		tbl_userManagementContainer.hide();

		var td_id = selection.find('#id');
		var td_name = selection.find('#name');
		var td_email = selection.find('#email');
		var td_username = selection.find('#username');
		var td_department = selection.find('#department');
		//var td_course = selection.find('#course');
		var td_role = selection.find('#role');
		var profile_id = selection.find('#profile_id');

		id = td_id.val();
		profile_id = profile_id.val();
		name = td_name.val();
		email = td_email.val();
		username = td_username.val();
		department_id = td_department.val();
		role_id = td_role.val();

		var arr = {

			id : id,
			name : name,
			email : email,
			username : username,
			department_id : department_id,
			role_id : role_id,
			profile_id : profile_id

		};

		setUserManagementForm(arr,'edit');
		form_userManagementContainer.show();

	});






	btn_back.on('click',function(e){

		e.preventDefault();

		form_userManagementContainer.toggle();
		tbl_userManagementContainer.toggle();

	});





	search_type.on('change',function(){

		var selection = $(this);

		if(selection.val() === 'industry') {

			industry_container.show();
			input_search_container.hide();

		} else {

			industry_container.hide();
			input_search_container.show();

		}

	});





	industry.on('change',function(){

		search_value = $(this).find(':selected').val();

		searchUsers();

	});





	input_search.on('keyup',function(){

		search_value = $(this).val();

		if (search_value) {

			timer = setTimeout(function(){

				searchUsers();

			}, .5 * 1000);

		} else {

			searchUsers();

		}

	}).on('keydown textinput',function(){

		clearTimeout(timer);

	});

	order_by.on('change',searchUsers);
	order.on('change',searchUsers);
	department_filter.on('change',searchUsers);

	btn_createAccount.on('click',showCreateAccountForm);

	btn_printTable.on('click',prepareTableForPrint);


	





	function showCreateAccountForm(){

		setUserManagementForm(null, 'create');
		form_userManagementContainer.toggle();
		tbl_userManagementContainer.toggle();
	    	
	}





	function prepareTableForPrint(e){
	
	    typeof e !== 'undefined' ? e.preventDefault() : null ;

		user_management_search.hide();

		nav.hide();
		footer.hide();
		btn_createAccount.hide();
		btn_printTable.hide();
		lbl_printDepartment.html('<b>' + department_filter.find(":selected").text() + '</b>').show();


		window.print();


		lbl_printDepartment.hide();
		user_management_search.show();
		nav.show();
		footer.show();
		btn_createAccount.show();
		btn_printTable.show();
	    	
	}





	function setUserManagementForm(data,action){

		if(action === 'edit'){

			form_userManagement.prop('action', window.location.origin + '/users/' + id);

			laravel_method.prop('name','_method');
			laravel_method.prop('value','PATCH');



			input_name.val(data.name);
			lbl_name.addClass('active');

			input_email.val(data.email);
			lbl_email.addClass('active');

			input_username.val(data.username);
			lbl_username.addClass('active');



			select_department.val(data.department_id);
			select_role.val(data.role_id);
			$('select').material_select('update');



			btn_submit.text('Update User Info');
			btn_delete.prop('href', window.location.origin + '/users/' + data.id + '/destroy').show();




			if (data.profile_id) {

				btn_goToProfile.is(':visible') ? '' : btn_goToProfile.show() ;

				btn_goToProfile.prop('href', window.location.origin + '/profiles/' + data.profile_id);

			} else {

				btn_goToProfile.is(':visible') ? btn_goToProfile.hide() : '' ;

			}



		} else {



			input_name.val('');
			input_email.val('');
			input_username.val('');



			select_department.val(null);
			select_role.val(null);
			$('select').material_select('update');



			btn_submit.text('Create User');
			btn_delete.hide();
			btn_goToProfile.hide();

		}

	}





	function searchUsers(){

		var i = search_value !== '' ? search_value : '*';

		progressBar.show();

		var get = $.get('/users/search/' + search_type.val() + '/' + i + '/' + department_filter.val() + '/' + order_by.val() + '.' + order.val());

			get.done(function(view){

				if (!pagination.is(':empty')) {

					pagination.empty();

				}

				render(view);

				progressBar.hide();
				
			});

	}





	function render(view){
	
	    tbl_userManagement.html(view);
	    	
	}

})();