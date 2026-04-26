import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, StatusBadge, Pagination } from "@/components/ui";
import { useBooksQuery, useDeleteBookMutation } from "@/api/book.api";
import { toast } from "@/hooks/use-toast";

const PER_PAGE = 6;

export function BooksList() {
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const booksQuery = useBooksQuery();
  const deleteBookMutation = useDeleteBookMutation();
  const books = booksQuery.data ?? [];
  const total = Math.max(1, Math.ceil(books.length / PER_PAGE));
  const slice = books.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm("Delete this book?");
    if (!shouldDelete) return;

    try {
      await deleteBookMutation.mutateAsync(id);
      toast({ title: "Book deleted", description: "The book was removed successfully." });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Could not delete this book.",
      });
    }
  };

  return (
    <AppLayout title="Books" breadcrumb={["Home", "Books"]}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Manage the party's published and upcoming book titles
        </p>
        <PrimaryButton onClick={() => navigate("/books/add")}>
          <Plus className="h-4 w-4" /> Add Book
        </PrimaryButton>
      </div>

      <Card padding={false}>
        {booksQuery.isLoading ? (
          <div className="px-6 py-8 text-sm" style={{ color: "var(--text-secondary)" }}>
            Loading books...
          </div>
        ) : null}
        {booksQuery.isError ? (
          <div className="px-6 py-8 text-sm text-red-700">
            {(booksQuery.error as Error).message}
          </div>
        ) : null}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Title</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Author</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Category</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Year</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="px-6 py-4 font-medium text-right" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((book) => (
                <tr
                  key={book.id}
                  className="border-b last:border-0 transition-colors group"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium" style={{ color: "var(--text-primary)" }}>{book.titleEn}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)", direction: "rtl", textAlign: "left" }}>{book.titleUr}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: "var(--text-secondary)" }}>{book.authorEn}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{book.authorUr}</div>
                  </td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{book.category}</td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{book.year}</td>
                  <td className="px-6 py-4"><StatusBadge status={book.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => navigate(`/books/${book.id}/edit`)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary-soft)"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => handleDelete(book.id)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLElement).style.color = "#B91C1C"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <Pagination page={page} total={total} onPage={setPage} />
        </div>
      </Card>
    </AppLayout>
  );
}
