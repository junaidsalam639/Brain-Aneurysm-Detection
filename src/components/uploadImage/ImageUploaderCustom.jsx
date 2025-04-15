import { useState, useRef } from "react"
import Cookies from 'js-cookie'
import { Loader, Upload } from "lucide-react"
import { Card, CardContent } from "../ui/Card"
import { Button } from "../ui/Button"
import { basedUrl } from "../../libs/basedUrl";
import { toast } from "sonner";
import ResultSection from "./ResultSection"

export default function ImageUploaderCustom() {
    const [image, setImage] = useState(null);
    const token = Cookies.get("token");
    const [imageBinary, setImageBinary] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef(null);
    const [predictData, setPredictData] = useState("");

    const handleSubmit = async () => {
        if (!image) return
        try {
            setIsProcessing(true);
            const formData = new FormData();
            formData.append("file", imageBinary);
            const response = await fetch(`${basedUrl}predict`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            setPredictData(data);
            if (response.ok) {
                toast.success(data?.message || "Predict Successfully");
            } else {
                toast.error(data?.error || "Predict failed");
            }
            setIsProcessing(false);
            setImage(null);
            setImageBinary(null);
        } catch (err) {
            console.error("Signup Error:", err);
            toast.error("Something went wrong");
            setIsProcessing(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsUploading(true);

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.name.endsWith(".nii")) {
            toast("Please upload a .nii file only.");
            setIsUploading(false);
            return;
        }
        setImageBinary(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result);
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };


    const handleDragOver = (e) => {
        e.preventDefault()
        setIsUploading(true)
    }

    const handleDragLeave = () => {
        setIsUploading(false)
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.name.endsWith(".nii")) {
            toast("Please upload a .nii file only.");
            return;
        }
        setIsUploading(true);
        setImageBinary(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result);
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };


    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <>
            {!image ? (
                <Card className="mx-auto max-w-md">
                    <CardContent className="p-6">
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isUploading ? "border-red-500 bg-red-50" : "border-gray-300"
                                }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <Upload className="h-10 w-10 text-red-500 mb-2 animate-bounce" />
                            <p className="text-sm text-gray-600 mb-2">Drag and drop your CT here, or click to select</p>
                            <input
                                type="file"
                                accept=".nii"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                                ref={fileInputRef}
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button className="bg-red-600 hover:bg-red-700" type="button" onClick={handleUploadClick}>
                                    {isUploading ? <Loader className="animate-spin w-5 h-5" /> : <Upload className="mr-2 h-4 w-4" />}
                                    Upload File
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    <div className="flex gap-2 justify-center">
                        <Button className="bg-red-600 hover:bg-red-700" onClick={handleSubmit}
                            disabled={isProcessing}>
                            {isProcessing && <Loader className="animate-spin w-5 h-5" />} Submit for Analysis
                        </Button>
                        <Button
                            onClick={() => {
                                setImage(null);
                                setImageBinary(null);
                            }}
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-50">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {predictData && <ResultSection predictData={predictData} />}
        </>
    )
}





// const ChunkUpload = () => {
//     const fileInputRef = useRef(null);
//     const token = Cookies.get("token");
//     const [isUploading, setIsUploading] = useState(false);
//     const maxChunkSize = 10 * 1024 * 1024; // 10MB
//     const [uploadProgress, setUploadProgress] = useState(0);

//     const handleUploadClick = () => {
//         fileInputRef.current?.click();
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files?.[0];
//         if (!file || !file.name.endsWith(".nii")) {
//             toast.error("Please upload a .nii file only.");
//             return;
//         }
//         uploadFileInChunks(file);
//     };

//     const uploadFileInChunks = async (file) => {
//         setIsUploading(true);
//         setUploadProgress(0);

//         let start = 0;
//         let end = maxChunkSize;

//         while (start < file.size) {
//             const chunk = file.slice(start, end);
//             const formData = new FormData();
//             const isLastChunk = end >= file.size ? 1 : 0;
//             formData.append("file", chunk);

//             try {
//                 const response = await fetch(`${basedUrl}predict`, {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: formData,
//                 });
//                 if (!response.ok) {
//                     throw new Error("Chunk upload failed");
//                 }

//                 const data = await response.json();
//                 const uploadedChunk = end > file.size ? file.size : end;
//                 const percent = Math.round((uploadedChunk / file.size) * 100);
//                 setUploadProgress(percent);

//                 if (isLastChunk) {
//                     toast.success(data.data || "Upload complete");
//                 }

//                 start = end + 1;
//                 end = start + maxChunkSize;
//             } catch (error) {
//                 toast.error("Upload failed. Please try again.");
//                 console.error(error);
//                 break;
//             }
//         }
//         setIsUploading(false);
//     };

//     return (
//         <div className="max-w-md mx-auto p-4 border rounded-lg">
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".nii"
//                 className="hidden"
//                 onChange={handleFileChange}
//             />
//             <div
//                 className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isUploading ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//             >
//                 <Upload className="h-10 w-10 text-red-500 mb-2 animate-bounce" />
//                 <p className="text-sm text-gray-600 mb-2">
//                     Drag and drop your CT here, or click to select
//                 </p>
//                 <Button
//                     className="bg-red-600 hover:bg-red-700"
//                     type="button"
//                     onClick={handleUploadClick}
//                     disabled={isUploading}
//                 >
//                     {isUploading ? (
//                         <Loader className="animate-spin w-5 h-5" />
//                     ) : (
//                         <>
//                             <Upload className="mr-2 h-4 w-4" />
//                             Upload File
//                         </>
//                     )}
//                 </Button>
//                 {isUploading && (
//                     <div className="w-full mt-4">
//                         <div className="w-full bg-gray-200 rounded-full h-3">
//                             <div
//                                 className="bg-red-500 h-3 rounded-full transition-all"
//                                 style={{ width: `${uploadProgress}%` }}
//                             ></div>
//                         </div>
//                         <p className="text-sm mt-1 text-center">{uploadProgress}%</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

