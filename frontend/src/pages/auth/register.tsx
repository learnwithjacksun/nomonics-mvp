import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterSchema, registerSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";


export default function Register() {
  const { registerUser, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "";
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [agreeToAge, setAgreeToAge] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterSchema) => {
    
    registerUser(data, agreeToMarketing, role.toLowerCase());
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle={`You are registering as a ${
        role.charAt(0).toUpperCase() + role.slice(1)
      }`}
    >
      <form className="space-y-4 h-full overflow-y-scroll hide-scrollbar" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <InputWithoutIcon
            type="text"
            label="Full Name"
            placeholder="e.g John Doe"
            {...register("name")}
            error={errors.name?.message}
          />
          <InputWithoutIcon
            type="email"
            label="Email Address"
            placeholder="e.g john@gmail.com"
            {...register("email")}
            error={errors.email?.message}
          />
       
          <InputWithoutIcon
            type="password"
            label="Password"
            placeholder="********"
            {...register("password")}
            error={errors.password?.message}
          />
          
        
        <InputWithoutIcon
          type="password"
          label="Confirm Password"
          placeholder="********"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        </div>
      
        <div className="space-y-4">
          
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              id="marketing"
              className="accent-primary-2 mt-1"
              checked={agreeToMarketing}
              onChange={() => setAgreeToMarketing(!agreeToMarketing)}
            />
            <label
              htmlFor="marketing"
              className="text-xs md:text-sm text-muted"
            >
              Send me special offers, learning tips, and personalized
              recommendations
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="age"
              className="accent-primary-2"
              checked={agreeToAge}
              onChange={() => setAgreeToAge(!agreeToAge)}
            />
            <label htmlFor="age" className="text-xs md:text-sm text-muted">
              You are above 18 years old?
            </label>
          </div>
        </div>
        <ButtonWithLoader
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
          initialText="Create Account"
          loadingText="Creating account..."
          loading={isLoading}
          disabled={isLoading}
        />

        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-2 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
