<!--

	@params
	Collection/Paginator $users

-->
<div id="progress_bar" class="progress" style="display: none">

    <div class="indeterminate"></div>

</div>

<p id="lbl_printedDepartment" class="center" style="display: none"></p>

<table id="tbl_userManagement" class="striped">

    <thead>
        <tr>
            <!--<th data-field="id">ID</th>-->
            <th data-field="name">Name</th>
            <th data-field="batch">Batch</th>
            <th data-field="name_of_company_or_org">Name of Company</th>
            <th data-field="work_address">Work Address</th>
            <th data-field="present_occupation">Occupation</th>
            <th data-field="reasons_not_yet_employed">Reasons not yet employed</th>
        </tr>
    </thead>

	<tbody>

		@if ($users->lastPage() !== 0) 

		    @foreach ($users as $user)

		        <tr>
		        	@if ($user->profile()->first())
		        		<input type="hidden" id="profile_id" value="{{ $user->profile->id }}"/>
		        	@endif

		        		<input type="hidden" id="id" value="{{ $user->id }}"/>
		        		<input type="hidden" id="name" value="{{ $user->name }}"/>
		        		<input type="hidden" id="email" value="{{ $user->email }}"/>
		        		<input type="hidden" id="username" value="{{ $user->username }}"/>
		        		<input type="hidden" id="department" value="{{ $user->department_id }}"/>
		        		<input type="hidden" id="role" value="{{ $user->role_id }}"/>

		            <!--<td>{{ $user->id }}</td>-->
		            <td>{{ $user->name }}</td>
		            <td>{{ $user->batch !== '' ? $user->batch : '-' }}</td>
		            <td>{{ $user->employment_data()->first() ? $user->employment_data->name_of_company_or_org : '-' }}</td>
		            <td>{{ $user->employment_data()->first() ? $user->employment_data->work_address : '-' }}</td>
		            <td>{{ $user->employment_data()->first() ? $user->employment_data->present_occupation : '-' }}</td>
		          	<td>{{ $user->employment_data()->first() ? $user->employment_data->reasons_not_yet_employed : '-' }}</td>
		        </tr>

		    @endforeach

		@else

		    <tr>No users found.</tr>

		@endif

	</tbody>
	

</table>

<div id="pagination">
	{!! $users->render() !!}
</div>