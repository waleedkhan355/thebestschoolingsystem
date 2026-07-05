import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { Trash2, Star, ThumbsUp, MessageSquare, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminFeedback() {
  const { feedbacks, deleteFeedback } = useSchool();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this parent feedback from the live dashboard?")) return;
    setDeletingId(id);
    try {
      await deleteFeedback(id);
      toast({
        title: "Feedback deleted",
        description: "The review was successfully removed from the live portal."
      });
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not remove feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 border border-border rounded-2xl shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Live Parent Reviews</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Moderate, review, and manage live feedback submitted by parents and academy visitors.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/80 px-4 py-2.5 rounded-xl border border-border">
          <Star className="w-5 h-5 text-[hsl(43_90%_52%)] fill-current" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Reviews</p>
            <p className="font-serif text-lg font-bold text-foreground">{feedbacks.length} Active</p>
          </div>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground space-y-3">
          <MessageSquare className="w-12 h-12 text-muted-foreground/40 mx-auto" />
          <p className="font-medium text-foreground">No custom parent reviews yet</p>
          <p className="text-xs max-w-sm mx-auto">
            The homepage is currently displaying the beautiful default parent and alumnus feedback. Once a parent writes a live review, it will show up here.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4">Reviewer</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                <AnimatePresence>
                  {feedbacks.map((f) => (
                    <motion.tr
                      key={f.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      {/* Name with Avatar */}
                      <td className="px-6 py-4 font-bold text-foreground whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                            {f.name.charAt(0)}
                          </div>
                          <span>{f.name}</span>
                        </div>
                      </td>

                      {/* Stars */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-0.5 text-[hsl(43_90%_52%)]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-base">
                              {i < f.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="px-6 py-4 text-muted-foreground max-w-md break-words font-sans">
                        "{f.comment}"
                      </td>

                      {/* Submitted Date */}
                      <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(f.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          disabled={deletingId === f.id}
                          onClick={() => handleDelete(f.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
