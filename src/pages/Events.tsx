import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { Calendar, MapPin, Play, Image as ImageIcon, X } from "lucide-react";
import { SchoolEvent } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

function VideoEmbed({ url }: { url: string }) {
  let embedUrl = url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  else if (vimeoMatch) embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return (
    <div className="aspect-video w-full">
      <iframe
        src={embedUrl}
        className="w-full h-full rounded-lg"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
        title="Event video"
      />
    </div>
  );
}

function EventModal({ event, onClose }: { event: SchoolEvent; onClose: () => void }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: isMobile ? 0.98 : 0.9, y: isMobile ? 5 : 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: isMobile ? 0.98 : 0.9, y: isMobile ? 5 : 20 }}
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-foreground pr-4">{event.title}</h2>
            <button onClick={onClose} className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors" data-testid="button-close-modal">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="mb-5">
            {event.mediaType === "video" ? (
              <VideoEmbed url={event.mediaUrl} />
            ) : (
              <img
                src={event.mediaUrl || event.thumbnail}
                alt={event.title}
                className="w-full rounded-xl object-cover max-h-80"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=70"; }}
              />
            )}
          </div>
          <p className="text-foreground leading-relaxed mb-4">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(event.date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Events() {
  const { events } = useSchool();
  const [selected, setSelected] = useState<SchoolEvent | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const isMobile = useIsMobile();

  const filtered = filter === "all" ? events : events.filter((e) => e.mediaType === filter);

  return (
    <div className="py-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: isMobile ? -5 : -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.35 : 0.6 }} className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-3">Events Gallery</h1>
          <div className="gold-divider max-w-[100px] mx-auto" />
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Celebrating achievements, milestones, and school life at YOSU International.</p>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-3 mb-8">
          {(["all", "image", "video"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
              data-testid={`filter-${f}`}
            >
              {f === "all" ? "All Events" : f === "image" ? "Photos" : "Videos"}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-serif text-lg">No events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? i * 0.04 : i * 0.06, duration: 0.35 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                onClick={() => setSelected(event)}
                data-testid={`event-card-${event.id}`}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={event.thumbnail || event.mediaUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70"; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {event.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-semibold text-foreground mb-2 line-clamp-1">{event.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{event.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                      event.mediaType === "video" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {event.mediaType}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
