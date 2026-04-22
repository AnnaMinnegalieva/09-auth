"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNote } from "@/lib/api/clientApi";
import type { NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
      clearDraft();
      router.back();
    },
    onError: () => {
      toast.error("Failed to create note!");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNoteData;
    mutation.mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          rows={4}
          defaultValue={draft.content}
          onChange={handleChange}
        ></textarea>
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit">
          Create note
        </button>
        <button
          className={css.cancelButton}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}