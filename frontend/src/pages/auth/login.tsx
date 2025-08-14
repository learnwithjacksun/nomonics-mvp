import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchema, loginSchema } from "@/schemas/auth";

export default function Login() {
  const { login, loginInfo, setLoginInfo, isLoading } = useAuth();
  const [isRemember, setIsRemember] = useState(false);
  console.log(isRemember);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
    if (isRemember) {
      setLoginInfo({
        email: data.email,
        password: data.password,
      });
    }
    login(data);
  };

  useEffect(() => {
    if (loginInfo) {
      setIsRemember(true);
      reset({
        email: loginInfo.email,
        password: loginInfo.password,
      });
    }
  }, [loginInfo, reset]);

 
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputWithoutIcon
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              onChange={() => setIsRemember((prev) => !prev)}
              className="accent-primary-2"
            />
            <label htmlFor="remember" className="text-sm text-muted">
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary-2"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonWithLoader
          initialText="Login"
          loadingText="Logging in..."
          type="submit"
          loading={isLoading}
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
