import { useState, useRef } from "react"
import Cookies from 'js-cookie'
import { Loader, Upload } from "lucide-react"
import { Button } from "../ui/Button"
import { basedUrl } from "../../libs/basedUrl";
import { toast } from "sonner";
import ResultSection from "./ResultSection"

export default function ImageUploaderCustom() {
    const [predictData, setPredictData] = useState("");
    const fileInputRef = useRef(null);
    const token = Cookies.get("token");

    const [selectedFile, setSelectedFile] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (!file || !file.name.endsWith(".nii")) {
            toast.error("Please upload a .nii file only.");
            return;
        }
        setSelectedFile(file);
        toast.success("File selected. Now click Submit to upload.");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };


    const uploadFileInChunks = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${basedUrl}upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data, "data");
            setPredictData(data);
            toast.success(data?.data || "Upload complete");
            setSelectedFile('');
            fileInputRef.current.value = null;
        } catch (error) {
            toast.error("Upload failed. Please try again.");
            console.error(error);
        }
        setIsUploading(false);
    };


    const handleSubmit = async () => {
        if (!selectedFile) return;
        await uploadFileInChunks(selectedFile);
    };

    return (
        <>
            <div className="max-w-md mx-auto p-4 border rounded-lg">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".nii"
                    className="hidden"
                    onChange={handleFileChange}
                />
                {!selectedFile ? (
                    <>
                        <div
                            onClick={handleUploadClick}
                            onDrop={handleDrop}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer ${isUploading
                                ? "border-red-500 bg-red-50"
                                : dragActive
                                    ? "border-red-600 bg-red-100"
                                    : "border-gray-300"
                                }`}
                        >
                            <Upload className="h-10 w-10 text-red-500 mb-2 animate-bounce" />
                            <p className="text-sm text-gray-600 mb-2 text-center">
                                Drag & drop your CT file here, or click to select
                            </p>
                            <Button
                                className="bg-red-600 hover:bg-red-700"
                                type="button"
                                disabled={isUploading}
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload File
                            </Button>
                        </div>

                    </>
                ) : (
                    <>
                        < div className="space-y-4 w-full">
                            <div className="flex gap-2 justify-center">
                                <Button
                                    className="bg-red-600 hover:bg-red-700 w-full"
                                    onClick={handleSubmit}
                                    disabled={!selectedFile || isUploading}
                                >
                                    {isUploading ? (
                                        <Loader className="animate-spin w-5 h-5" />
                                    ) : (
                                        "Submit for Upload"
                                    )}
                                </Button>
                                <Button
                                    onClick={() => {
                                        fileInputRef.current.value = null;
                                        setSelectedFile('');
                                    }}
                                    disabled={!selectedFile || isUploading}
                                    variant="outline"
                                    className="border-red-600 text-red-600 hover:bg-red-50 w-full">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div >
            {predictData && <ResultSection predictData={predictData} setPredictData={setPredictData} />}
        </>
    )
}

