import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export default function NewPassword() {
  const { resetPassword, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("token");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  
  const onSubmit = (data: ResetPasswordSchema) => {
    if (!userId) {
      toast.error("Invalid reset link");
      return;
    }
    resetPassword(data, userId);
  };
  
  return (
    <AuthLayout title="New Password" subtitle="Enter your new password">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithoutIcon
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <InputWithoutIcon
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <ButtonWithLoader
          type="submit"
          initialText="Continue"
          loadingText="Changing..."
          loading={isLoading}
          className="w-full btn-primary h-10 rounded-full"
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
