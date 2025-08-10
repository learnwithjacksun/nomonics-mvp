import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Register() {
  const { type } = useLocation().state as { type: string };
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [agreeToAge, setAgreeToAge] = useState(false);
  return (
    <AuthLayout
      title="Create Account"
      subtitle={`You are registering as a ${
        type.charAt(0).toUpperCase() + type.slice(1)
      }`}
    >
      <form className="space-y-4 h-full overflow-y-scroll hide-scrollbar">
        <div className="grid md:grid-cols-2 gap-4">
          <InputWithoutIcon
            type="text"
            label="Full Name"
            placeholder="e.g John Doe"
          />
          <InputWithoutIcon
            type="email"
            label="Email Address"
            placeholder="e.g john@gmail.com"
          />
       
          <InputWithoutIcon
            type="password"
            label="Password"
            placeholder="********"
          />
          
        
        <InputWithoutIcon
          type="password"
          label="Confirm Password"
          placeholder="********"
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
