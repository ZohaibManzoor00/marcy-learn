export const isTeacher = (userId?: string | null) => {
  if (!userId) return false
  const verified = process.env.NEXT_PUBLIC_TEACHER_ID
  const isAdmin = verified?.includes(userId)
  return isAdmin
};
