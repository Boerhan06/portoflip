<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    /**
     * Display a listing of published portfolios via API.
     */
    public function index(): JsonResponse
    {
        $portfolios = Portfolio::where('is_published', true)
            ->latest('published_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $portfolios
        ]);
    }
}
