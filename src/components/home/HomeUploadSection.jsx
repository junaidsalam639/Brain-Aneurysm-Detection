import ImageUploaderCustom from "../uploadImage/ImageUploaderCustom";

export default function HomeUploadSection() {
    return (
        <>
            <section id="upload-section" className="w-full py-12 md:py-24 bg-gray-50 min-h-screen">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-red-600">Upload Your Scan</h2>
                            <p className="max-w-[700px] text-gray-700 md:text-xl">
                                Upload your Head CT for instant analysis. Our system will process your CT and provide
                                preliminary results.
                            </p>
                        </div>
                        <div className="w-full container mx-auto md:px-20">
                            <ImageUploaderCustom />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}