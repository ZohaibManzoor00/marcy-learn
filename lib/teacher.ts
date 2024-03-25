export const isTeacher = (userId?: string | null, email?: string | null) => {
  const isAdmin = email?.endsWith("@marcylabschool.org");
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID || isAdmin;
};
