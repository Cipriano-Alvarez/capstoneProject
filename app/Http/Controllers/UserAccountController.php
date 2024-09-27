<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Role;
use App\Models\Favorite;
use App\Models\Team;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

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
        $role = Role::where('id','=',$user->role_id)->first();
        

        if($role->role =='user'){
            $favTeams = $this->grabFavouriteTeams($user->id);
            return Inertia::render("AccountPages/UserAccount",[
                'favTeams' => $favTeams,
            ]);
        }else{
            return redirect()->route('admin');
        }
    }else{

        return redirect()->route('login');
    }


    }

    //this function takes the user id and grabs a collection of all the Favorites items in the Favorite model
    //and returns an array of premier league team infortion coresponding the the user's favourite teams

    public function grabFavouriteTeams($id){
        $teamArray = [];
        $favouriteTeams = Favorite::where('user_id',$id)->get();
        foreach($favouriteTeams as $userTeam){
            $currentTeam = Team::where('id',$userTeam->team_id)->first();
            $team =$this->grabTeamFromApi($currentTeam->prem_id);
            array_push($teamArray,$team["response"][0]["team"]);

        }
        
        return $teamArray;
    }

    //this function takes an Id that matches a premier league team id in soccer api and grabs the information
    //From the Api
    public function grabTeamFromApi($id){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams',[
            	'id' => $id

        ]);
        return $request->json();
    }
    //this function grabs all the team information for when a user clicks on a team from his account page
    public function getFavouriteTeamInformation($id){



        if(Auth::check()){

            $user = Auth::user();

            $nextFixtures = Http::withHeaders([
                'x-rapidapi-host' => 'v3.football.api-sports.io',
                'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
            ])->get('https://v3.football.api-sports.io/fixtures',[
                    'team' => $id,
                    'league'=>39,
                    'next'=>5
    
            ]);

            $pastFixtures = Http::withHeaders([
                'x-rapidapi-host' => 'v3.football.api-sports.io',
                'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
            ])->get('https://v3.football.api-sports.io/fixtures',[
                    'team' => $id,
                    'league'=>39,
                    'last'=>3
    
            ]);
            $record = Http::withHeaders([
                'x-rapidapi-host' => 'v3.football.api-sports.io',
                'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
            ])->get('https://v3.football.api-sports.io/teams/statistics',[
                    'team' => $id,
                    'league'=>39,
                    'season'=>2024
    
            ]);




            $favTeams = $this->grabFavouriteTeams($user->id);
            return Inertia::render("AccountPages/UserAccount",[
                'favTeams' => $favTeams,
                'nextFixtures'=>$nextFixtures->json(),
                'lastFixtures'=>$pastFixtures->json(),
                'record'=>$record->json()
            ]);
        }else{
            return redirect()->route('login');
        }



    }

    public function accountEmailPage(){
        if(Auth::check()){
            $user = Auth::user();
            return Inertia::render("AccountPages/UserAccountEmail",['currentEmail'=>$user->email]);
        }else{
            return redirect()->route("login");
        }
    }

    public function updateEmail(Request $request){
        $validate = $request->validate([
            'email'=>['required','email','unique:App\Models\User,email']
        ]);

        $user = Auth::user();
        $user->email = $validate['email'];
        $user->save();

        return redirect()->route('account');
    }

    public function accountPasswordPage(){
        if(Auth::check()){
            return Inertia::render("AccountPages/UserAccountPassword");
        }else{
            return redirect()->route("login");
        }
    }

    public function updatePassword(Request $request){
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
        return redirect()->route('account');
    }

    public function accountFavouritePage(){
        if(Auth::check()){
            $user=Auth::user();
            $favTeams = $this->grabFavouriteTeams($user->id);
            return Inertia::render("AccountPages/UserAccountFavourites",[
                'favTeams'=>$favTeams,
                'userid'=>$user->id
            ]);
        }else{
            return redirect()->route("login");
        }
    }

    public function deleteFavourite($id){
        $validator =Validator::make(['id'=>$id],[
            'id'=>['integer']
        ]);

        $validated = $validator->validated();
        $user = Auth::user();
        $team = Team::where('prem_id',$validated['id'])->first();
        $favouriteTeam = Favorite::where('user_id',$user->id)->where('team_id',$team->id)->first();
        $favouriteTeam->delete();

        return redirect()->route("favourites");
    }
}
