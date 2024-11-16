<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Http;
use App\Models\Bet;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function (){
    $date = Carbon::today()->tz("America/Toronto");
    //$date= $date->setTimezone('American/Toronto');
    
    $request = Http::withHeaders([
        'x-rapidapi-host' => 'v3.football.api-sports.io',
        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
    ])->get('https://v3.football.api-sports.io/fixtures',[
            'league' => '39',
            'season' =>$date->year,
            'date' => $date->toDateString()
    ]);
    $matches = $request->json(); 
    var_dump($matches['response']);
    if(count($matches["response"]) > 0){
        
        foreach($matches["response"] as $match){
            $bets = Bet::where('fixture_id',$match['fixture']['id'])->where('outcome','tbd')->get();

            $winningTeam = "";
            $homeTeam = $match["teams"]["home"]["name"];
            $awayTeam = $match["teams"]["away"]["name"];
            $homeGoals = $match["goals"]["home"];
            $awayGoals = $match["goals"]["away"];
            if($homeGoals > $awayGoals && $match["fixture"]["status"]["short"] == "FT" ){
                $winningTeam =  $match["teams"]["home"]["name"];
            }else if($homeGoals < $awayGoals && $match["fixture"]["status"]["short"] == "FT" ){
                $winningTeam =  $match["teams"]["away"]["name"];
            }else if($homeGoals == $awayGoals && $match["fixture"]["status"]["short"] == "FT" ){
                $winningTeam = "DRAW";
            }

            if($match["fixture"]["status"]["short"] == "FT" ){
                    foreach($bets as $bet){
                        if($bet->choice == $winningTeam){
                            $bet->outcome = "correct";
                        }else{
                            $bet->outcome = "incorrect";
                        }

                        $bet->save();
                }
            }
        }
    }
})->daily("18:00");

