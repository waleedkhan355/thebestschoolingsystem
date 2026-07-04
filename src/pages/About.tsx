import { motion } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { Quote, Target, Eye, Star, Globe, Monitor, Dumbbell, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function About() {
  const { settings } = useSchool();
  const isMobile = useIsMobile();

  return (
    <div>
      {/* Hero banner */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(152 55% 10% / 0.93) 0%, hsl(152 45% 18% / 0.88) 100%), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: isMobile ? -5 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.35 : 0.6 }}
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
          >
            About Our School
          </motion.h1>
          <div className="gold-divider max-w-[100px] mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isMobile ? 0.1 : 0.2, duration: isMobile ? 0.35 : 0.5 }}
            className="mt-4 text-green-200 text-lg max-w-xl mx-auto"
          >
            Building generations of leaders in the breathtaking valley of Swat
          </motion.p>
        </div>
      </section>

      {/* Founder's message */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            className="bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-sm relative"
          >
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[hsl(43_90%_52%)/30]" />
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Founder's Message</h2>
              <div className="gold-divider max-w-[100px] mx-auto" />
            </div>
            <blockquote className="text-center">
              <p className="text-foreground text-lg sm:text-xl leading-relaxed italic font-serif mb-6">
                "Our vision has always been to bring world-class education to the children of Swat — a region of extraordinary potential and resilience.
                At YOSU International School, every child is a scholar in the making. We believe the mountains of Swat should produce minds that conquer
                the world's greatest challenges, armed with knowledge, integrity, and unwavering character."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[hsl(152_25%_90%)] flex items-center justify-center">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">The Founder</p>
                  <p className="text-muted-foreground text-sm">YOSU International School, Deolai</p>
                </div>
              </div>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[hsl(152_25%_96%)]">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Eye,
              title: "Our Vision",
              text: "To be the premier institution in Khyber Pakhtunkhwa delivering internationally benchmarked education that empowers every student to excel academically, ethically, and professionally in a rapidly changing global landscape.",
            },
            {
              icon: Target,
              title: "Our Mission",
              text: "To provide an English-medium, internationally-aligned curriculum within a nurturing environment that celebrates the cultural heritage of Swat while preparing students to compete and succeed at national and global levels.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
              transition={{ delay: isMobile ? i * 0.05 : i * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-8 border border-border shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(152_25%_90%)] flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Our Curriculum</h2>
            <div className="gold-divider max-w-[100px] mx-auto" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{settings.curriculumStatement}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BookOpen, title: "English Medium", desc: "Full English-language instruction from primary through secondary levels." },
              { icon: Globe, title: "International Standards", desc: "Curriculum benchmarked against Cambridge and international frameworks." },
              { icon: Monitor, title: "STEM Focus", desc: "Advanced science, technology, engineering, and mathematics tracks." },
              { icon: Dumbbell, title: "Sports Championships", desc: "Regional and district-level competition in cricket, football, and athletics." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-30px" }}
                transition={{ delay: isMobile ? i * 0.04 : i * 0.08, duration: 0.35 }}
                className="text-center p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[hsl(152_55%_14%)] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[hsl(43_90%_52%)]" />
                </div>
                <h4 className="font-serif font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-[hsl(152_55%_14%)] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Educational Milestones</h2>
            <div className="gold-divider max-w-[100px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { year: "Founded", event: "YOSU International School established in Deolai, Swat" },
              { year: "English Medium", event: "Launched full English-medium instruction across all classes" },
              { year: "Computer Labs", event: "Opened 3 state-of-the-art computer labs for digital literacy" },
              { year: "STEM Programme", event: "Introduced dedicated STEM curriculum with science experiments" },
              { year: "Library", event: "Library expanded to 5,000+ volumes and reference materials" },
              { year: "Sports", event: "Regional championship wins in cricket and football" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 6 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-30px" }}
                transition={{ delay: isMobile ? i * 0.04 : i * 0.08, duration: 0.35 }}
                className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-sm"
              >
                <span className="text-[hsl(43_90%_52%)] text-xs font-bold uppercase tracking-wider">{m.year}</span>
                <p className="text-green-100 text-sm mt-2 leading-relaxed">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
