<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id');
        return [
            'title' => fake()->sentence(),
            'description' => fake()->text(200),
            'share_url' => env('APP_URL') . '/share/' . $this->generateRandomString(10),
            'user_id' => $users->random(),
        ];
    }
    /**
     * Generate a random string of a given length.
     *
     * @param int $length
     * @return string
     */
    private function generateRandomString($length = 10)
    {
        return substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, $length);
    }
}
