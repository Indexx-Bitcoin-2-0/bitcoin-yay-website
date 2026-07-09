"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
}

export const MAX_FILES_PER_SECTION = 10;
export const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface Props {
  title: string;
  hint?: string;
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  error?: string;
  disabled?: boolean;
}

const makeId = () =>
  `${Math.random().toString(36).slice(2)}-${performance.now().toString(36)}`;

const ImageUploadSection: React.FC<Props> = ({
  title,
  hint,
  images,
  onChange,
  error,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || disabled) return;
      const incoming = Array.from(fileList);
      const nextErrors: string[] = [];
      const accepted: UploadedImage[] = [];

      for (const file of incoming) {
        if (images.length + accepted.length >= MAX_FILES_PER_SECTION) {
          nextErrors.push(
            `You can upload up to ${MAX_FILES_PER_SECTION} images in this section.`
          );
          break;
        }
        if (!ACCEPTED_TYPES.includes(file.type)) {
          nextErrors.push(`${file.name}: unsupported format (use JPG, PNG, WebP or GIF).`);
          continue;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
          nextErrors.push(`${file.name}: exceeds ${MAX_FILE_SIZE_MB}MB.`);
          continue;
        }
        accepted.push({ id: makeId(), file, previewUrl: URL.createObjectURL(file) });
      }

      setFileErrors(nextErrors);
      if (accepted.length) onChange([...images, ...accepted]);
    },
    [images, onChange, disabled]
  );

  const removeImage = useCallback(
    (id: string) => {
      const target = images.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      onChange(images.filter((img) => img.id !== id));
    },
    [images, onChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 md:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
        <span className="shrink-0 text-xs text-tertiary">
          {images.length}/{MAX_FILES_PER_SECTION}
        </span>
      </div>
      {hint ? <p className="mb-4 text-sm leading-relaxed text-tertiary">{hint}</p> : null}

      {/* Dropzone */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed border-white/10 opacity-50"
            : isDragging
            ? "border-primary bg-primary/10"
            : error
            ? "border-red-500/70 hover:border-primary"
            : "border-white/20 hover:border-primary"
        }`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary"
        >
          <path
            d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-semibold text-white">
          Tap to upload or drag &amp; drop
        </span>
        <span className="text-xs text-tertiary">
          JPG, PNG, WebP or GIF · up to {MAX_FILE_SIZE_MB}MB each
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Previews */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/10"
            >
              <Image
                src={img.previewUrl}
                alt={img.file.name}
                fill
                unoptimized
                className="object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label={`Remove ${img.file.name}`}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Per-file errors */}
      {fileErrors.length > 0 && (
        <ul className="mt-3 space-y-1">
          {fileErrors.map((err, i) => (
            <li key={i} className="text-xs text-red-400">
              {err}
            </li>
          ))}
        </ul>
      )}

      {/* Section validation error */}
      {error ? <p className="mt-3 text-sm font-medium text-red-500">{error}</p> : null}
    </div>
  );
};

export default ImageUploadSection;
