import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Protected Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
