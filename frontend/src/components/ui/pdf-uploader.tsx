import { FileText } from "lucide-react";

interface PdfUploaderProps {
  pdf: File | null;
  setPdf: (file: File) => void;
}

export default function PdfUploader({pdf, setPdf}: PdfUploaderProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setPdf(file);
        }
      };
    return (
    <div>
        <p className="text-sm text-muted mb-2 font-medium">Upload your PDF file</p>
        <label htmlFor="pdf">
          <input
            type="file"
            name="pdf"
            id="pdf"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="h-40 p-4 text-center border-2 border-line border-dashed rounded-lg bg-secondary center">
            {!pdf && (
              <div className="center flex-col space-y-2">
                <FileText className="text-muted" />
                <p className="text-sm text-muted">
                  Drag and drop your PDF file here or click to upload
                </p>
              </div>
            )}
            {pdf && (
              <div className="center flex-col space-y-2 bg-primary-2/10 p-4 rounded-lg h-full w-full">
                <p className="text-sm text-primary-2 font-medium">{pdf.name}</p>
                <p className="text-sm text-muted">Click to change</p>
              </div>
            )}
          </div>
        </label>
      </div>
  )
}
