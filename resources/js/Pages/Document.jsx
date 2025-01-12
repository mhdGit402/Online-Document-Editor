import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Document({ auth, documents }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Document
                </h2>
            }
        >
            <Head title="Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <Link href={route("document.create")}>
                            <button
                                type="button"
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
                            >
                                Add Document
                            </button>
                        </Link>
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col">
                            {documents &&
                                documents.map((document) => (
                                    <div
                                        key={document.id}
                                        className="flex-grow p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4" // Added margin for spacing
                                    >
                                        <span>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {document.title}
                                            </h5>
                                        </span>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            {document.description}
                                        </p>
                                        <Link
                                            href={route("document.show", {
                                                document: document,
                                            })}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Read more
                                            <svg
                                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
