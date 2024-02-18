<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Repositories\IDispositionsRepository;
use App\Http\Requests\UpsertDispositionRequest;

class DispositionsController extends Controller
{
    public function __construct(
        private IDispositionsRepository $dispositionsRepository,
    ) { }

    public function find(int $id): JsonResponse
    {
        try {
            $disposition = $this->dispositionsRepository->find($id);
            if (!$disposition) {
                throw new \Exception('Disposition not found.');
            }
            return response()->json([
                'disposition' => $disposition,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function upsert(UpsertDispositionRequest $request): JsonResponse
    {
        try {
            $data = $request->only(
                'candidate_id',
                'disposition',
                'hire_type',
                'fee',
                'currency',
                'rejection_reason'
            );
            $disposition = $this->dispositionsRepository->upsert($data);
            return response()->json([
                'disposition' => $disposition,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
            ]);
        }
    }
}
