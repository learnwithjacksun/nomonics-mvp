import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [isRemember, setIsRemember] = useState(false);
  console.log(isRemember);
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form className="space-y-4">
        <InputWithoutIcon
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <InputWithoutIcon
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" onChange={()=> setIsRemember(prev => !prev)} className="accent-primary-2" />
            <label htmlFor="remember" className="text-sm text-muted">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-primary-2">Forgot password?</Link>
        </div>
        <ButtonWithLoader
          initialText="Login"
          loadingText="Logging in..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg text-sm font-medium"
        />
      </form>
      <div className="text-center mt-4">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/role" className="text-primary-2 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
    </AuthLayout>
  );
}
