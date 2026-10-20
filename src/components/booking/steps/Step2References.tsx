"use client";

import { useState, useRef } from "react";
import { MAX_FILE_SIZE_MB, ACCEPTED_IMAGE_TYPES, MAX_UPLOADS } from "@/lib/validations/booking";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";



interface Props {
  files: File[];
  onNext: (files: File[]) => void;
  onBack: () => void;
}

export default function Step2References({ files: initialFiles, onNext, onBack }: Props) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);

    const toAdd = Array.from(newFiles);
    const combined = [...files, ...toAdd];

    if (combined.length > MAX_UPLOADS) {
      setError(`You can upload a maximum of ${MAX_UPLOADS} reference images.`);
      return;
    }

    for (const file of toAdd) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError("Only JPG, PNG and WebP images are accepted.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Each file must be under ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
    }

    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 border border-border-subtle rounded bg-charcoal/30">
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-2">
          ABOUT REFERENCES
        </p>
        <p className="text-smoke-grey text-sm leading-relaxed">
          Reference images are for inspiration only. We will not copy another artist&apos;s work. All tattoos created in our studio are original designs.
        </p>
      </div>

      {/* Upload area */}
      <div>
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
          REFERENCE IMAGES (OPTIONAL — MAX {MAX_UPLOADS})
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full border-2 border-dashed rounded p-10 text-center transition-colors duration-200",
            "hover:border-warm-bone/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone",
            files.length >= MAX_UPLOADS
              ? "border-border-subtle opacity-40 pointer-events-none"
              : "border-border-subtle"
          )}
          aria-label="Click to upload reference images"
          disabled={files.length >= MAX_UPLOADS}
        >
          <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">
            CLICK TO UPLOAD
          </p>
          <p className="text-smoke-grey/60 text-xs">JPG, PNG or WebP · Max {MAX_FILE_SIZE_MB} MB each</p>
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="sr-only"
          aria-hidden="true"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Uploaded references">
          {files.map((file, i) => (
            <li key={i} className="flex items-center justify-between p-3 border border-border-subtle rounded bg-charcoal/30">
              <div className="flex items-center gap-3 min-w-0">
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  aria-hidden="true"
                  className="w-10 h-10 object-cover rounded shrink-0"
                />
                <span className="text-warm-bone text-xs truncate">{file.name}</span>
                <span className="text-smoke-grey text-xs shrink-0">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(i)}
                className="text-smoke-grey hover:text-oxblood ml-3 shrink-0 w-8 h-8 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-oxblood text-xs" role="alert">{error}</p>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" size="md" onClick={onBack}>← Back</Button>
        <Button variant="primary" size="md" onClick={() => onNext(files)}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
