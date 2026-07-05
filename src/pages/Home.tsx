import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useSchool } from "@/context/SchoolContext";
import FeedbackHub from "@/components/public/FeedbackHub";
import { 
  ChevronRight, 
  BookOpen, 
  Users, 
  Monitor, 
  Library, 
  Award, 
  Globe, 
  Dumbbell, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Heart
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function CounterCard({ value, label, icon: Icon }: { value: number; label: string; icon: React.ComponentType<{ className?: string }> }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 5 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
      transition={{ duration: isMobile ? 0.35 : 0.5 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center shadow-lg hover:border-[hsl(43_90%_52%)]/50 transition-all duration-300"
    >
      <Icon className="w-8 h-8 text-[hsl(43_90%_52%)] mx-auto mb-3 animate-pulse" />
      <p className="font-serif text-4xl font-bold text-white mb-1">{value.toLocaleString()}+</p>
      <p className="text-green-200 text-xs font-semibold uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const { settings, notifications } = useSchool();
  const activeNotices = notifications.filter((n) => n.active).slice(0, 5);
  const isMobile = useIsMobile();

  // Interactive accordion and program details state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const programs = [
    {
      id: 1,
      title: "Early Years & Montessori",
      ageGroup: "Ages 3 - 5",
      desc: "Nurturing foundational curiosity, sensory development, and social skills through premium, play-based activities.",
      details: [
        "Interactive sensory play & language development",
        "Introduction to basic numbers & phonics",
        "Moral values & basic etiquette training",
        "Safe, colourful, and highly stimulating classrooms"
      ]
    },
    {
      id: 2,
      title: "Primary School Academy",
      ageGroup: "Grades 1 - 5",
      desc: "Building academic core competencies in English, science, mathematics, and Urdu, with initial technology integration.",
      details: [
        "In-depth English speaking & writing workshops",
        "Basic computer usage & technology orientation",
        "Weekly science experimentation sessions",
        "Islamic studies, ethics, and character building"
      ]
    },
    {
      id: 3,
      title: "Middle & High School",
      ageGroup: "Grades 6 - 10",
      desc: "Delivering rigorous academic training to excel in board examinations, advanced computer science, and career paths.",
      details: [
        "Full Matriculation board exam preparation",
        "Hands-on scientific lab work (Physics, Chemistry, Biology)",
        "Advanced IT, typing speed development, and digital arts",
        "Public speaking, leadership seminars, and career counselling"
      ]
    },
    {
      id: 4,
      title: "STEM & Coding Academy",
      ageGroup: "All Classes",
      desc: "Unique technological curriculum empowering the digital generation with modern computer literacy and logic.",
      details: [
        "Visual coding blocks & basic programming logic",
        "Robotics, digital gadgets, and hardware orientation",
        "STEM projects combining science and digital design",
        "Interactive smart board sessions & group presentations"
      ]
    }
  ];

  const facilities = [
    {
      title: "Advanced IT Labs",
      desc: "Our state-of-the-art computer labs feature high-speed workstations, multimedia projectors, and custom learning software designed to make every student tech-literate.",
      icon: Monitor,
      badge: "Tech-Forward",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Science Laboratory",
      desc: "Fully stocked laboratories equipped with safe apparatuses for regular practical experiments in Chemistry, Physics, and Biology, sparking scientific curiosity.",
      icon: Flask, // dynamically resolved below
      badge: "Hands-on",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Elite library",
      desc: "An extensive collection of curricular, reference, English literature, and storytelling books encouraging lifelong reading habits.",
      icon: Library,
      badge: "Knowledge Hub",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Safe Transport Fleet",
      desc: "Our fleet of school vans offers a secure and punctual pick-and-drop service covering Usman Abad, Mingora, Deolai, and neighboring areas under supervision.",
      icon: Truck,
      badge: "Mingora Wide",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Secure Guarded Campus",
      desc: "Your child's safety is our topmost priority. Our campus is guarded by professional security personnel, 24/7 CCTV camera coverage, and gated entry systems.",
      icon: ShieldCheck,
      badge: "24/7 Protected",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  const testimonials = [
    {
      quote: "The transition of my kids to this school has been wonderful. The focus on both modern English-medium education and character building in Mingora is unmatched.",
      author: "Irshad Ahmad",
      role: "Parent of Grade 4 & 7 Students",
      rating: 5
    },
    {
      quote: "The computer labs and science experiments have made my daughter incredibly excited about school. She looks forward to her coding classes every single week!",
      author: "Saima Shah",
      role: "Parent of Grade 5 Student",
      rating: 5
    },
    {
      quote: "The teachers here genuinely care about your future. They gave me the absolute academic foundation and confidence to pursue higher engineering studies.",
      author: "Zubair Khan",
      role: "Academy Outstanding Alumnus",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "What curriculum does The Best Schooling Academy follow?",
      a: "We deliver an English-medium curriculum aligned with global standards, heavily focused on science, technology, engineering, mathematics (STEM), languages, and character building."
    },
    {
      q: "What is the process for securing admissions?",
      a: "Admissions begin with an entry assessment test to understand the child's academic placement, followed by a parent interview. You can request admission details directly from our contact page or by visiting the Usman Abad campus desk."
    },
    {
      q: "Does the school provide reliable transport services?",
      a: "Yes, we have a highly disciplined, safe, and punctual school van network that provides pick-and-drop services across Usman Abad, Mingora city, and surrounding sectors in Swat."
    },
    {
      q: "How can parents check student exam results online?",
      a: "We have an interactive online Results Portal where parents can easily input their child's Roll Number to instantly access, view, and download detailed mid-term and annual academic report cards."
    },
    {
      q: "Are co-curricular and sports facilities available?",
      a: "Absolutely! We organize regular sports competitions, speech and debate contests, STEM and scientific exhibitions, and cultural days to foster holistic growth, physical fitness, and leadership."
    }
  ];

  const siteMapDirectory = [
    {
      title: "About Our Academy",
      desc: "Learn about our vision, dedicated founder, outstanding teaching faculty, and history in Swat Valley.",
      link: "/about",
      cta: "Read Our Story"
    },
    {
      title: "Online Results Portal",
      desc: "Check mid-term and final examination report cards online with single-click roll number access.",
      link: "/results",
      cta: "Check Report Cards"
    },
    {
      title: "Notice Board & Alerts",
      desc: "Read the latest holiday notifications, schedules, urgent updates, and upcoming milestones.",
      link: "/notifications",
      cta: "View Notices"
    },
    {
      title: "Admissions & Help Desk",
      desc: "Ready to enroll or have queries? Ask questions or request an admission callback instantly.",
      link: "/contact",
      cta: "Contact Admission Desk"
    },
    {
      title: "Events & Life Gallery",
      desc: "Browse premium photographs of sports activities, computer labs, and celebrations at the school.",
      link: "/events",
      cta: "Browse Gallery"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center parallax-bg"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(152 55% 10% / 0.92) 0%, hsl(152 45% 18% / 0.85) 50%, hsl(152 35% 22% / 0.80) 100%), url('${settings.heroBgImage || "/primary_campus.jpg"}')`,
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(43_90%_52%)/20] border border-[hsl(43_90%_52%)/40] text-[hsl(43_90%_70%)] text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[hsl(43_90%_52%)] animate-spin-slow" /> Usman Abad, Mingora, Swat Pakistan
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.7, delay: isMobile ? 0.05 : 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tight"
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
            className="text-xl sm:text-2xl text-green-100 font-light italic mb-8 max-w-3xl mx-auto"
          >
            "{settings.heroSubtitle}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.2 : 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] font-bold rounded-lg hover:bg-[hsl(43_90%_45%)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              data-testid="link-admissions"
            >
              Admissions Open 2026 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/results"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white transition-all"
              data-testid="link-results"
            >
              Check Online Results <BookOpen className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-white/60 hover:text-white transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-[hsl(43_90%_52%)]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-[hsl(152_55%_14%)] py-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <CounterCard value={settings.totalStudents} label="Active Students" icon={Users} />
          <CounterCard value={settings.totalTeachers} label="Qualified Scholars" icon={Award} />
          <CounterCard value={settings.computerLabs} label="STEM Computer Labs" icon={Monitor} />
          <CounterCard value={settings.libraryBooks} label="Library Resources" icon={Library} />
        </div>
      </section>

      {/* Active Notices Panel */}
      {activeNotices.length > 0 && (
        <section className="py-16 bg-background relative border-b border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-[hsl(43_90%_52%)] text-xs font-bold tracking-widest uppercase mb-1 block">Live Updates</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Notice Board</h2>
              <div className="gold-divider max-w-[120px] mx-auto" />
            </div>
            <div className="space-y-4">
              {activeNotices.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 5 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: isMobile ? i * 0.04 : i * 0.08, duration: 0.35 }}
                  className={`flex items-start gap-4 p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${
                    n.level === "urgent"
                      ? "bg-red-50/50 border-red-200"
                      : n.level === "holiday"
                      ? "bg-green-50/50 border-green-200"
                      : "bg-card border-border"
                  }`}
                  data-testid={`notice-item-${n.id}`}
                >
                  <span className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                    n.level === "urgent" ? "bg-red-100 text-red-700" :
                    n.level === "holiday" ? "bg-green-100 text-green-700" :
                    "bg-[hsl(152_25%_90%)] text-[hsl(152_55%_18%)]"
                  }`}>
                    {n.level}
                  </span>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-medium leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-muted-foreground mt-1.5 block">Official Announcement desk</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/notifications" className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline text-sm group">
                View Complete Archive <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Academic Programs (Our Services) */}
      <section className="py-20 bg-[hsl(152_25%_97%)] relative border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[hsl(152_55%_22%)] text-xs font-bold tracking-widest uppercase mb-1.5 block">Nurturing Excellence</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">Our Academic Pathways</h2>
            <div className="gold-divider max-w-[150px] mx-auto mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Our structured educational programs are designed to inspire critical thinking, logic, and core human values at every age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, idx) => {
              const isExpanded = expandedProgram === p.id;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  onClick={() => setExpandedProgram(isExpanded ? null : p.id)}
                  className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group select-none ${
                    isExpanded 
                      ? "border-primary shadow-md ring-1 ring-primary/30" 
                      : "border-border shadow-sm hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider mb-3">
                        {p.ageGroup}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <motion.div 
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/60 flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-dashed border-border mt-4 pt-4"
                      >
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[hsl(43_90%_52%)]" /> Key Program Highlights:
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {p.details.map((detail, dIdx) => (
                            <motion.li 
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIdx * 0.05 }}
                              key={dIdx} 
                              className="flex items-start gap-2"
                            >
                              <span className="text-[hsl(43_90%_52%)] font-bold mt-0.5">•</span>
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <div className="text-xs font-bold text-primary flex items-center gap-1.5 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      Click to reveal features <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Facilities (Services & Highlights Bento Grid) */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[hsl(43_90%_52%)] text-xs font-bold tracking-widest uppercase mb-1.5 block">Our Campus Life</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">Premium Facilities & Services</h2>
            <div className="gold-divider max-w-[150px] mx-auto mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              We provide a safe, modern, and inspiring ecosystem that empowers boys and girls to study with full focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
            {facilities.map((fac, idx) => {
              const IconComp = fac.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: isMobile ? 1 : 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className={`${fac.className} bg-card hover:bg-card/80 border border-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden flex flex-col justify-between`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 bg-secondary text-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {fac.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {fac.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {fac.desc}
                    </p>
                  </div>
                  
                  <div className="border-t border-dashed border-border/60 pt-4 mt-2">
                    <span className="text-xs font-semibold text-primary/80 flex items-center gap-1 group-hover:text-primary transition-colors">
                      Fully Operational <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(43_90%_52%)]" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parent & Alumnus Testimonials (Social Proof) */}
      <section className="py-20 bg-[hsl(152_25%_97%)] relative border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[152_55%_18%] text-xs font-bold tracking-widest uppercase mb-1.5 block">Community Voice</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Voices of our Parents & Alumni</h2>
            <div className="gold-divider max-w-[120px] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: isMobile ? 10 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[hsl(43_90%_52%)]">
                    {Array.from({ length: t.rating }).map((_, rIdx) => (
                      <span key={rIdx} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-foreground text-sm italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="border-t border-border pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-primary">
                    {t.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground text-sm">{t.author}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Live Feedback Hub */}
      <FeedbackHub />

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[hsl(43_90%_52%)] text-xs font-bold tracking-widest uppercase mb-1.5 block">Clear Answers</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
            <div className="gold-divider max-w-[120px] mx-auto" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-border rounded-xl bg-card overflow-hidden transition-colors duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-foreground hover:text-primary transition-colors focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-muted-foreground flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-secondary/30"
                      >
                        <div className="p-5 border-t border-border text-muted-foreground text-sm leading-relaxed text-left">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Quick-Access Directory (Solves the Menu Visibility Pain-Point!) */}
      <section className="py-20 bg-[hsl(152_55%_10%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImcxIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDIxNSw2NCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cxKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[hsl(43_90%_52%)] text-xs font-bold tracking-widest uppercase mb-1.5 block">Easy Navigation Directory</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Explore Our Academy Instantly</h2>
            <div className="gold-divider max-w-[150px] mx-auto mb-4" />
            <p className="text-green-100 text-sm sm:text-base max-w-2xl mx-auto">
              Can't find the menu? We've mapped out our entire campus and online services directly below so you can visit any portal in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteMapDirectory.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: isMobile ? 10 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[hsl(43_90%_52%)]/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(43_90%_52%)] animate-pulse" /> {item.title}
                  </h3>
                  <p className="text-green-100/70 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[hsl(43_90%_52%)] group-hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Admissions Call to Action banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[hsl(43_90%_52%)]/20 to-transparent border border-[hsl(43_90%_52%)]/30 flex flex-col md:flex-row justify-between items-center gap-6 text-left"
          >
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Enroll Your Child Today</h3>
              <p className="text-green-100/80 text-sm max-w-xl">
                Admissions are open for the academic year 2026. Secure a seat in Swat Valley's elite schooling system with certified STEM excellence and outstanding facilities.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] font-extrabold rounded-xl hover:bg-[hsl(43_90%_45%)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center whitespace-nowrap"
            >
              Start Admission Process
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Simple fallback helper for the Flask icon since Lucide imports require exact matches
const Flask = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 3h12" />
    <path d="M12 3v12" />
    <path d="M18 21a6 6 0 0 1-12 0c0-3 2-6 2-9h8c0 3 2 6 2 9Z" />
  </svg>
);

