import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Editor } from "primereact/editor";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function CreateDocument({ auth, document }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            title: document.title,
            description: document.description,
            user_id: document.user_id,
        });

    function submit(e) {
        e.preventDefault();
        put(`/document/${document.id}`, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Update Document
                </h2>
            }
        >
            <Head title="Update Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col">
                            <div className="mt-4 mb-4">
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <Editor
                                value={data.description}
                                onTextChange={(e) =>
                                    setData("description", e.textValue)
                                }
                                style={{ height: "320px" }}
                            />
                        </div>
                        <button
                            onClick={submit}
                            type="submit"
                            disabled={processing}
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
                        >
                            Update Document
                        </button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Document updated.
                            </p>
                        </Transition>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
