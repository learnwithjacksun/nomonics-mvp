import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function ForgotPassword() {
  const [showInfo, setShowInfo] = useState(false);
  const { forgotPassword, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  
  const onSubmit = async (data: ForgotPasswordSchema) => {
    const response = await forgotPassword(data);
    if (response) {
      setShowInfo(true);
      reset();
    } else {
      setShowInfo(false);
    }
  };
  
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
    >
      {showInfo && (
        <div className="bg-green-500/10 border border-green-600 p-4 rounded-md mb-4 text-green-600 font-medium">
          <p className="text-sm">A password reset link has been sent to your email</p>
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
      
        <ButtonWithLoader
          type="submit"
          initialText="Continue"
          loadingText="Sending..."
          loading={isLoading}
          className="w-full btn-primary h-10 rounded-full"
        />
      </form>
      <div className="text-center mt-4">
        <p className="text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-primary-2 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
