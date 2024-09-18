<?php

use App\Models\User;
// use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
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


    Route::post('/logout', function(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    });
// });

