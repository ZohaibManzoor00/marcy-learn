import { useUser } from "@clerk/nextjs"

export const isTeacher = (userId?: string | null) => {
    const { user } = useUser()
    const isAdmin = user?.emailAddresses[0]?.emailAddress.endsWith("@marcylabschool.org")
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID || isAdmin
}