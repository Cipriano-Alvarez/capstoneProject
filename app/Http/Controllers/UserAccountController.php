<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Favourite;
use App\Models\Team;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class UserAccountController extends Controller
{

/***
 * TO DO
 * Create the sub pages (rest password, change email , favorites etc)
 * Flesh out admin page
 * Test out functionality for the admin pages
 * Create an Admin
 * 
 */

    public function accountPage(){
        if(Auth::check()){
        $user = Auth::user();
        $role = Role::where('user_id','=',4)->first();
        $userRole = $role->id;

        if($role->role =='admin'){
            return;
        }else{
            return Inertia::render("AccountPages/UserAccount");
        }
    }else{
        return redirect()->route('login');
    }


    }

    public function grabFavouriteTeams(){

    }
}
