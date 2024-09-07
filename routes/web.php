<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function(){
    return Inertia::render("Home");
})->name("home");

Route::get("/login",function(){
    return Inertia::render("Login");
})->name("login");

Route::get("/signup",function(){
    return Inertia::render("SignUp");
})->name("signup");

require __DIR__.'/auth.php';
