import { Settings } from "lucide-react";
import { Box, ButtonWithLoader, InputWithoutIcon } from "../ui";
import { useAdmin, useComics } from "@/hooks";
import { useState } from "react";
import { toast } from "sonner";

export default function ComicSettings({ comicId }: { comicId: string | undefined }) {
  const [credit, setCredit] = useState("");
  const {
    updateComicCredit,
    updateComicStatus,
    deleteComic,
    isLoading,
  } = useAdmin();

  const { allComics } = useComics();
  const comic = allComics?.find((comic) => comic.id === comicId);

  if (!comicId) {
    return null;
  }

  const isFreeComic = comic?.type === "free" || comic?.credit === 0;

  const handleUpdateCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFreeComic) {
      toast.error("This comic is free and cannot have credits updated");
      return;
    }
    
    if (Number(credit) < 1 || !credit) {
      toast.error("Credit must be greater than 0");
      return;
    }
    await updateComicCredit(comicId, Number(credit));
    setCredit("");
  };

  const handleApprove = async () => {
    await updateComicStatus(comicId, "approved");
  };

  const handleReject = async () => {
    await updateComicStatus(comicId, "rejected");
  };

  const handleDelete = async () => {
    await deleteComic(comicId);
  };

  return (
    <div className="w-full md:w-[900px] mx-auto">
      <Box title="Comic Settings" icon={<Settings size={20} />}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <form
            className="border border-line rounded-lg p-4 space-y-4"
            onSubmit={handleUpdateCredit}
          >
            <InputWithoutIcon
              type="number"
              label="Update credits"
              placeholder={isFreeComic ? "Free comic - credits disabled" : "Enter the number of credits"}
              name="credit"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              disabled={isFreeComic}
            />
            <ButtonWithLoader
              initialText={isFreeComic ? "Free Comic" : "Update"}
              loadingText="Updating..."
              className={`w-full h-10 rounded-lg ${isFreeComic ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'btn-primary'}`}
              loading={isLoading.updateComicCredit}
              type="submit"
              disabled={isFreeComic}
            />
          </form>

          <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
            <ButtonWithLoader
              initialText="Approve"
              loadingText="Approving..."
              className="bg-green-500 text-white w-full h-10 rounded-lg"
              loading={isLoading.approveComic}
              onClick={handleApprove}
            />
            <ButtonWithLoader
              initialText="Reject"
              loadingText="Rejecting..."
              className="bg-primary-2 text-white w-full h-10 rounded-lg"
              loading={isLoading.rejectComic}
              onClick={handleReject}
            />
            <ButtonWithLoader
              initialText="Delete"
              loadingText="Deleting..."
              className="bg-red-500 text-white w-full h-10 rounded-lg"
              loading={isLoading.deleteComic}
              onClick={handleDelete}
            />
          </div>
        </div>
      </Box>
    </div>
  );
}
