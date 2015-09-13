<!--

	@params

	Collection $educational_attainments, 
	$professional_exams_passed,
	$employment_data,
	$training_or_advance_studies

-->
@extends('master')
@section('content-fluid')

	<div class="row marg_20">

		@if ($educational_attainments->first())

			<div class="col s12 m6 l6">

				<h5>Educational Attainments</h5>

				<div class="card">

					<table class="responsive-table striped">

						<th>Name</th>
						<th>Degree(s) or College Specialization(s)</th>
						<th>College / University</th>
						<th>Yead Graduated</th>
						<th>Honors or Awards</th>

						@foreach ($educational_attainments as $educational_attainment)

							<tr>

							<td>{{ $educational_attainment->user->name }}</td>
							<td>{{ $educational_attainment->degree }}</td>
							<td>{{ $educational_attainment->college_or_university }}</td>
							<td>{{ $educational_attainment->year_graduated }}</td>
							<td>{{ $educational_attainment->honors_or_awards }}</td>

							</tr>

						@endforeach

					</table>

				</div>

				@include('includes.pagination',['paginator' => $educational_attainments])

			</div>

		@endif




		@if ($professional_exams_passed->first())

			<div class="col s12 m6 l6">

				<h5>Professional Exams Passed</h5>

				<div class="card">

					<table class="responsive-table striped">

						<th>Name</th>
						<th>Name of Examination</th>
						<th>Date Taken</th>
						<th>Rating</th>

						@foreach ($professional_exams_passed as $professional_exam_passed)

							<tr>

							<td>{{ $professional_exam_passed->user->name }}</td>
							<td>{{ $professional_exam_passed->name_of_exam }}</td>
							<td>{{ $professional_exam_passed->date_taken }}</td>
							<td>{{ $professional_exam_passed->rating }}</td>

							</tr>

						@endforeach

					</table>

				</div>

				@include('includes.pagination',['paginator' => $professional_exams_passed])

			</div>

		@endif





		@if ($training_or_advanced_studies->first())

			<div class="col s12 m12 l12">

				<h5>Trainings or Advance Studies</h5>

				<div class="card">

					<table class="responsive-table striped">

						<th>Name</th>
						<th>Training or Advanced Study</th>
						<th>Duration</th>
						<th>Institution</th>

						@foreach ($training_or_advanced_studies as $training_or_advanced_study)

							<tr>

							<td>{{ $training_or_advanced_study->user->name }}</td>
							<td>{{ $training_or_advanced_study->training_or_advanced_study }}</td>
							<td>{{ $training_or_advanced_study->duration }}</td>
							<td>{{ $training_or_advanced_study->institution }}</td>

							</tr>

						@endforeach

					</table>

				</div>

				@include('includes.pagination',['paginator' => $training_or_advanced_studies])

			</div>

		@endif






		@if ($employment_data->first())

			<div class="col s12 m12 l12">

				<h5>Employment Data</h5>

				<div class="card">

					<table class="responsive-table striped">

						<th>Name</th>
						<th>Employment Status</th>
						<th>Present Occupation</th>
						<th>Name of Company or Org</th>
						<th>Place of Work</th>
						<th>Is First Job?</th>
						<th>Reasons for Changing Job</th>
						<th>Reasons for Changing Job, others</th>
						<th>Job Duration</th>
						<th>Method of Job Finding</th>
						<th>Method of Job Finding, others</th>
						<th>Job Finding Duration</th>
						<th>Job Finding Duration, others</th>
						<th>Salary</th>
						<th>Is your curriculum relevant?</th>
						<th>Reasons not yet employed</th>
						<th>Reasons not yet employed, others</th>



						@foreach ($employment_data as $data)

							<tr>

							<td>{{ $data->user->name }}</td>
							<td>{{ $data->employment_status }}</td>
							<td>{{ $data->present_occupation }}</td>
							<td>{{ $data->name_of_company_or_org }}</td>
							<td>{{ $data->place_of_work }}</td>
							<td>{{ $data->is_first_job }}</td>
							<td>{{ $data->reasons_for_changing_job }}</td>
							<td>{{ $data->reasons_for_changing_job_others }}</td>
							<td>{{ $data->job_duration }}</td>
							<td>{{ $data->method_of_finding_job }}</td>
							<td>{{ $data->method_of_finding_job_others }}</td>
							<td>{{ $data->job_finding_duration }}</td>
							<td>{{ $data->job_finding_duration_others }}</td>
							<td>{{ $data->salary }}</td>
							<td>{{ $data->is_curriculum_relevant }}</td>
							<td>{{ $data->reasons_not_yet_employed }}</td>
							<td>{{ $data->reasons_not_yet_employed_others }}</td>


							</tr>

						@endforeach

					</table>

					{!! $employment_data->render() !!}

				</div>

			</div>

		@endif

	</div>

@stop