import { supabase } from "./supabase";

const DOMAIN = "@harchi.local";

export async function signIn(username, password) {
  const email = `${username.trim()}${DOMAIN}`;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
