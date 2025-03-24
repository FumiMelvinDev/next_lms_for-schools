import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "./ui/badge";

const AdminNav = () => {
  return (
    <div className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link href={"/"} className="text-lg hover:underline">
            Nghonyama High
          </Link>
          <Badge>Teacher</Badge>
        </div>
        <Link
          href={"/admin/subjects"}
          className="hover:bg-accent/70 flex items-center px-2"
        >
          Subjects
        </Link>
        <Link
          href={"/admin/grades"}
          className="hover:bg-accent/70 flex items-center px-2"
        >
          Grades
        </Link>
        <Link
          href={"/admin/stats"}
          className="hover:bg-accent/70 flex items-center px-2"
        >
          Stats
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
      </nav>
    </div>
  );
};

export default AdminNav;
