<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrainingsOrAdvancedStudiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trainings_or_advanced_studies', function (Blueprint $table){

            $table->increments('id');
            $table->string('training_or_advanced_study');
            $table->string('duration');
            $table->string('institution');
            $table->integer('user_id')->unsigned();
            $table->integer('department_id')->unsigned();
            $table->timestamps();

            $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');


            $table->foreign('department_id')
                    ->references('id')
                    ->on('departments')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET foreign_key_checks = 0');
        Schema::drop('trainings_or_advanced_studies');
        DB::statement('SET foreign_key_checks = 1');
    }
}
