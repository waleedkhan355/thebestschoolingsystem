import { motion } from "framer-motion";
import { Link } from "wouter";
import { useSchool } from "@/context/SchoolContext";
import { ChevronRight, BookOpen, Users, Monitor, Library, Award, Globe, Dumbbell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function CounterCard({ value, label, icon: Icon }: { value: number; label: string; icon: React.ComponentType<{ className?: string }> }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 5 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
      transition={{ duration: isMobile ? 0.35 : 0.5 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
    >
      <Icon className="w-8 h-8 text-[hsl(43_90%_52%)] mx-auto mb-3" />
      <p className="font-serif text-4xl font-bold text-white mb-1">{value.toLocaleString()}+</p>
      <p className="text-green-200 text-sm font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const { settings, notifications } = useSchool();
  const activeNotices = notifications.filter((n) => n.active).slice(0, 5);
  const isMobile = useIsMobile();

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center parallax-bg"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(152 55% 10% / 0.92) 0%, hsl(152 45% 18% / 0.85) 50%, hsl(152 35% 22% / 0.80) 100%), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80')`,
        }}
        data-testid="section-hero"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImcxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDIxNSw2NCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cxKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? -5 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[hsl(43_90%_52%)/20] border border-[hsl(43_90%_52%)/40] text-[hsl(43_90%_70%)] text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
              Deolai, Swat Pakistan · Est. d.yosu.edu.pk
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.7, delay: isMobile ? 0.05 : 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            {settings.heroTitle}
          </motion.h1>

          <motion.div
            initial={{ scaleX: isMobile ? 0.9 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.1 : 0.3 }}
            className="gold-divider max-w-xs mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0.4 : 0.7, delay: isMobile ? 0.15 : 0.4 }}
            className="text-xl sm:text-2xl text-green-100 font-light italic mb-8"
          >
            "{settings.heroSubtitle}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.2 : 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] font-bold rounded-lg hover:bg-[hsl(43_90%_45%)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="link-admissions"
            >
              Admissions Open <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              data-testid="link-results"
            >
              Check Results <BookOpen className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[hsl(152_55%_14%)] py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <CounterCard value={settings.totalStudents} label="Students" icon={Users} />
          <CounterCard value={settings.totalTeachers} label="Qualified Teachers" icon={Award} />
          <CounterCard value={settings.computerLabs} label="Computer Labs" icon={Monitor} />
          <CounterCard value={settings.libraryBooks} label="Library Books" icon={Library} />
        </div>
      </section>

      {/* Active Notices Panel */}
      {activeNotices.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Notice Board</h2>
              <div className="gold-divider max-w-[120px] mx-auto" />
            </div>
            <div className="space-y-3">
              {activeNotices.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 5 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: isMobile ? i * 0.04 : i * 0.08, duration: 0.35 }}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${
                    n.level === "urgent"
                      ? "bg-red-50 border-red-200"
                      : n.level === "holiday"
                      ? "bg-green-50 border-green-200"
                      : "bg-card border-border"
                  }`}
                  data-testid={`notice-item-${n.id}`}
                >
                  <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                    n.level === "urgent" ? "bg-red-100 text-red-700" :
                    n.level === "holiday" ? "bg-green-100 text-green-700" :
                    "bg-[hsl(152_25%_90%)] text-[hsl(152_55%_18%)]"
                  }`}>
                    {n.level}
                  </span>
                  <p className="text-foreground text-sm leading-relaxed">{n.message}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/notifications" className="text-primary font-semibold hover:underline text-sm inline-flex items-center gap-1">
                View All Notices <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-[hsl(152_25%_96%)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Why Choose YOSU?</h2>
            <div className="gold-divider max-w-[120px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "International Curriculum", desc: "English-medium instruction with a globally aligned syllabus preparing students for international academic pathways." },
              { icon: Monitor, title: "STEM Excellence", desc: "Dedicated computer labs, science experiments, and technology-integrated learning for the digital generation." },
              { icon: Dumbbell, title: "Sports & Character", desc: "Championship-level sports programmes developing leadership, teamwork, and physical excellence alongside academics." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? i * 0.05 : i * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(152_25%_90%)] flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
