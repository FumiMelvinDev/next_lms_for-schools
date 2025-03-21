import StudentNav from "@/components/StudentNav";

export default function StudentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <StudentNav />
      {children}
    </div>
  );
}
