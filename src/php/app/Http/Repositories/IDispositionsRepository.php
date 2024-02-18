<?php

namespace App\Http\Repositories;

use App\Models\Disposition;
use Illuminate\Support\Collection;

interface IDispositionsRepository
{
    /**
     * @param array {
     *     id: ?int,
     *     disposition: string,
     *     hire_type: ?string,
     *     fee: ?float,
     *     currency: ?string,
     *     rejection_reason: ?string,
     * } $data
     * @return ?Disposition
     */
    public function upsert(array $data): ?Disposition;

    /**
     * @param int $id
     * @return ?Disposition
     */
    public function find(int $id): ?Disposition;
}
