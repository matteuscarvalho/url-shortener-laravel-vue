<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Http\Resources\LinkResource;
use App\Models\Links;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $links = Links::with('click')->when($request->input('search'), function ($query) use ($request) {
            return $query->where('title', 'like', '%' . $request->input('search') . '%')
                    ->orWhere('url', 'like', '%' . $request->input('search') . '%')
                    ->orWhere('code', 'like', '%' . $request->input('search') . '%');
        })->where('users_id', Auth::user()->id)
        ->orderBy('id', 'desc')
        ->paginate($request->input('per_page', 10), ['*'], 'page', $request->input('page', 1));

        return LinkResource::collection($links);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLinkRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $link = Links::create([
                    'title' => $request->title,
                    'url' => $request->url,
                    'code' => $request->code ?? Str::random(8),
                    'users_id' => Auth::user()->id
                ]);

                $link->click()->create([
                    'click' => 0,
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                ]);

                return new LinkResource($link);
            });
        } catch (\Exception $e) {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Links $link, string $id)
    {
        try {
            $link = Links::where('users_id', Auth::user()->id)->FindOrFail($id);
            return new LinkResource($link);
        } catch (\Exception $e) {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkRequest $request, Links $link, string $id)
    {
        try {

            $link = Links::where('users_id', Auth::user()->id)->findOrFail($id);
            $link->update($request->validated());

            return new LinkResource($link);
        } catch (\Exception $e) {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Links $link, $id)
    {
        try {
            $link = Links::where('users_id', Auth::user()->id)->findOrFail($id);
            $link->delete();

            return response()->json([
                'status' => '200',
                'message' => 'Link deletado com sucesso.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => '400',
                'message' => 'Ocorreu um erro.',
            ], 400);
        }
    }
}
