<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class PremierLeagueController extends Controller
{

    public function __construct(){
        $this->TPL = [];
        $this->TPL["matches"] = $this->getGames();
        $this->TPL["teams"] = $this->getTeams();
        $this->TPL["standings"] = $this->getStandings();
        $this->TPL["match"] = null;
        $this->TPL['stats'] = null;

        
    }

    public function PremierLeague(){
        return Inertia::render('PremierLeaguePages/PremierLeague',$this->TPL);
    }

    public function getGames(){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
            	'league' => '39',
	            'season' => $date->year,
                'next'=> 10
        ]);

        return $request->json();
    }
    public function getTeams(){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams',[
            	'league' => '39',
	            'season' => $date->year
                
        ]);
        return $request->json();
            
    }
    public function getStandings(){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/standings',[
            	'league' => '39',
	            'season' => $date->year
                
        ]);
        return $request->json();
    }
    public function GetMatchInfoPage($id){
        $validator = Validator::make(['id'=>$id],[
            'id'=>['integer']
        ]);
        $validated = $validator->validated();
        $this->TPL['match'] = $this->getMatch($validated['id']);
        $homeTeamID = $this->TPL['match']['response'][0]['teams']['home']['id'];
        $awayTeamID=$this->TPL['match']['response'][0]['teams']['away']['id'];
        $this->TPL['odds'] = $this->getOdds($id);
        $this->TPL['awayForm'] = $this->getStats($awayTeamID);
        $this->TPL['homeForm'] = $this->getStats($homeTeamID);

        return Inertia::render('PremierLeaguePages/PremierLeague',$this->TPL);
    }

    public function getMatch($id){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/predictions',[
                'fixture'=>$id
        ]);

        return $request->json();
    }

    public function getOdds($id){
        
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/odds',[
                'fixture'=>$id,
                'bookmaker'=>8
        ]);
        return $request->json();
    }
    public function getStats($id){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams/statistics',[
                'season'=>$date->year,
                'team'=>$id,
                'league'=> 39
        ]);

        $teamStats  = $request->json();
        return $teamStats;
    }
    // id represents team id
    public function GetTeamStats($id){
        $validator = Validator::make(['id'=>$id],[
            'id'=>['integer']
        ]);
        $validated = $validator->validated();
        $this->TPL['stats'] = $this->getStats2($id);
        $this->TPL['players'] = $this->getPlayers($id);
        $this->TPL['matches3']= $this->getNextThreeMatches($id);
        $this->TPL['rank'] = $this->getRank($id);

        return Inertia::render('PremierLeaguePages/PremierLeague',$this->TPL);

    }
    public function getPlayers($teamId){
        $players = [];

        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/players',[
                'season'=>$date->year,
                'team'=>$teamId,
                'league'=> 39,
                
        ]);
        $jsonObj = $request->json();
        $total = $jsonObj['paging']['total'];
        $playerOneGoalsAndAssists =0;
        $playerTwoGoalsAndAssists=0;
        $playerThreeGoalsAndAssists=0;
         for($i =1 ; $i <= $total; $i++){
            if($i == 1){
                for($x =0; $x<count($jsonObj['response']);$x++){
                    $currentPlayer = $jsonObj['response'][$x];
                    $currentPlayerGoalsAndAssists =  $currentPlayer['statistics'][0]['goals']['total'] + $currentPlayer['statistics'][0]['goals']['assists'];
                    if(count($players) <3){
                        array_push($players,$currentPlayer);
                        if(count($players) == 1){
                            $playerOneGoals = $currentPlayerGoalsAndAssists;
                        }else if(count($players)== 2){
                            $playerTwoGoalsAndAssists = $currentPlayerGoalsAndAssists;
                        }else if(count($players)== 3){
                            $playerThreeGoalsAndAssists = $currentPlayerGoalsAndAssists;
                        }
                    }else{
                        if($playerOneGoals < $currentPlayerGoalsAndAssists){
                            $players[0] = $currentPlayer;
                            $playerOneGoals = $currentPlayerGoalsAndAssists;
                        }else if($playerTwoGoalsAndAssists <$currentPlayerGoalsAndAssists ){
                            $players[1] = $currentPlayer;
                            $playerTwoGoalsAndAssists = $currentPlayerGoalsAndAssists;
                        }else if($playerThreeGoalsAndAssists<$currentPlayerGoalsAndAssists){
                            $players[2] = $currentPlayer;
                            $playerThreeGoalsAndAssists = $currentPlayerGoalsAndAssists;
                        }
                    }
                    
                }
                continue;
            }else{
                $request = Http::withHeaders([
                    'x-rapidapi-host' => 'v3.football.api-sports.io',
                    'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
                ])->get('https://v3.football.api-sports.io/players',[
                        'season'=>$date->year,
                        'team'=>$teamId,
                        'league'=> 39,
                        'page'=>$i
                        
                ]);
                $jsonObj = $request->json();
                for($x =0; $x<count($jsonObj['response']);$x++){
                    $currentPlayer = $jsonObj['response'][$x];
                    $currentPlayerGoalsAndAssists =  $currentPlayer['statistics'][0]['goals']['total'] + $currentPlayer['statistics'][0]['goals']['assists'];
                    
                    if($playerOneGoals < $currentPlayerGoalsAndAssists){
                        $players[0] = $currentPlayer;
                        $playerOneGoals = $currentPlayerGoalsAndAssists;
                    }else if($playerTwoGoalsAndAssists <$currentPlayerGoalsAndAssists ){
                        $players[1] = $currentPlayer;
                        $playerTwoGoalsAndAssists = $currentPlayerGoalsAndAssists;
                    }else if($playerThreeGoalsAndAssists<$currentPlayerGoalsAndAssists){
                        $players[2] = $currentPlayer;
                        $playerThreeGoalsAndAssists = $currentPlayerGoalsAndAssists;
                    }
                }
            }
         }

        
        return $players;
    }

    public function getNextThreeMatches($teamId){

        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
            	'league' => '39',
	            'season' => $date->year,
                'team'=>$teamId,
                'next'=>3
                
        ]);

        $matches= $request->json();
        return $matches;

    }

    public function getRank($teamId){
        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/standings',[
            	'league' => '39',
	            'season' => $date->year,
                'team' => $teamId
                
        ]);

        $rank = $request->json();
        return $rank['response'][0]['league']['standings'][0][0]['rank'];
    }
    public function getStats2($id){

        $stats= [];

        $date = Carbon::now();
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/teams/statistics',[
                'season'=>$date->year,
                'team'=>$id,
                'league'=> 39
        ]);

        $teamStats  = $request->json();
        $stats['logo'] = $teamStats['response']['team']['logo'];
        $stats["goals_per_game"] = $teamStats['response']['goals']['for']['average']['total'];
        $stats["clean_sheets"] =$teamStats['response']['clean_sheet']['total'];
        $stats["goals_against_per_game"] = $teamStats['response']['goals']['against']['average']['total'];
        $stats['goals'] = $teamStats['response']['goals']['for']['total']['total'];
        $stats['goals_against'] = $teamStats['response']['goals']['against']['total']['total'];
        


        $standings = $this->getStandings();
        $totalGoals =0;
        $totalGoalsAgainst=0;
        $totalPoints=0;
        $points =0;

        $standingsArray = $standings['response'][0]['league']['standings'][0];

        foreach($standingsArray as $team){
            $totalGoals += $team['all']['goals']['for'];
            $totalGoalsAgainst+=$team['all']['goals']['against'];
            $totalPoints+=$team['points'];

            if($team['team']['id'] == $id){
                $points = $team['points'];
            }

        }

        $avgGoals = $totalGoals/20;
        $avgGoalsAgainst = $totalGoalsAgainst/20;
        $avgPoints = $totalPoints/20;
        $stats['points'] = $points;
        $stats['avgGoals'] = $avgGoals;
        $stats['avgGoalsAgainst'] = $avgGoalsAgainst;
        $stats['avgPoints']  = $avgPoints;


        return $stats;
    }



    

    

}
