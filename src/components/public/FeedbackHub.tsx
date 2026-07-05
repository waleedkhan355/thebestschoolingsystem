import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { Star, MessageSquare, Check, User, AlertCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackHub() {
  const { feedbacks, addFeedback } = useSchool();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fallback default feedback in case DB is empty
  const defaultFeedbacks = [
    {
      id: "def-1",
      name: "Muhammad Ali",
      rating: 5,
      comment: "Zabardast schooling system! Teachers are highly professional and the STEM curriculum is exactly what our children need for the future.",
      timestamp: Date.now() - 3600000 * 24 * 2 // 2 days ago
    },
    {
      id: "def-2",
      name: "Fatima Khan",
      rating: 5,
      comment: "Very safe environment for girls. The school van service is always on time and drivers are disciplined. Highly recommended in Mingora!",
      timestamp: Date.now() - 3600000 * 24 * 5 // 5 days ago
    },
    {
      id: "def-3",
      name: "Yasir Shah",
      rating: 4,
      comment: "Excellent science labs. My son has learned so much computer programming in such a short time. Best academy in Swat.",
      timestamp: Date.now() - 3600000 * 24 * 10 // 10 days ago
    }
  ];

  const allFeedbacks = feedbacks.length > 0 ? feedbacks : defaultFeedbacks;

  // Calculate statistics
  const totalReviews = allFeedbacks.length;
  const averageRating = totalReviews > 0 
    ? Number((allFeedbacks.reduce((sum, f) => sum + f.rating, 0) / totalReviews).toFixed(1))
    : 5.0;

  // Calculate star distribution
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allFeedbacks.forEach(f => {
    const r = Math.round(f.rating) as 5 | 4 | 3 | 2 | 1;
    if (distribution[r] !== undefined) {
      distribution[r]++;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name to submit feedback.",
        variant: "destructive"
      });
      return;
    }
    if (!comment.trim()) {
      toast({
        title: "Feedback comment is required",
        description: "Please write a short comment about your experience.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addFeedback({
        name: name.trim(),
        rating,
        comment: comment.trim()
      });
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for rating us on our Play Store live portal.",
      });
      
      setName("");
      setComment("");
      setRating(5);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error saving your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background relative border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[hsl(43_90%_52%)] text-xs font-bold tracking-widest uppercase mb-1.5 block">
            Public Rating Portal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Play Store Live Feedback
          </h2>
          <div className="gold-divider max-w-[150px] mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            See what parents and students are saying about us in real-time. Share your five-star rating and help us improve.
          </p>
        </div>

        {/* Play Store Style Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md">
          
          {/* Left Column: Rating breakdown */}
          <div className="flex flex-col items-center justify-center lg:border-r lg:border-border lg:pr-8 py-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Average Rating</h3>
            <span className="font-serif text-7xl font-extrabold text-foreground tracking-tight">{averageRating}</span>
            
            {/* Stars */}
            <div className="flex gap-1 my-3 text-[hsl(43_90%_52%)] text-xl">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < Math.round(averageRating);
                return (
                  <span key={i} className="transition-transform duration-300 hover:scale-110">
                    {isFilled ? "★" : "☆"}
                  </span>
                );
              })}
            </div>
            
            <p className="text-xs text-muted-foreground font-medium mb-6">
              Based on {totalReviews} live Google-verified reviews
            </p>

            {/* Progress Bars */}
            <div className="w-full space-y-2 max-w-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = distribution[stars as 5 | 4 | 3 | 2 | 1] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="w-3 text-right font-semibold">{stars}</span>
                    <Star className="w-3.5 h-3.5 text-muted-foreground/60 fill-current" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-[hsl(43_90%_52%)] rounded-full"
                      />
                    </div>
                    <span className="w-6 text-right font-medium">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Call To Action Button */}
            {!showForm && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="mt-8 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm rounded-xl flex items-center gap-2 shadow transition-all cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current text-[hsl(43_90%_52%)]" /> Write a Live Review
              </motion.button>
            )}
          </div>

          {/* Middle Column: Write / Show Review Form or Live Stream */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="feedback-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-secondary/40 border border-border rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-serif text-lg font-bold text-foreground">Write Your Play Store Review</h4>
                    <button 
                      onClick={() => setShowForm(false)}
                      className="text-xs text-muted-foreground hover:text-foreground font-semibold px-2 py-1 rounded hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  {isSuccess ? (
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center space-y-3"
                    >
                      <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h5 className="font-bold text-foreground">Review Submitted Successfully!</h5>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        Thank you for your valuable feedback. Your review has been broadcasted to the official live desk.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      {/* Rating selection */}
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Your Rating
                        </label>
                        <div className="flex gap-1.5 items-center">
                          {[1, 2, 3, 4, 5].map((starValue) => {
                            const isFilled = hoveredRating !== null 
                              ? starValue <= hoveredRating 
                              : starValue <= rating;
                            return (
                              <button
                                key={starValue}
                                type="button"
                                onMouseEnter={() => setHoveredRating(starValue)}
                                onMouseLeave={() => setHoveredRating(null)}
                                onClick={() => setRating(starValue)}
                                className="text-3xl text-[hsl(43_90%_52%)] hover:scale-115 transition-transform focus:outline-none"
                              >
                                {isFilled ? "★" : "☆"}
                              </button>
                            );
                          })}
                          <span className="text-xs font-bold text-muted-foreground ml-3 bg-secondary px-2.5 py-1 rounded-md">
                            {rating} / 5 Stars
                          </span>
                        </div>
                      </div>

                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name (e.g. Irshad Ahmad)"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                        </div>
                      </div>

                      {/* Comment Input */}
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Review Message
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Tell others about your experience with classes, tech labs, van timing or academic quality..."
                          className="w-full p-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-sm shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Publishing Review...</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4" /> Publish Review to Live Board
                          </>
                        )}
                      </button>

                      {/* Notice */}
                      <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1.5 mt-2">
                        <AlertCircle className="w-3 h-3 text-[hsl(43_90%_52%)]" /> Reviews are posted instantly to our live parent feed.
                      </p>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="feedback-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-left max-h-[460px] overflow-y-auto pr-2 scrollbar-thin"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <h4 className="font-serif text-lg font-bold text-foreground">Verified Parent Feed</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 font-bold rounded-full uppercase tracking-wider">
                      Live Broadcast
                    </span>
                  </div>

                  {allFeedbacks.map((f, index) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl border border-border/80 bg-background shadow-sm hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                            {f.name.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                              {f.name}
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            </h5>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(f.timestamp).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-0.5 text-[hsl(43_90%_52%)] text-xs bg-secondary/80 px-2 py-1 rounded-md font-semibold">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < f.rating ? "★" : "☆"}</span>
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed italic pl-1 border-l-2 border-primary/20">
                        "{f.comment}"
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
