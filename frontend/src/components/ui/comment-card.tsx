import { formatDate } from "@/helpers/formatDate";
import { Reply } from "lucide-react";
import { toast } from "sonner";

export default function CommentCard({comment}: {comment: IComment}) {
  return (
    <div className="border-line border rounded-lg p-4">
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4,c0aede,d1d4f9"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{comment.user.name}</span>
          <span className="text-xs text-muted">
            {" "}
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-sm">
        {comment.comment}
        <span
          onClick={() => {
            toast.warning("Feature not implemented yet!");
          }}
          className="cursor-pointer flex items-center gap-1 text-primary-2"
        >
          <Reply size={16} /> Reply
        </span>
      </p>
    </div>
  </div>
  )
}
