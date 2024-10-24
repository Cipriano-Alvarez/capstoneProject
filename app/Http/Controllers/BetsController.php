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

class BetsController extends Controller
{
    public function __construct(){
        $this->TPL = [];
        $this->TPL['logged_in'] = true;
    }

    public function Bets(){
        if(!Auth::check()){
            $this->TPL['logged_in'] = false;
        }

        return Inertia::render('BetsPages/Bets',$this->TPL);


    }
}
