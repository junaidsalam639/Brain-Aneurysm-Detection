import { Upload } from "lucide-react";

export default function HomeHowitswork() {
    return (
        <>
            <section className="w-full py-12 md:py-24 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-red-600">How It Works</h2>
                            <p className="max-w-[700px] text-gray-700 md:text-xl">
                                Our advanced AI system analyzes Head CT's to detect potential brain aneurysms with high accuracy.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md animate-fadeInUp">
                            <div className="mb-4 text-red-600 flex justify-center">
                                <Upload className="h-10 w-10" />
                            </div>
                            <h3 className="text-lg font-bold text-red-600">Upload</h3>
                            <p className="text-sm text-gray-600">Upload your Head CT securely to our platform.</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md animate-fadeInUp animation-delay-200">
                            <div className="mb-4 text-red-600 flex justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-10 w-10"
                                >
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
                                    <path d="M5 21h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-red-600">Process</h3>
                            <p className="text-sm text-gray-600">Our AI analyzes the Head CT using advanced algorithms.</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md animate-fadeInUp animation-delay-400">
                            <div className="mb-4 text-red-600 flex justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-10 w-10"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-red-600">Results</h3>
                            <p className="text-sm text-gray-600">Receive preliminary results and recommendations.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}