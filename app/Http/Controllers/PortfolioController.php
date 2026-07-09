<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Inertia\Inertia;

use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * Display a listing of published portfolios.
     */
    public function index(Request $request)
    {
        $query = Portfolio::where('is_published', true)
            ->latest('published_at');

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json($query->paginate(6));
        }

        return Inertia::render('Portfolio/Index', [
            'portfolios' => $query->paginate(6)
        ]);
    }
}
