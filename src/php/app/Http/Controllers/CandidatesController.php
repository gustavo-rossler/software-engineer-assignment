<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Repositories\ICandidatesRepository;
use App\Http\Requests\UpsertCandidateRequest;

class CandidatesController extends Controller
{
    public function __construct(
        private ICandidatesRepository $candidatesRepository,
    ) { }

    public function index(): JsonResponse
    {
        try {
            $candidates = $this->candidatesRepository->fetchAll([]);
            return response()->json([
                'candidates' => $candidates,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function upsert(UpsertCandidateRequest $request): JsonResponse
    {
        try {
            $data = $request->only('id', 'name', 'email', 'phone');
            $candidate = $this->candidatesRepository->upsert($data);
            return response()->json([
                'candidate' => $candidate,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ]);
        }
    }
}
