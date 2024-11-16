<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\AdminAccountController;
use App\Http\Controllers\PremierLeagueController;
use App\Http\Controllers\BetsController;


Route::get("/", [HomeController::class,'home'])->name("home");




Route::controller(UsersController::class)->group(function(){
    Route::get('/login','login')->name('login');
    Route::get('/signup','signup')->name('signup');
    Route::post('/signup','newUser');
    Route::post('/login','loginUser');
})->middleware('guest');

Route::controller(UsersController::class)->group(function(){
    Route::post("/logout",'logoutUser');
})->middleware('auth');

Route::controller(UserAccountController::class)->group(function(){
    Route::get('/account','accountPage')->name('account');
    Route::get('/account/{id}','getFavouriteTeamInformation');
    Route::get('/account/email/updateEmail','accountEmailPage')->name('updateEmail');
    Route::put('/account/updateEmail','updateEmail');
    Route::get('/account/password/updatePassword','accountPasswordPage')->name('newPassword');
    Route::put('/account/updatePassword','updatePassword');
    Route::get('/account/favourites/updateFavourites','accountFavouritePage')->name('favourites');
    Route::delete('/account/favourite/{id}','deleteFavourite');

})->middleware("auth");

Route::controller(AdminAccountController::class)->group(function(){
    Route::get('/adminAccount','adminAccount')->name('admin');
    Route::put('/adminAccount/updatePassword','UpdatePassword');
    Route::get('/adminAccount/password/UpdatePassword','AdminPasswordPage')->name('updatePassword');
    Route::get('/adminAccount/email/UpdateEmail','EmailPage')->name('newEmail');
    Route::put('/adminAccount/updateEmail','UpdateEmail');
    Route::get('/adminAccount/user/updateUser','UpdateUserPage')->name("updateUser");
    Route::get('/adminAccount/user/grabUser/{email}','GrabUser');
    Route::put('/adminAccount/user/updateUser','UpdateUser');
    Route::get('/adminAccount/articles','ArticlePage')->name('articles');
    Route::post('/adminAccount/articles','AddArticle');
    Route::delete('/adminAccount/articles/delete/{id}','DeleteArticle');
    Route::get('/adminAccount/updatebet','UpdateBetPage')->name('updatebet');
    Route::get('/adminAccount/updatebet/grabuser/{id}','GrabUsersBets');
    Route::put('/adminAccount/updatebet/newchoice','UpdateChoice');
    Route::delete('/adminAccount/deletebet/{id}','DeleteBet');
})->middleware("auth");

Route::controller(PremierLeagueController::class)->group(function(){
    Route::get('/premierleague','PremierLeague')->name('premierleague');
    Route::get('/premierleague/fixture/{id}','GetMatchInfoPage');
    Route::get('/premierleague/team/{id}','GetTeamStats');
});

Route::controller(BetsController::class)->group(function(){
    Route::get('/bets','Bets')->name('bets');
    Route::get('/bets/match/{id}','GetMatch');
    Route::post('/bets/match','AddBet');
    Route::post('/bets/comment','AddComment');
    Route::post('/bets/reportedcomment','AddReportedPost');
    Route::post('/bets/addfavourite','AddFavourite');
    Route::delete('/bets/comment/delete/{id}','DeletePost');
});

require __DIR__.'/auth.php';


