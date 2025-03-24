import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubjectsPage() {
  return (
    <section className="container my-4">
      <PageHeader title="Subjects">
        <Button asChild>
          <Link href="/admin/subjects/new">New Subject</Link>
        </Button>
      </PageHeader>

      <div className="">content</div>
    </section>
  );
}
