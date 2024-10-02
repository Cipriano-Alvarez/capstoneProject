<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Favorite;
use App\Models\Team;
use App\Models\Article;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;


class AdminAccountController extends Controller
{

    public function adminAccount(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            
    
            if($role->role =='admin'){
                return Inertia::render("AdminAccountPages/AdminAccount");
            }else{
                return redirect()->route('home');
            }
        }else{
    
            return redirect()->route('login');
        }
    }
    public function UpdatePassword(Request $request){
        $validate = $request->validate([
            'password'=>['required',
                          Password::min(6)
                            ->letters()
                            ->mixedCase()
                            ->numbers()
                            ->symbols(),'confirmed'],
            'password_confirmation'=>['required']
        ]);

        $user = Auth::user();
        $user->password = Hash::make($validate['password']);
        $user->save();
        return redirect()->route('admin');
    }
    public function AdminPasswordPage(){
        if(Auth::check()){
            return Inertia::render("AdminAccountPages/AdminAccountPassword");
        }else{
            return redirect()->route("login");
        }
    }

    public function EmailPage(){
        if(Auth::check()){
            $user = Auth::user();
            return Inertia::render("AdminAccountPages/AdminAccountEmail",['currentEmail'=>$user->email]);
        }else{
            return redirect()->route("login");
        }
    }

    public function UpdateEmail(Request $request){
        $validate = $request->validate([
            'email'=>['required','email','unique:App\Models\User,email']
        ]);

        $user = Auth::user();
        $user->email = $validate['email'];
        $user->save();

        return redirect()->route('account');
    }

    public function UpdateUserPage(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            if($role->role == 'admin'){
                return Inertia::render("AdminAccountPages/AdminUpdateUser");
            }else{
                return redirect()->route('home');
            }
        }else{
            return redirect()->route("login");
        }
    }

    public function GrabUser($email){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            
            if($role->role == 'admin'){
                try{
                $editableUser = User::where('email',$email)->firstOrFail();
                return Inertia::render("AdminAccountPages/AdminUpdateUser",[
                    "user"=>["email"=>$email,"first_name"=>$editableUser->first_name,"last_name"=>$editableUser->last_name]
                ]);}catch(ModelNotFoundException $e){
                    return Inertia::render("AdminAccountPages/AdminUpdateUser", [
                        'errors'=>["userError"=>"user not found"],
                        "status"=>404
                    ]);
                }
            }else{
                return redirect()->route("home");
            }
        }else{
            return redirect()->route("login");
        }
    }
    public function UpdateUser(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            if($role->role == 'admin'){
                $validated = $request->validate([
                    'first_name'=> ['required'],
                    'last_name'=>['required'],
                    'newemail'=>['required','email'],
                    'password'=>['required',
                     Password::min(6)
                       ->letters()
                       ->mixedCase()
                       ->numbers()
                       ->symbols(),'confirmed'],
                    'password_confirmation'=>['required']
                ]);

                try{
                    $editableUser = User::where('email',$request->oldEmail)->firstOrFail();
                    $emailExistCheck = User::where('email',$validated['newemail'])->count();
                    if($editableUser->email != $validated['newemail'] && $emailExistCheck == 0){
                        $editableUser->email = $validated['newemail'];
                    }else if($editableUser->email != $validated['newemail'] && $emailExistCheck > 0){
                        return Inertia::render("AdminAccountPages/AdminUpdateUser", [
                            'errors'=>["userError"=>"user Could not be updated Email already exists in database"],
                            "status"=>405
                        ]);
                    }

                    if($editableUser->first_name != $validated['first_name']){
                        $editableUser->first_name = $validated['first_name'];
                    }

                    if($editableUser->last_name != $validated['last_name']){
                        $editableUser->last_name = $validated['last_name'];
                    }
                    if($editableUser->password != Hash::make($validated["password"])){
                        $editableUser->password = Hash::make($validated["password"]);
                    }
                    $editableUser->save();

                    }catch(ModelNotFoundException $e){
                        return Inertia::render("AdminAccountPages/AdminUpdateUser", [
                            'errors'=>["userError"=>"user Could not be updated"],
                            "status"=>405
                        ]);
                    }
            }else{
                return redirect()->route('home');
            }
            
        }else{
            return redirect()->route('login');
        }
    }

    public function ArticlePage(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            
    
            if($role->role =='admin'){
                return Inertia::render("AdminAccountPages/Articles",[
                    'articles' => Article::paginate(5)
                ]);
            }else{
                return redirect()->route('home');
            }
        }else{
    
            return redirect()->route('login');
        }
    }

    public function AddArticle(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            
    
            if($role->role =='admin'){

                $validated = $request->validate([
                    'title'=> ['max:50','required'],
                    'link'=>['active_url','url:https,http','required'],
                    'description'=>['required','string']
                ]);

                $article = new Article;
                $article->title = $validated['title'];
                $article->website_link = $validated['link'];
                $article->description = $validated['description'];
                $article->save();

                return redirect()->route('articles');
            }else{
                return redirect()->route('home');
            }
        }else{
    
            return redirect()->route('login');
        }
    }

    public function DeleteArticle($id){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            
    
            if($role->role =='admin'){
                $validator =Validator::make(['id'=>$id],[
                    'id'=>['integer']
                ]);

                $validated = $validator->validated();
                $article = Article::where('id',$validated['id'])->first();
                $article->delete();

                return redirect()->route('articles');
            }else{
                return redirect()->route('home');
            }
        }else{
    
            return redirect()->route('login');
        }
    }

}
