import { nextServer } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: NoteTag
): Promise<NoteListResponse> => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

type RegisterRequest = {
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionResponse = {
  success: boolean;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};