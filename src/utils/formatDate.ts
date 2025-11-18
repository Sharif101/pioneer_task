export function formatDueDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return `${date.toLocaleDateString("en-US", options)}`;
}
