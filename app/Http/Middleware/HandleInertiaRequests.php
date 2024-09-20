<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {


        if(Auth::check()){
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()->only('first_name',"last_name","id"),
            ],
        ];}else{
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
            ];
        }
    }
}
