import { useState, useEffect } from "react";
import { useSchool } from "@/context/SchoolContext";
import { Save, School, Phone, Mail, MapPin, BookOpen, Users, Monitor, Library, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { SchoolSettings } from "@/types";

export default function AdminSettings() {
  const { settings, updateSettings, events = [] } = useSchool();
  const [form, setForm] = useState<SchoolSettings>(settings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const galleryImages = events.filter((e) => e.mediaType === "image" && e.mediaUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heroTitle.trim() || !form.phone.trim()) {
      toast.error("School name and phone are required.");
      return;
    }
    setLoading(true);
    try {
      await updateSettings(form);
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings.");
    }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-1">About & Info Settings</h2>
        <p className="text-muted-foreground text-sm">Update the school's public-facing information, contact details, and homepage content.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero section */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <School className="w-5 h-5 text-primary" /> Homepage Hero
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">School Name / Hero Title</label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                className={inputClass}
                data-testid="input-hero-title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Hero Subtitle / Slogan</label>
              <input
                type="text"
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                className={inputClass}
                data-testid="input-hero-subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Hero Background Image</label>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[
                  {
                    name: "Swat Primary Campus (Custom)",
                    url: "/primary_campus.jpg"
                  },
                  {
                    name: "Modern School Front",
                    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80"
                  },
                  {
                    name: "Traditional Campus",
                    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
                  },
                  {
                    name: "Academic Courtyard",
                    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80"
                  }
                ].map((preset) => {
                  const isSelected = (form.heroBgImage || "/primary_campus.jpg") === preset.url;
                  return (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setForm({ ...form, heroBgImage: preset.url })}
                      className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 text-left transition-all ${
                        isSelected ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{preset.name}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Gallery Photos Picker */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-primary" /> Select from Gallery/Event Images:
                </p>
                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1.5 border border-border/60 bg-muted/30 rounded-xl">
                    {galleryImages.map((event) => {
                      const isSelected = form.heroBgImage === event.mediaUrl;
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setForm({ ...form, heroBgImage: event.mediaUrl })}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 text-left transition-all group ${
                            isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
                          }`}
                          title={event.title}
                        >
                          <img
                            src={event.mediaUrl}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[8px] font-bold text-white truncate text-center">
                            {event.title}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold">
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 px-3 border border-dashed border-border rounded-xl bg-muted/20">
                    <p className="text-xs text-muted-foreground">
                      No custom event images uploaded yet. Images uploaded in the <strong className="text-primary font-semibold">Events Panel</strong> will show up here to be used as backgrounds!
                    </p>
                  </div>
                )}
              </div>

              {/* Custom Image URL Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Or paste any custom background image URL..."
                  value={form.heroBgImage || ""}
                  onChange={(e) => setForm({ ...form, heroBgImage: e.target.value })}
                  className={inputClass}
                />
                {form.heroBgImage && form.heroBgImage !== "/primary_campus.jpg" && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, heroBgImage: "/primary_campus.jpg" })}
                    className="px-3 bg-secondary text-foreground text-xs font-semibold rounded-xl hover:bg-secondary/80 whitespace-nowrap"
                  >
                    Reset Default
                  </button>
                )}
              </div>

              {/* Live Preview Bar */}
              <div className="relative h-28 rounded-xl overflow-hidden border border-border">
                <img
                  src={form.heroBgImage || "/primary_campus.jpg"}
                  alt="Live Hero Preview"
                  className="w-full h-full object-cover filter brightness-[0.4]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <p className="text-white text-base font-serif font-bold tracking-wide line-clamp-1">
                    {form.heroTitle || "THE BEST SCHOOLING ACADEMY"}
                  </p>
                  <p className="text-green-100/80 text-xs italic line-clamp-1">
                    "{form.heroSubtitle || "Nurturing Excellence, Building Futures"}"
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Curriculum Statement</label>
              <textarea
                value={form.curriculumStatement}
                onChange={(e) => setForm({ ...form, curriculumStatement: e.target.value })}
                rows={3}
                className={`${inputClass} resize-none`}
                data-testid="input-curriculum"
              />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" /> Contact Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+92 XXX XXXXXXX"
                  className={inputClass}
                  data-testid="input-phone"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="info@school.edu.pk"
                  className={inputClass}
                  data-testid="input-email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className={`${inputClass} resize-none`}
                data-testid="input-address"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> School Stats (Homepage Counter)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { key: "totalStudents" as keyof SchoolSettings, label: "Total Students", icon: Users },
              { key: "totalTeachers" as keyof SchoolSettings, label: "Qualified Teachers", icon: Users },
              { key: "computerLabs" as keyof SchoolSettings, label: "Computer Labs", icon: Monitor },
              { key: "libraryBooks" as keyof SchoolSettings, label: "Library Books", icon: Library },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1">
                  <Icon className="w-3 h-3" /> {label}
                </label>
                <input
                  type="number"
                  min={0}
                  value={form[key] as number}
                  onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                  className={inputClass}
                  data-testid={`input-${key}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-60"
          data-testid="button-save-settings"
        >
          <Save className="w-5 h-5" />
          {loading ? "Saving..." : "Save All Settings"}
        </button>
      </form>
    </div>
  );
}
