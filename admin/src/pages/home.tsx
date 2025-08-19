import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";

export default function Home() {
  const {login, isLoading} = useAuth()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data)
  };

  return (
    <>
      <div className="auth min-h-[100dvh] w-full center flex-col gap-4">
        <div>
          <img src="/logo.svg" alt="Nomonics Logo" height={200} width={200} />
        </div>

        <form
          className="w-[90%] md:w-[480px] mx-auto bg-white rounded-4xl px-6 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-primary-2">Admin Login</h2>
            <p className="text-sm text-muted">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="mt-10 space-y-4">
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
            <ButtonWithLoader
              type="submit"
              initialText="Login"
              loadingText="Logging in..."
              className="w-full btn-primary h-11 rounded-full"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
}
