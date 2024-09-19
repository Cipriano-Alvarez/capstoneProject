<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class UserAccountController extends Controller
{
    public function accountPage(){
        $user = Auth::user();
        $role = Role::where('user_id','=',4)->first();
        $userRole = $role->id;

        if($role->role =='admin'){
            return;
        }else{
            return Inertia::render("UserAccount");
        }


    }
}
