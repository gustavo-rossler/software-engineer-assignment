<?php

namespace App\Http\Repositories;

use App\Models\Candidate;
use Illuminate\Support\Collection;

interface ICandidatesRepository
{
    /**
     * @param int $id
     * @return ?Candidate
     */
    public function find(int $id): ?Candidate;

    /**
     * @param array {
     *     offset: ?int,
     *     limit: ?int,
     *     sortColumn: ?string,
     *     sortDirection: ?string,
     *     search: ?string,
     * } $params
     * @return Collection
     */
    public function fetchAll(array $params): Collection;

    /**
     * @param array {
     *     id: ?int,
     *     name: string,
     *     email: string,
     *     phone: ?string,
     * } $data
     * @return ?Candidate
     */
    public function upsert(array $data): ?Candidate;
}
