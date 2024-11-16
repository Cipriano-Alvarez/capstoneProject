<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use App\Models\Bet;
use App\Models\Post;
use App\Models\ReportedPost;
use App\Models\Favorite;
use App\Models\Team;

class BetsController extends Controller
{
    public function __construct(){
        $this->TPL = [];
        $this->TPL['logged_in'] = true;
        $this->TPL['matches'] = $this->grabMatches();
        $this->TPL['chosenMatch'] = false;
        $this->TPL['allBets']=$this->grabAllBets();
    }

    public function grabAllBets(){
        $bets = [];
        
        if(Auth::check()){
            $user = Auth::user();
            $bets = Bet::where('user_id',$user->id)->latest()->paginate(5,["choice","outcome","fixture_id","id"]);
            $idsString = "";
            foreach($bets as $bet){

                if($bet["id"] == $bets[count($bets)-1]['id']){
                    $idsString = $idsString .(string) $bet["fixture_id"];
                }else{
                $idsString = $idsString .(string) $bet["fixture_id"] . "-";}

            }
            $games = $this->grabBetsInformation($idsString);
            foreach($games as $game){
                $winningTeam = "";
                $homeTeam = $game["teams"]["home"]["name"];
                $awayTeam = $game["teams"]["away"]["name"];
                $homeGoals = $game["goals"]["home"];
                $awayGoals = $game["goals"]["away"];
                if($homeGoals > $awayGoals && $game["fixture"]["status"]["short"] == "FT" ){
                    $winningTeam =  $game["teams"]["home"]["name"];
                }else if($homeGoals < $awayGoals && $game["fixture"]["status"]["short"] == "FT" ){
                    $winningTeam =  $game["teams"]["away"]["name"];
                }else if($homeGoals == $awayGoals && $game["fixture"]["status"]["short"] == "FT" ){
                    $winningTeam = "DRAW";
                }

                foreach($bets as $bet){
                    if($game['fixture']['id'] == $bet['fixture_id']){

                        if($bet["outcome"] == 'tbd'  && $game["fixture"]["status"]["short"] == "FT" ){
                            $updatedBet = Bet::where('id',$bet['id'])->first();
                            if($bet["choice"] == $winningTeam){
                                $updatedBet['outcome'] = "correct";
                                $bet["outcome"] = "correct";
                                $updatedBet->save();
                            }else{
                                $updatedBet['outcome'] = "incorrect";
                                $bet["outcome"] = "incorrect";
                                $updatedBet->save();
                            }
                        }

                        $bet["awayImg"] = $game["teams"]["away"]["logo"];
                        $bet["homeImg"] = $game["teams"]["home"]["logo"];
                        $bet["status"] = $game["fixture"]["status"]["short"];
                        $bet["homeGoals"] = $game["goals"]["home"];
                        $bet["awayGoals"] = $game["goals"]["away"];




                    }
                }
                
            }

        }
        return $bets;
    }

    public function grabBetsInformation($ids){

        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
            	'ids' =>$ids
        ]);

        $betsInformation = $request->json();

        return $betsInformation["response"];

    }

    public function Bets(){
        if(!Auth::check()){
            $this->TPL['logged_in'] = false;
        }

        return Inertia::render('BetsPages/Bets',$this->TPL);


    }

    public function grabMatches(){
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
        return $matches['response'];
    }

    public function GetMatch($id){
        if(Auth::check()){
            $this->TPL['odds'] = $this->getOdds($id);
            $this->TPL['fixture'] = $this->getFixture($id);
            $this->TPL['logged_in'] = true;
            $this->TPL['chosenMatch'] = true;
            $this->TPL['comments'] = $this->getComments($id);
            
            
            return Inertia::render('BetsPages/Bets',$this->TPL);
        }

        return redirect()->route('home');
    }

    public function getOdds($id){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/odds',[
            'fixture'=>$id,
            'bookmaker'=>8
        ]);

        $odds = $request->json()['response'];

        return $odds;

    }

    public function getFixture($id){
        $request = Http::withHeaders([
            'x-rapidapi-host' => 'v3.football.api-sports.io',
	        'x-rapidapi-key' => '5acf3f81fa9c79d04e7a990888463cfc'
        ])->get('https://v3.football.api-sports.io/fixtures',[
                'id'=>$id
        ]);

        $fixture = $request->json()['response'];
        return $fixture;
    }

    public function AddBet(Request $request){
        if(Auth::check()){
            $validated = $request->validate([
                'choice' =>['required'],
                'fixture' =>['required','integer']
            ]);
            $user = Auth::user();

            $bet = new Bet;
            $bet->user_id = $user->id;
            $bet->outcome = 'tbd';
            $bet->choice = $validated['choice'];
            $bet->fixture_id = $validated['fixture'];

            $bet->save();

        }else{
            return redirect()->route("home");
        }
    }
    public function AddComment(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $validated = $request->validate([
                'comment'=>["required","string"],
                'fixture'=>['required','integer']
            ]);
            $newReportedPost = new Post;
            $newReportedPost->user_id = $user->id;
            $newReportedPost->text = $validated['comment'];
            $newReportedPost->fixture_id = $validated['fixture'];

            $newReportedPost->save();
        }else{
            return redirect()->route("home");
        }
    }

    public function getComments($fixture){
        $comments = Post::where('fixture_id',$fixture)->latest('posts.created_at')->join('users','user_id','=','users.id')->paginate(5,['text','first_name','last_name' ,'user_id', 'posts.id']);
        return $comments;
    }

    public function DeletePost($id){
        if(Auth::check()){


            $validator =Validator::make(['id'=>$id],[
                'id'=>['integer']
            ]);
            $validated = $validator->validated();
            $post = Post::where('id',$id)->first();
            $post->delete();

        }else{
            return redirect()->route("home");
        }
    }

    public function AddReportedPost(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $validated = $request->validate([
                'user_id'=>["required","integer"],
                'comment_id'=>['required','integer']
            ]);
            $newReportedPost = new ReportedPost;
            $newReportedPost->user_id = $user->id;
            $newReportedPost->post_id  = $validated['comment_id'];

            $newReportedPost->save();
        }else{
            return redirect()->route("home");
        }
    }

    public function AddFavourite(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $validated = $request->validate([
                'team_id'=>["required","integer"]
            ]);
            $team = Team::where("prem_id",$validated['team_id'])->first();
            if(Favorite::where('team_id',$team->id)->where("user_id",$user->id)->doesntExist()){
                
                $newFav = new Favorite;
                $newFav->team_id = $team->id;
                $newFav->user_id = $user->id;
                $newFav->save();
            }


        }else{
            return redirect()->route("home");
        }
    }

}
