import {
  Box,
  ButtonWithLoader,
  InputWithoutIcon,
  PdfUploader,
  SelectWithoutIcon,
} from "@/components/ui";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newChapterSchema, type NewChapterSchema } from "@/schemas/new-chapter";
import { toast } from "sonner";

export default function NewChapter() {
  const { addNewChapter, isLoading } = useComics();
  const [searchParams] = useSearchParams();
  const comicId = searchParams.get("comicId");

  const { comics } = useComics();
  const [pdf, setPdf] = useState<File | null>(null);

  const comic = comics?.find((comic) => comic.id === comicId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewChapterSchema>({
    resolver: zodResolver(newChapterSchema),
  });

  const onSubmit = (data: NewChapterSchema) => {
    if (!pdf) {
      toast.error("Please upload a chapter file");
      return;
    }
    if (!comic?.id) {
      toast.error("Comic not found");
      return;
    }
    addNewChapter(comic?.id, data, pdf);
  };

  return (
    <MainLayout>
      <div className="w-full md:w-[480px] mx-auto main mt-10 space-y-4">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl md:text-4xl text-primary-2 font-bold">
            {comic?.title}
          </h1>
          <p className="text-muted">Adding a new chapter for...</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <div className="space-y-4">
              <SelectWithoutIcon
                label="File Format"
                options={[
                  { label: "PDF Format (.pdf)", value: "pdf" },
                  {
                    label: "Image Format (.png, .jpg, .jpeg)",
                    value: "image",
                  },
                ]}
                {...register("format")}
                error={errors.format?.message}
              />
              <InputWithoutIcon
                label="Chapter Title"
                type="text"
                {...register("title")}
                error={errors.title?.message}
              />
              <InputWithoutIcon
                label="Chapter Number"
                type="number"
                {...register("chapterNumber", { valueAsNumber: true })}
                error={errors.chapterNumber?.message}
              />
              <PdfUploader setPdf={setPdf} pdf={pdf} />
            </div>
          </Box>
          <ButtonWithLoader
            initialText="Add Chapter"
            loadingText="Adding Chapter..."
            type="submit"
            className="w-full mt-4 btn-primary h-11 rounded-lg"
            loading={isLoading}
          />
        </form>
      </div>
    </MainLayout>
  );
}
