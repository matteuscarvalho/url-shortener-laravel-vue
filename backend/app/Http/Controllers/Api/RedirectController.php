<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Links;
use Illuminate\Support\Facades\Auth;

class RedirectController extends Controller
{
    public function redirect($code)
    {
        try {
            $link = Links::where('code', $code)->where('users_id', Auth::user()->id)->firstOrFail();

            $link->click()->increment('click');

            return response()->json(['url' => $link->url]);

        } catch (\Exception $e)  {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }
}
