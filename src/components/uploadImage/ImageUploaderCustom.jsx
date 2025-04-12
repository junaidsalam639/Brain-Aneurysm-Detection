import { useState, useRef } from "react"
import { Upload, X, Check, ImageIcon } from "lucide-react"
import { Card, CardContent } from "../ui/Card"
import { Button } from "../ui/Button"

export default function ImageUploaderCustom() {
    const [image, setImage] = useState(null);
    const [imageBinary, setImageBinary] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageBinary(file);
        if (file) {
            setIsUploading(true)
            const reader = new FileReader()
            reader.onload = (event) => {
                setImage(event.target?.result)
                setIsUploading(false)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleSubmit = () => {
        console.log({
            image,
            imageBinary
        });
        if (!image) return

        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            alert("Image processed successfully! This is a demo.")
        }, 2000)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsUploading(true)

        const file = e.dataTransfer.files?.[0];
        setImageBinary(file);
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setImage(event.target?.result)
                setIsUploading(false)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsUploading(true)
    }

    const handleDragLeave = () => {
        setIsUploading(false)
    }

    const clearImage = () => {
        setImage(null);
        setImageBinary(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                {!image ? (
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isUploading ? "border-red-500 bg-red-50" : "border-gray-300"
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <Upload className="h-10 w-10 text-red-500 mb-2 animate-bounce" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop your image here, or click to select</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                            ref={fileInputRef}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button className="bg-red-600 hover:bg-red-700" type="button" onClick={handleUploadClick}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Image
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-white rounded-full"
                                onClick={clearImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <div className="text-center mb-2 text-sm text-gray-600">Image Preview</div>
                            <img
                                src={image || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-auto max-h-[300px] object-contain rounded-lg animate-fadeIn border border-gray-200"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleSubmit} disabled={isProcessing}>
                                {isProcessing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit for Analysis <Check className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
