<?php

use App\Models\User;
// use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

// Route::group(['middleware'=>'auth:sanctum'], function(){
    Route::post('/test-csrf', fn () =>[1, 2, 3]);
    Route::get('/user', function (Request $request) {

        return response()->json(['email' => $request->user()->email]);
    });
    Route::post('/login',function(Request $request){
        $request->validate([
            'email' => ['email', 'required'],
            'password' => ['required'],
            'deviceInfo' => ['required']
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            throw ValidationException::withMessages([
                'email' => 'the provided credentials are invalid'
            ]);
        }

        return response()->json([
              'token' =>$user->createToken($request->deviceInfo)->plainTextToken
        ]);
    });

    Route::post('/register',function(Request $request){
        
        $request->validate([
            'role' => 'required|string|max:255',
            'deviceInfo' => 'required|string|max:255',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'countryCode' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'role' => $request->role,
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'phone' => $request->phone,
            'countryCode' => $request->countryCode,
            'city' => $request->city,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'token' =>$user->createToken($request->deviceInfo)->plainTextToken
      ]);

    }
        
);


    Route::post('/logout', function(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    });
// });

