<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('organization');
            $table->string('location');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->integer('duration_years');
            $table->integer('duration_months');
            $table->timestamps();
        });

        Schema::create('job_descriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('experience_id');
            $table->text('description');
            $table->timestamps();

            $table->foreign('experience_id')->references('id')->on('experiences')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_descriptions');
        Schema::dropIfExists('experiences');
    }
};
