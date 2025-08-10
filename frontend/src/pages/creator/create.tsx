import {
  ButtonWithLoader,
  ImageUploader,
  InputWithoutIcon,
  MultiSelect,
  PdfUploader,
  SelectWithoutIcon,
} from "@/components/ui";
import { comicCategories } from "@/constants/data";
import { MainLayout } from "@/layouts";
import { CloudUpload, Sparkle, Star } from "lucide-react";
import { useState } from "react";

export default function Create() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  return (
    <>
      <MainLayout>
        <div className="w-full md:w-[900px] mx-auto main mt-10 space-y-4">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
              Upload Comic
            </h1>
            <p className="text-muted">
              Upload your comic to the platform as free or paid
            </p>
          </div>

          <form>
            <div className="border border-line bg-background px-6 pt-4 pb-6 shadow-xl mt-4 rounded-lg">
              <p className="text-lg text-primary-2 font-semibold flex items-center gap-2">
                <Sparkle size={20} className="text-primary-2" /> Comic Format/
                Type
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <SelectWithoutIcon
                  label="Comic Format"
                  options={[
                    { label: "PDF Format (.pdf)", value: "pdf" },
                    {
                      label: "Image Format (.png, .jpg, .jpeg)",
                      value: "image",
                    },
                  ]}
                />
                <SelectWithoutIcon
                  label="Comic Type"
                  options={[
                    { label: "Free", value: "free" },
                    { label: "Paid", value: "paid" },
                  ]}
                />
              </div>
            </div>
            <div className="border border-line bg-background px-6 pt-4 pb-6 shadow-xl mt-4 rounded-lg">
              <p className="text-lg text-primary-2 font-semibold flex items-center gap-2">
                <CloudUpload size={20} className="text-primary-2" /> File Upload
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <PdfUploader pdf={pdf} setPdf={setPdf} />
                <ImageUploader
                  label="Cover Image (Optional)"
                  image={image}
                  setImage={setImage}
                />
              </div>
            </div>

            <div className="border border-line bg-background px-6 pt-4 pb-6 shadow-xl mt-4 rounded-lg">
              <p className="text-lg text-primary-2 font-semibold flex items-center gap-2">
                <Star size={20} className="text-primary-2" /> Comic Details
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <InputWithoutIcon
                  label="Comic Title"
                  type="text"
                  placeholder="e.g. The Amazing Spider-Man"
                />
                <MultiSelect
                  label="Genres"
                  options={comicCategories}
                  selected={categories}
                  onChange={setCategories}
                />
                <div className="space-y-1">
                  <label
                    htmlFor="description"
                    className="text-sm text-muted font-medium"
                  >
                    Synopsis
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    placeholder="e.g. A young boy discovers he has spider-like abilities and becomes the superhero Spider-Man."
                    className="p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 dark:bg-secondary mt-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <ButtonWithLoader
              type="submit"
              initialText="Upload Comic"
              loadingText="Uploading..."
              className="w-full mt-4 btn-primary h-11 rounded-lg"
            />
          </form>
        </div>
      </MainLayout>
    </>
  );
}
