<?php

namespace App\Http\Repositories;

use App\Models\Disposition;
use Illuminate\Support\Collection;

class EloquentDispositionsRepository implements IDispositionsRepository
{
    /**
     * @param array {
     *     id: ?int,
     *     disposition: string,
     *     hire_type: ?string,
     *     fee: ?float,
     *     currency: ?string,
     *     rejection_reason: ?string,
     *     candidate_id: int,
     * } $data
     * @return ?Disposition
     */
    public function upsert(array $data): ?Disposition
    {
        // Clear old values
        $data['hire_type'] = $data['hire_type'] ?? null;
        $data['rejection_reason'] = $data['rejection_reason'] ?? '';

        return Disposition::updateOrCreate([
            'candidate_id' => $data['candidate_id'],
        ], $data);
    }
}
