import { Background, Box, ButtonWithLoader, CommentCard } from "@/components/ui";
import PDFViewer from "@/components/ui/pdf-viewer";
import { useComics } from "@/hooks";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Preview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const comicId = searchParams.get("comicId");
  const chapterNumber = searchParams.get("chapterNumber");
  const {comics} = useComics();
  const comic = comics?.find((comic) => comic.id === comicId);
  const chapter = comic?.chapters.find((chapter) => chapter.chapterNumber === Number(chapterNumber));
  const goToNextChapter = () => {
    if (Number(chapterNumber) < (comic?.chapters.length || 0)) {
      navigate(
        `/preview?comicId=${comicId}&chapterNumber=${Number(chapterNumber) + 1}`
      );
    } else {
      toast.warning("No more chapters available!");
    }
  };
  const goToPreviousChapter = () => {
    if (Number(chapterNumber) > 1) {
      navigate(
        `/preview?comicId=${comicId}&chapterNumber=${Number(chapterNumber) - 1}`
      );
    } else {
      toast.warning("No previous chapters available!");
    }
  };
 
  return (
    <>
      <Background>
        <div className="space-y-10 mb-10">
          <header className="sticky top-0 z-50 bg-primary-2/90 text-white">
            <nav className="h-[70px] flex items-center justify-between main">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeft />
              </button>
              <div className="flex items-center gap-4">
                <a
                  href="#comments"
                  className="btn border border-primary px-2 h-9 rounded-lg text-primary"
                >
                  <MessageSquareText size={20} />{" "}
                  <span className="">Comments</span>
                </a>
                <button
                  onClick={goToPreviousChapter}
                  className="btn-primary h-9 px-4 rounded-lg"
                >
                  <ChevronLeft size={20} />{" "}
                  <span className="hidden md:block">Previous</span>
                </button>
                <button
                  onClick={goToNextChapter}
                  className="btn-primary h-9 px-4 rounded-lg"
                >
                  <span className="hidden md:block">Next</span>{" "}
                  <ChevronRight size={20} />
                </button>
              </div>
            </nav>
          </header>

          <div className="main bg-background shadow-sm overflow-hidden">
            <PDFViewer fileUrl={chapter?.comicUploaded.url || ""} />
          </div>

          <div id="comments" className="w-[90%] md:w-[900px] mx-auto">
            <Box icon={<MessageSquareText size={20} />} title="Comments">
              { chapter?.comments && chapter?.comments.length > 0 && <div className="max-h-100 h-100 mb-4 overflow-y-scroll space-y-4">
                {chapter?.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>}
              {chapter?.comments.length === 0 && <div className="min-h-40 bg-secondary rounded-lg p-4 center mb-4">
                <p className="text-sm text-muted">
                  No comments yet. Be the first to comment!
                </p>
              </div>}

              <form className="space-y-4">
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  placeholder="Add a comment..."
                  className="p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 dark:bg-secondary mt-1"
                ></textarea>
                <ButtonWithLoader
                  initialText="Add Comment"
                  loadingText="Adding..."
                  className="w-full btn-primary h-10 rounded-lg"
                />
              </form>
            </Box>
          </div>
        </div>
      </Background>
    </>
  );
}
