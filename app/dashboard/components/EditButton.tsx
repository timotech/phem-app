import { Pencil } from "lucide-react";

export default function EditButton({
  className = "",
  title = "Edit",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-green-600 ml-2 ${className}`}
      title={title}
      role="img"
      aria-label={title}
    >
      <Pencil size={16} />
    </span>
  );
}
