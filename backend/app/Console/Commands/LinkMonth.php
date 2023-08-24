<?php

namespace App\Console\Commands;

use App\Models\Clicks;
use Illuminate\Console\Command;

class LinkMonth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'link:month';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Clicks::query()->update(['click' => 0]);
    }
}
