<!--

    @Params

    SliderObject $slider_object;
    String $action;

-->

@extends('master')
@section('content')

	<div class="marg_20 transparent col s12 m12 l12">
	
	    <form class="marg_20" action="{{ url( 'slider/' . $slider_object->id ) }}" method="post" enctype="multipart/form-data">

	    	{!! method_field('patch') !!}
	
	    	{!! csrf_field() !!}
	
	       	<h5>Slider Manager</h5>
	
	       		@include('slider.includes.forms.slider')

	       	<div class="row">
	
	        	<button class="waves-effect waves-light btn red darken-2 right" type="submit">

	        	<i class="material-icons right">save</i>

	        		Update Slider

	        	</button>

	        </div>
	
	    </form>

	    @include('errors.form_errors')
	
	</div>

@stop