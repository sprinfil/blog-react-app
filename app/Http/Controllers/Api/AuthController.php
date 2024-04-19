<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        /**@var \App\Models\User $user */
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                "message" => "tus credenciales no son correctas",
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken("main")->plainTextToken;

        return response(compact("user","token"));
    }

    public function signup(SignupRequest $request){
        /**@var \App\Models\User $user */
        $data = $request->validated();
        $user = User::create([
      
            "name"=>$data["name"],
            "email"=>$data["email"],
            "password"=>bcrypt($data["password"]),
        ]);

        $token = $user->createToken("main")->plainTextToken;

        return response(compact("user","token"));
    }

    public function logout(Request $request){
        /**@var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response("", 204);
    }
}
