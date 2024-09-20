<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SoccerApiController extends Controller
{


    public function getStandings(){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/standings',[
            	'league' => '39',
	            'season' => '2024'
        ]);

        return ($request);
    
    
    
    }
    
    public function home()
    {
        $request = $this->getStandings();
        return Inertia::render('Home',[
           'results'=> $request->json()
        ]);
        
    }
}
