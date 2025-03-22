import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/services/clerk";
import { canAccessTeacherPages } from "@/permissions/general";

const StudentNav = () => {
  return (
    <div className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <Link href={"/"} className="mr-auto text-lg hover:underline px-2">
          Nghonyama High
        </Link>
        <SignedIn>
          <AdminTeacherLink />
          <Link
            href={"/subjects"}
            className="hover:bg-accent/70 flex items-center px-2"
          >
            My Subjects
          </Link>
          <Link
            href={"/subjects"}
            className="hover:bg-accent/70 flex items-center px-2"
          >
            Registration History
          </Link>
          <div className="size-8 self-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                },
              }}
            />
          </div>
        </SignedIn>
        <SignedOut>
          <Button className="self-center" asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </nav>
    </div>
  );
};

async function AdminTeacherLink() {
  const user = await getCurrentUser();

  if (!canAccessTeacherPages(user)) return null;

  return (
    <Link href={"/admin"} className="hover:bg-accent/70 flex items-center px-2">
      Admin
    </Link>
  );
}

export default StudentNav;
