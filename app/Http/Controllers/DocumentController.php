<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\User;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(auth()->user()->id); // Get the logged in user
        $documents = $user->documents; // This will fetch all documents related to the user
        return inertia('Document', ['documents' => $documents]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Document/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return $document;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
