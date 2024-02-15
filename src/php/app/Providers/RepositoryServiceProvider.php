<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Repositories\ICandidatesRepository;
use App\Http\Repositories\EloquentCandidatesRepository;
use App\Http\Repositories\IDispositionsRepository;
use App\Http\Repositories\EloquentDispositionsRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            ICandidatesRepository::class,
            EloquentCandidatesRepository::class,
        );
        $this->app->bind(
            IDispositionsRepository::class,
            EloquentDispositionsRepository::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
