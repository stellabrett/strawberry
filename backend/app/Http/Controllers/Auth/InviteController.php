<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\InviteMail;
use Illuminate\Auth\Events\Registered;

class InviteController extends Controller
{
    public function invite(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make(str_random(8)), // Generate a random password
        ]);

        // Send invitation email
        Mail::to($user->email)->send(new InviteMail($user));

        return response()->json(['message' => 'Invitation sent!'], 201);
    }
}
