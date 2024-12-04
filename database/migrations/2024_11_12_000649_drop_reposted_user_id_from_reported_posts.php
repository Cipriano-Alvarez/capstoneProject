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
        Schema::table('reported_posts', function (Blueprint $table) {
            $table->dropColumn("reported_user_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reported_posts', function (Blueprint $table) {
            $table->integer('reported_user_id');
        });
    }
};