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
use App\Models\Bet;
use Carbon\Carbon;

class AdminAccountController extends Controller
{

    public function adminAccount(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            $correctBets =Bet::where('outcome','correct')->get();
            $incorrectBets = Bet::where('outcome','incorrect')->get();     
            $totalBets = Bet::all();
            $fixtures = Bet::whereIn('fixture_id',$this->grabFixtures())->get();

            $teamTotals = [];
            foreach($fixtures as $fixture){
                if(!isset($teamTotals[$fixture['choice']])){
                    $teamTotals[$fixture['choice']] =[
                        'name'=>$fixture['choice'],
                        'count'=>1
                    ];
                }else{
                    $teamTotals[$fixture['choice']]['count'] = $teamTotals[$fixture['choice']]['count'] + 1 ;
                }
            }

            


    
            if($role->role =='admin'){
                return Inertia::render("AdminAccountPages/AdminAccount",[
                  'data' => [ 
                            'wins'=>count($correctBets),
                            'loses'=>count($incorrectBets),
                            'total'=>count($totalBets),
                            'fixtures'=>$teamTotals,
                            ]
                ]);
            }else{
                return redirect()->route('home');
            }
        }else{
    
            return redirect()->route('login');
        }
    }

    public function grabFixtures(){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
            	'league' => '39',
	            'season' => $date->year,
                'next'=> 10
        ]);
        $matches = $request->json();
        $fixtures = [];

        foreach($matches['response'] as $match){
            array_push($fixtures,$match['fixture']['id']);
        }
        return $fixtures;
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

    public function UpdateBetPage(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            if($role->role == 'admin'){ 
                return Inertia::render('AdminAccountPages/AdminAccountUpdateBet');
            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route('home');
        }
    }
    public function GrabUsersBets($id){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            if($role->role == 'admin'){
                
                try{
                    $editableUser = User::where('email',$id)->firstOrFail();
                    $bets = Bet::where('user_id', $editableUser->id)->where('outcome','tbd')->latest()->paginate(5,['id','fixture_id','choice','outcome']);

                    $idString = "";
                    foreach($bets as $bet){
                        if(strlen($idString) == 0){
                            $idString = $bet->fixture_id;
                        }else{
                            $idString = $idString."-".$bet->fixture_id;
                        }
                    }
                    $fixtures = $this->grabUsersFixtures($idString);
                    $teams = [];
                    foreach($fixtures as $fixture){
                            $game = [
                                'hometeam'=>$fixture['teams']['home']['name'],
                                'awayteam'=>$fixture['teams']['away']['name'],
                                'fixture_id'=>$fixture['fixture']['id']
                            ];
                            $teams[$fixture['fixture']['id']] = $game;
                    }

                    return Inertia::render("AdminAccountPages/AdminAccountUpdateBet",[
                        "bets"=>$bets,
                        "fixtures"=>$teams,
                        "user" =>true
                    ]);}catch(ModelNotFoundException $e){
                        return Inertia::render('AdminAccountPages/AdminAccountUpdateBet', [
                            'errors'=>["userError"=>"user not found"],
                            "status"=>404
                        ]);
                    }

                
            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route('home');
        }
    }

    public function grabUsersFixtures($ids){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
            	'ids'=>$ids
        ]);
            $fixtures = $request->json();

        return $fixtures['response'];

    }

    public function UpdateChoice(Request $request){

        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            if($role->role == 'admin'){
                
                $validate = $request->validate([
                    'newchoice'=>['required','string'],
                    'betid'=>['required','integer']
                ]);
                
                $bet = Bet::where('id',$validate['betid'])->first();
                $bet->choice = $validate['newchoice'];
                $bet->save();
                return redirect()->back();

                
            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route('home');
        }
    }

    public function DeleteBet($id){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();

            if($role->role == 'admin'){
                $validator =Validator::make(['id'=>$id],[
                    'id'=>['integer']
                ]);

                $validated = $validator->validated();
                
                $bet = Bet::where('id',$validated['id'])->first();
                
                $bet->delete();
                return redirect()->back();

                
            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route('home');
        }
    }

    public function NewAdmin(){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            if($role->role == 'admin'){ 
                return Inertia::render('AdminAccountPages/AdminAccountNewAdmin');
            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route("home");
        }
    }

    public function MakeAdmin(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $role = Role::where('id','=',$user->role_id)->first();
            if($role->role == 'admin'){ 
                $validated = $request->validate([
                    'firstname'=> ['required'],
                    'lastname'=>['required'],
                    'email'=>['required','email'],
                    'password'=>['required',
                     Password::min(6)
                       ->letters()
                       ->mixedCase()
                       ->numbers()
                       ->symbols(),'confirmed'],
                    'password_confirmation'=>['required']
                ]);

                $user = new User;
                $user->first_name = $validated['firstname'];
                $user->last_name = $validated['lastname'];
                $user->password = Hash::make($validated['password']);
                $user->email = $validated['email'];
                $userRole = Role::where('role','admin')->first();
                $user->role_id = $userRole->id;
                $user->age = 0;
                $user->save();
                return redirect()->route("admin");

                

            }else{
                return redirect()->route('home');
            }

        }else{
            return redirect()->route("home");
        }
    }

}
