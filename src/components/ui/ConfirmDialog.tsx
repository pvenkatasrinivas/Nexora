"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";

// A confirmation pop-up built on the native HTML <dialog> element.
// showModal() gives us keyboard focus trapping and the Esc key for free.

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open or close the browser dialog when the `open` prop changes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel} // fires when the user presses Esc
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-card border border-line bg-white p-0 text-ink shadow-xl backdrop:bg-ink/50"
    >
      <div className="p-6">
        <h2 id="confirm-title" className="text-xl font-bold">
          {title}
        </h2>
        <p id="confirm-message" className="mt-2 text-ink-soft">
          {message}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} autoFocus>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
