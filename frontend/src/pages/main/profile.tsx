import { Box, ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { MainLayout } from "@/layouts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileSchema } from "@/schemas/profile";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";

export default function Profile() {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileSchema) => {
    console.log(data, image);
  };
  useEffect(()=>{
if(user){
  reset({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    dob: user.dob?.toString().split('T')[0] || "",
    gender: user.gender,
  })
}
  },[reset, user])

  return (
    <MainLayout>
      <div className="w-full md:w-[900px] mx-auto main mt-10 space-y-4">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
            My Profile
          </h1>
          <p className="text-muted">Manage your profile details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <div className="center mb-6">
              <label htmlFor="image">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="h-30 w-30 rounded-full overflow-hidden bg-blue-300">
                  <img
                    src={
                      previewImage ||
                      `https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}` ||
                      user?.image
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-center text-muted mt-4">
                  Click to Change
                </p>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithoutIcon
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                {...register("name")}
                error={errors.name?.message}
              />
              <InputWithoutIcon
                label="Email"
                type="email"
                placeholder="e.g. john.doe@example.com"
                {...register("email")}
                error={errors.email?.message}
              />
              <InputWithoutIcon
                label="Phone"
                type="tel"
                placeholder="e.g. +1234567890"
                {...register("phone")}
                error={errors.phone?.message}
              />
              <InputWithoutIcon
                label="Address"
                type="text"
                placeholder="e.g. 123 Main St, Anytown, USA"
                {...register("address")}
                error={errors.address?.message}
              />
              <InputWithoutIcon
                label="City"
                type="text"
                placeholder="e.g. Anytown"
                {...register("city")}
                error={errors.city?.message}
              />
              <InputWithoutIcon
                label="State"
                type="text"
                placeholder="e.g. CA"
                {...register("state")}
                error={errors.state?.message}
              />
              <InputWithoutIcon
                label="Gender"
                type="text"
                placeholder="e.g. Male or Female"
                {...register("gender")}
                error={errors.gender?.message}
              />
              <InputWithoutIcon
                label="Date of Birth"
                type="date"
                {...register("dob")}
                error={errors.dob?.message}
              />
            </div>
          </Box>
          <ButtonWithLoader
            type="submit"
            initialText="Save Changes"
            loadingText="Saving..."
            className="w-full mt-4 btn-primary h-11 rounded-lg"
          />
        </form>
      </div>
    </MainLayout>
  );
}
