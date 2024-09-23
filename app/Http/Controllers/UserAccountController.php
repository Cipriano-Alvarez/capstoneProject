<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Role;
use App\Models\Favorite;
use App\Models\Team;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

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
        $role = Role::where('user_id','=',$user->id)->first();
        $userRole = $role->id;

        if($role->role =='admin'){
            return;
        }else{
            
            $favTeams = $this->grabFavouriteTeams($user->id);
            return Inertia::render("AccountPages/UserAccount",[
                'favTeams' => $favTeams
            ]);
        }
    }else{

        return redirect()->route('login');
    }


    }

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

    public function grabTeamFromApi($id){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams',[
            	'id' => $id

        ]);
        return $request->json();
    }
}
