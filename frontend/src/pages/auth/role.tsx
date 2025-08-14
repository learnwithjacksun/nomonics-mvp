import { ButtonWithLoader } from "@/components/ui";
import { accountTypes } from "@/constants/data";
import { AuthLayout } from "@/layouts";
import { CircleCheck, Circle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Role() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      setLoading(true);
      setTimeout(() => {
        navigate(`/register?role=${selectedType.toLowerCase()}`);
      }, 1000);
    }
  };
  return (
    <AuthLayout title="Account Type" subtitle="Choose your account type to continue">
      <div className="space-y-4">
        {accountTypes.map((type) => (
          <div
            key={type.label}
            className={`flex cursor-pointer items-center justify-between gap-6 border border-line rounded-lg p-4 ${
              selectedType === type.label ? "bg-foreground border-primary-2" : ""
            }`}
            onClick={() => handleSelectType(type.label)}
          >
            <div className="space-y-1">
              <h2 className="text-md font-medium capitalize">{type.label}</h2>
              <p className="text-xs md:text-sm text-muted">
                {type.description}
              </p>
            </div>

            {selectedType === type.label ? (
              <CircleCheck size={20} className="flex-shrink-0 text-primary-2" />
            ) : (
              <Circle size={20} className="flex-shrink-0 text-muted" />
            )}
          </div>
        ))}

        <ButtonWithLoader
          type="button"
          disabled={!selectedType}
          className="w-full btn-primary h-11 rounded-lg"
          initialText="Continue"
          loadingText="Loading..."
          onClick={handleContinue}
          loading={loading}
        />
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-2 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
