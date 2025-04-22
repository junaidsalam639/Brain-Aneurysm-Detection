import { useState } from "react"
import Cookies from 'js-cookie'
import { Loader, Menu, X } from "lucide-react"
import { Link } from "react-router"
import { Button } from "../ui/Button"
import { toast } from "sonner"
import { basedUrl } from "../../libs/basedUrl"

export default function Header() {
    const token = Cookies.get("token");
    const [loadingBtn, setBtnLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handlerLogout = async () => {
        try {
            setBtnLoading(true);
            const formData = new FormData();
            const response = await fetch(`${basedUrl}logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                Cookies.remove('token');
                toast.success("Logout Successfully");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
            } else {
                toast.error(data?.error || "Logout failed");
            }
            setBtnLoading(false);
        } catch (err) {
            console.error("Signup Error:", err);
            toast.error("Something went wrong");
            setBtnLoading(false);
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-600"
                    >
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    </svg>
                    <span className="font-bold text-red-600">Lilia-AI</span>
                </Link>
                <nav className="hidden md:flex md:items-center md:space-x-6">
                    <Link to="/" className="text-sm font-medium transition-colors hover:text-red-600">
                        Home
                    </Link>
                    <Link to="/contact" className="text-sm font-medium transition-colors hover:text-red-600">
                        Contact
                    </Link>
                    {token ? (
                        <>
                            <Link to="/" onClick={handlerLogout}>
                                <Button
                                    disabled={loadingBtn}
                                    className="bg-red-600 hover:bg-red-700">
                                    {loadingBtn && <Loader className="animate-spin w-5 h-5" />} Logout </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </nav>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
            {isMenuOpen && (
                <div className="container md:hidden">
                    <nav className="flex flex-col space-y-4 p-4 animate-fadeIn">
                        <Link to="/" className="text-sm font-medium transition-colors hover:text-red-600" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            className="text-sm font-medium transition-colors hover:text-red-600"
                            onClick={toggleMenu}
                        >
                            Contact
                        </Link>
                        {token ? (
                            <>
                                <Link to="/" onClick={handlerLogout}>
                                    <Button
                                        disabled={loadingBtn}
                                        className="bg-red-600 hover:bg-red-700">
                                        {loadingBtn && <Loader className="animate-spin w-5 h-5" />} Logout </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={toggleMenu}>
                                    <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" onClick={toggleMenu}>
                                    <Button className="w-full bg-red-600 hover:bg-red-700">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
