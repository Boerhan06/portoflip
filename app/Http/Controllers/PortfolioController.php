<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of published portfolios.
     */
    public function index()
    {
        $portfolios = Portfolio::where('is_published', true)
            ->latest('published_at')
            ->get();

        return Inertia::render('Portfolio/Index', [
            'portfolios' => $portfolios
        ]);
    }
}
