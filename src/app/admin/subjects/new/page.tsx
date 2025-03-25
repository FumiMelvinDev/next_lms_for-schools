import { PageHeader } from "@/components/PageHeader";
import { SubjectForm } from "@/features/subjects/components/SubjectsForm";

export default function NewSubjectPage() {
  return (
    <div className="container my-4">
      <PageHeader title="New Subject" />
      <SubjectForm />
    </div>
  );
}
