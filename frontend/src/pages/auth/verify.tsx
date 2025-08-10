import { ButtonWithLoader } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters in single input
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 5; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      
      // Focus the last filled input or first empty one
      const lastFilledIndex = Math.min(pastedData.length - 1, 4);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 5) {
      console.log("OTP submitted:", otpString);
      // Handle OTP verification here
    }
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <AuthLayout title="Verify Email" subtitle={`Enter the code sent to ${email}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-3">
         
          <div className="flex items-center md:gap-4 gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={setInputRef(index)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className=" h-11 md:h-12 md:w-12 w-11 text-center text-lg font-semibold border-2 border-line rounded-lg focus:border-primary-2 focus:outline-none bg-white text-main transition-colors"
                placeholder="0"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            You can paste the entire 5-digit code
          </p>
        </div>
        <ButtonWithLoader
          initialText="Verify"
          loadingText="Verifying..."
          type="submit"
          className="w-full btn-primary h-11 rounded-lg"
          disabled={otp.join("").length !== 5}
        />
      </form>
      <div className="text-center mt-4">
          <p className="text-sm text-muted">
            Didn't get the OTP?{" "}
            <span className="text-primary-2 font-semibold cursor-pointer">Resend</span>
          </p>
        </div>
    </AuthLayout>
  );
}
