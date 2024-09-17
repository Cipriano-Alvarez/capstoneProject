<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;

Route::get("/", function(){
    return Inertia::render("Home");
})->name("home");

Route::get("/login",function(){
    return Inertia::render("Login");
})->name("login")->middleware('guest');

Route::get("/signup",function(){
    return Inertia::render("SignUp");
})->name("signup")->middleware('guest');

//code will be used when the user controller is up and runnings
// Route::controller(Users::class)->group(function(){
//     Route::get('/login','login')->name('login');
//     Route::get('/signup','signup')->name('signup');
//     Route::post('/newuser','newUser');
// })->middleware('guest');
require __DIR__.'/auth.php';

Route::post("/signup",[UsersController::class,'newUser' ]);
Route::post("/login",[UsersController::class,'loginUser']);
