import { useUser } from "@clerk/clerk-react";

export const isTeacher = (userId?: string | null, email?: string | null) => {
  // const user = useUser();
  // if (!user) return false;

  // const isAdmin = user.user?.emailAddresses[0].emailAddress?.endsWith(
  //   "@marcylabschool.org"
  // );
  let isAdmin = true
  return isAdmin;
};
