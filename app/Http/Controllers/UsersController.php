<?php

// this controller will handle the user login and sign up pages

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;



class UsersController extends Controller
{
    public function login(){
        if(!Auth::check()){
        return Inertia::render('Login');}else{
            return redirect()->route('home');
        }
    }
    public function signup(){
        if(!Auth::check()){
        return Inertia::render('SignUp');}else{
            return redirect()->route('home');
        }
    }

    public function newUser(Request $request){
        
        $validated = $request->validate([
            'firstName' => ['required'],
            'lastName'=>['required'],
            'email'=> ['required', 'email', 'unique:App\Models\User,email'],
            'password'=>['required',
                          Password::min(6)
                            ->letters()
                            ->mixedCase()
                            ->numbers()
                            ->symbols(),'confirmed'],
            'password_confirmation'=>['required'],
            'age'=>['required', 'min:18','integer']
        ]);


        $user = new User;
        $user->first_name = $request->input("firstName");
        $user->last_name = $request->input("lastName");
        $user->password = Hash::make($request->input("password"));
        $user->email = $request->input("email");
        $user->age = $request->input("age");

        $user->save();

        $role = New Role;
        $role->user_id = $user->id;
        $role->role = "user";
        $role->save();

        return redirect()->route('login');
    }

    public function loginUser(Request $request){
        $validated = $request->validate([
            'password'=>['required'],
            'email'=>['required','email']
        ]);

        if(Auth::attempt($validated)){
            $request->session()->regenerate();

            return redirect()->route('home');
        }
        return back()->withErrors([
            'email'=>'provided credentials dont match our records'
        ]);



    }

    public function logoutUser(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');

    }

}
