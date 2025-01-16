<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use AshAllenDesign\ShortURL\Facades\ShortURL;
use AshAllenDesign\ShortURL\Models\ShortURL as ShortURLModel;
use Illuminate\Support\Facades\DB;

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
        return inertia('Document/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        // Start a database transaction
        $document = DB::transaction(function () use ($request) {
            // Create the document with validated data
            $document = Document::create($request->validated());

            // Generate the shareable URL dynamically
            $shareableUrl = $this->generateShareLink($document->id);

            // Append the shareable URL value to the document during creation
            $document->share_url = $shareableUrl;

            // Save the document with the appended share_url
            $document->save();

            // Return the document instance
            return $document;
        });

        // Redirect to the document show page after transaction
        return redirect()->route('document.show', ['document' => $document->id])->with('document', $document);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return inertia('Document/View', ['document' => $document]);
    }

    protected function generateShareLink($documentID)
    {
        // Generate the encrypted payload
        $payload = [
            'document_id' => $documentID,
        ];
        $encryptedLink = Crypt::encrypt(json_encode($payload));

        // Create the destination URL
        $fullUrl = url('/share/' . $encryptedLink);

        // Create a shortened URL
        $shortURLObject = ShortURL::destinationUrl($fullUrl)->make();

        // Retrieve the shortened URL
        return $shortURLObject->default_short_url;
    }

    public function share($shortUrlKey)
    {

        $shortURL = ShortURLModel::findByKey($shortUrlKey);

        $encryptedURL = $shortURL->destination_url;

        $encryptedLink = basename(parse_url($encryptedURL, PHP_URL_PATH));
        // return $encryptedLink;

        $decryptedPayload = json_decode(Crypt::decrypt($encryptedLink), true);

        // Find the document by ID
        $document = Document::findOrFail($decryptedPayload['document_id']);

        return redirect()->route('document.show', ['document' => $document->id])->with('document', $document);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        return inertia('Document/Edit', ['document' => $document]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $document->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();
    }
}
