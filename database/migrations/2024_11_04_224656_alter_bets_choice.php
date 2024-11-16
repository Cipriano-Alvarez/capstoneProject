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
        Schema::table('bets', function (Blueprint $table) {
            $table->string('choice',30)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Scheme::table('bets',function(Blueprint $table){
            $table->set('outcome',['correct','incorrect','tbd'])->change();
        });
    }
};
