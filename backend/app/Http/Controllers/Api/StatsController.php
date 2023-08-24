<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Links;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $totalLinks = Links::where('users_id', Auth::user()->id)->count();
            $totalClicks = DB::table('links')
                            ->leftJoin('clicks', 'links.id', 'clicks.links_id')
                            ->where('links.users_id', Auth::user()->id)
                            ->sum('clicks.click');

            return response()->json([
                'links' => (int) $totalLinks,
                'clicks' => (int) $totalClicks,
            ], 200);
        } catch (\Exception $error) {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }

}
