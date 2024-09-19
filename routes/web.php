<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SoccerApiController;

Route::get("/", [SoccerApiController::class,'home'])->name("home");




Route::controller(UsersController::class)->group(function(){
    Route::get('/login','login')->name('login');
    Route::get('/signup','signup')->name('signup');
    Route::post('/signup','newUser');
    Route::post('/login','loginUser');
})->middleware('guest');

Route::controller(UsersController::class)->group(function(){
    Route::post("/logout",'logoutUser');
})->middleware('auth');


require __DIR__.'/auth.php';


