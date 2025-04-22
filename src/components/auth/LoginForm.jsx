import { Link, useNavigate } from "react-router";
import Cookies from 'js-cookie'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { basedUrl } from "../../libs/basedUrl";

export default function LoginForm() {
  const [loadingBtn, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setBtnLoading(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        const response = await fetch(`${basedUrl}login`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          Cookies.set('token', data?.token, { expires: 7 })
          toast.success(data?.message || "Login Successfully");
          navigate("/dashboard");
        } else {
          toast.error(data?.error || "Login failed");
        }
        setBtnLoading(false);
      } catch (err) {
        console.error("Signup Error:", err);
        toast.error("Something went wrong");
        setBtnLoading(false);
      }
    },
  });

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-md animate-fadeIn">
        <form onSubmit={formik.handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-red-600">Login to Your Account</CardTitle>
            <CardDescription className="text-center">
              Enter your username and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-red-600">{formik.errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="#" className="text-xs text-red-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loadingBtn}
              className="w-full bg-red-600 hover:bg-red-700">
              {loadingBtn && <Loader className="animate-spin w-5 h-5" />} Sign In
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-red-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

