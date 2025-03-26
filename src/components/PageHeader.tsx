import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-center justify-between", className)}>
      <h1 className="text-xl font-semibold">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  );
}
