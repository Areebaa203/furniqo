/**
 * Resolves the current Supabase auth user id for the browser client.
 */
export async function resolveSupabaseUserId(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.id) return user.id;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}
