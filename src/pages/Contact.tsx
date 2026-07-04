import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Navigation, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const whatsappLink = `https://wa.me/923449757557?text=${encodeURIComponent("Hello YOSU International School, I would like to enquire about admissions.")}`;
  const mapLink = "https://maps.google.com/?q=Shah+je+market+opposite+Arshad+Super+store+Deolai+Swat+Pakistan";

  return (
    <div className="py-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: isMobile ? -5 : -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.35 : 0.6 }} className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-3">Contact Us</h1>
          <div className="gold-divider max-w-[100px] mx-auto" />
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">We'd love to hear from you. Reach out for admissions, queries, or a school visit.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info panel */}
          <div className="space-y-5">
            {/* Contact cards */}
            {[
              {
                icon: Phone,
                title: "Phone",
                detail: "+92 344 9757557",
                action: () => window.open("tel:+923449757557"),
                cta: "Call Now",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "info@d.yosu.edu.pk",
                action: () => window.open("mailto:info@d.yosu.edu.pk"),
                cta: "Send Email",
              },
              {
                icon: MapPin,
                title: "Address",
                detail: "Shah je market opposite Arshad Super store, Deolai Swat Pakistan",
                action: () => window.open(mapLink, "_blank"),
                cta: "Get Directions",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 5 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: isMobile ? i * 0.04 : i * 0.1, duration: 0.35 }}
                className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[hsl(152_25%_90%)] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{item.title}</p>
                  <p className="text-foreground text-sm">{item.detail}</p>
                </div>
                <button
                  onClick={item.action}
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {item.cta}
                </button>
              </motion.div>
            ))}

             {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.2 : 0.4, duration: 0.35 }}
              className="grid grid-cols-2 gap-3"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-md"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Chat
              </a>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md"
                data-testid="link-directions"
              >
                <Navigation className="w-5 h-5" />
                Google Maps
              </a>
            </motion.div>

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.3 : 0.5, duration: 0.35 }}
              className="rounded-xl overflow-hidden border border-border aspect-video"
            >
              <iframe
                src="https://maps.google.com/maps?q=Deolai+Swat+Pakistan&z=14&output=embed"
                className="w-full h-full"
                loading="lazy"
                title="School location map"
              />
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.1 : 0.2, duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Message Received!</h3>
                <p className="text-muted-foreground text-sm">We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    data-testid="select-subject"
                  >
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Enquiry</option>
                    <option value="fee">Fee Structure</option>
                    <option value="results">Results</option>
                    <option value="general">General Query</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Type your message here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    data-testid="textarea-message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
                  data-testid="button-send"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
