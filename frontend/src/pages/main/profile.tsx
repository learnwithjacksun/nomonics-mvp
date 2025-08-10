import { Box, ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { MainLayout } from "@/layouts";

export default function Profile() {
  return (
    <MainLayout>
        <div className="w-full md:w-[900px] mx-auto main mt-10 space-y-4">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
              My Profile
            </h1>
            <p className="text-muted">
              Manage your profile details
            </p>
          </div>

          <form>
            <Box>
                <div className="center mb-6">
                    <label htmlFor="image">
                        <input type="file" id="image" className="hidden" />
                        <div className="h-30 w-30 rounded-full overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=John+Doe&background=4b2e00&color=fff" alt="" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-sm text-center text-muted mt-4">Click to Change</p>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputWithoutIcon label="Name" type="text" placeholder="e.g. John Doe" />
                    <InputWithoutIcon label="Email" type="email" placeholder="e.g. john.doe@example.com" />
                    <InputWithoutIcon label="Phone" type="tel" placeholder="e.g. +1234567890" />
                    <InputWithoutIcon label="Address" type="text" placeholder="e.g. 123 Main St, Anytown, USA" />
                    <InputWithoutIcon label="City" type="text" placeholder="e.g. Anytown" />
                    <InputWithoutIcon label="State" type="text" placeholder="e.g. CA" />
                    <InputWithoutIcon label="Gender" type="text" placeholder="e.g. Male or Female" />
                    <InputWithoutIcon label="Date of Birth" type="date"  />
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
  )
}
