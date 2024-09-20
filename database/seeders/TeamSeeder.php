<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;
use Illuminate\Support\Facades\Http;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function grabTeams(){

        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams',[
            	'league' => '39',
	            'season' => '2024'
        ]);

        return ($request);
    }


    public function run(): void
    {

        $request = $this->grabTeams();
        $requestObject = $request->json();
        foreach($requestObject["response"] as $team){

           $newTeam = new Team;
           $newTeam->prem_id = $team["team"]["id"];
           $newTeam->save();
        }
    }
}
