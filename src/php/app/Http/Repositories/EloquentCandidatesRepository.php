<?php

namespace App\Http\Repositories;

use App\Models\Candidate;
use Illuminate\Support\Collection;

class EloquentCandidatesRepository implements ICandidatesRepository
{
    /**
     * @param int $id
     * @return ?Candidate
     */
    public function find(int $id): ?Candidate
    {
        return Candidate::find($id);
    }

    /**
     * @param array {
     *     offset: ?int,
     *     limit: ?int,
     * } $params
     * @return Collection
     */
    public function fetchAll(array $params): Collection
    {
        $result = Candidate::with(['disposition']);

        if (isset($params['limit'])) {
            $result->limit($params['limit']);
        }
        if (isset($params['offset'])) {
            $result->offset($params['offset']);
        }

        return $result->orderBy('created_at', 'desc')->get();
    }

    /**
     * @param array {
     *     id: ?int,
     *     name: string,
     *     email: string,
     *     phone: ?string,
     * } $data
     * @return ?Candidate
     */
    public function upsert(array $data): ?Candidate
    {
        return Candidate::updateOrCreate([
            'id' => $data['id'] ?? '',
        ], $data);
    }
}
