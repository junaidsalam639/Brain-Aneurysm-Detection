import { ArrowRight } from "lucide-react"
import { Button } from "../ui/Button"
import { Link } from "react-router"
import Cookies from 'js-cookie'

export default function HomeHeroSection() {
    const token = Cookies.get("token");
    return (
        <>

            <section className="w-full py-12 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">
                                Medical Imaging Analysis
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-red-600">
                                Brain Aneurysm Detection
                            </h1>
                            <p className="text-gray-700 md:text-xl">
                                Early detection saves lives. Our advanced AI system helps identify potential brain aneurysms from
                                medical imaging with high accuracy.
                            </p>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link to={token ? "/dashboard" : "/login"}>
                                    <Button className="bg-red-600 hover:bg-red-700 md:w-40 w-full">
                                        Upload File <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline" className="md:w-40 w-full border-red-600 text-red-600 hover:bg-red-50">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative lg:order-last">
                            <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg animate-fadeIn">
                                <img
                                    src="/assets/brain.webp"
                                    alt="Brain scan visualization"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

