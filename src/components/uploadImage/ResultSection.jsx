/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ResultSection({ predictData }) {
    const [showText, setShowText] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [displayedText, setDisplayedText] = useState("");
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    const handleRadioClick = () => {
        setShowText(!showText);
        setDisplayedText("");
    };

    const handleShowImages = () => {
        setShowImages(!showImages);
    };

    const rawHtml = predictData?.report || "";
    const cleanedHtml = rawHtml?.replace(/^```html\s*/i, "")?.replace(/```$/i, "");

    useEffect(() => {
        if (showText && cleanedHtml) {
            let index = 0;
            let tempText = '';
            const interval = setInterval(() => {
                tempText += cleanedHtml.charAt(index);
                setDisplayedText(tempText);
                index++;
                if (index === cleanedHtml?.length) {
                    clearInterval(interval);
                    setIsAnimationComplete(true);
                }
            }, 10);
            return () => clearInterval(interval);
        }
    }, [showText, cleanedHtml]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <h2 className="text-2xl font-semibold text-red-600">Prediction: {predictData?.prediction}</h2>
            <h2 className="text-2xl font-semibold text-red-600">Confidence Score: {predictData?.confidence}</h2>

            <div>
                <Button className="bg-red-600 w-full hover:bg-red-700" onClick={handleRadioClick}>
                    {showText ? 'Hide Radiologist Report' : 'Get Radiologist Report'}
                </Button>
                {showText && <div className="div-h2">
                    {isAnimationComplete ? (
                        <motion.div
                            className="text-md text-start text-gray-600 mt-4 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                        />
                    ) : (
                        <motion.div
                            className="text-md text-start text-gray-600 mt-4 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            dangerouslySetInnerHTML={{ __html: displayedText }}
                        />
                    )}
                </div>}
            </div>

            <div>
                <Button className="bg-red-600 w-full hover:bg-red-700" onClick={handleShowImages}>
                    {showImages ? 'Hide Images' : 'Show Images'}
                </Button>
                {showImages && <div className="grid grid-cols-4 gap-2 mt-4">
                    {predictData?.frames?.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Prediction image ${i + 1}`}
                            width={100}
                            height={100}
                            className="cursor-pointer rounded-md border"
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg relative max-w-2xl w-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <button
                            onClick={() => {
                                const currentIndex = predictData?.frames?.indexOf(selectedImage);
                                const prevIndex =
                                    (currentIndex - 1 + predictData?.frames?.length) %
                                    predictData?.frames?.length;
                                setSelectedImage(predictData?.frames[prevIndex]);
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-red-600"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="rounded-lg mx-auto w-full max-h-[80vh] object-contain"
                        />
                        <button
                            onClick={() => {
                                const currentIndex = predictData?.frames?.indexOf(selectedImage);
                                const nextIndex = (currentIndex + 1) % predictData?.frames?.length;
                                setSelectedImage(predictData?.frames[nextIndex]);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-red-600"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};
