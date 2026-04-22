import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: NoteTag
): Promise<NoteListResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};