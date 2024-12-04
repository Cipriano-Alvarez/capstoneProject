<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Article;
class HomeController extends Controller
{


    public function __construct(){
        $this->TPL = [];
        $this->TPL["standings"] = $this->getStandings()->json();
        
    }

    public function getStandings(){
        try{
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/standings',[
            	'league' => '39',
	            'season' => '2024'
                
        ]);

        return ($request);}catch(Exception $e){
            return $e;
        }
    
    
    
    }
    
    public function home()
    {
        $request = $this->getStandings();
        return Inertia::render('Home',[
           'results'=> $this->TPL["standings"],
           'articles' => Article::paginate(5)
        ]);
        
    }
}
