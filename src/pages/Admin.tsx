import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bell, CalendarDays, GraduationCap, Settings2, Lock } from "lucide-react";
import AdminNotices from "@/components/admin/AdminNotices";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminResults from "@/components/admin/AdminResults";
import AdminSettings from "@/components/admin/AdminSettings";

const ADMIN_PASSWORD = "yosu@2026";

const tabs = [
  { id: "notices", label: "Notice Desk", icon: Bell },
  { id: "events", label: "Events & Media", icon: CalendarDays },
  { id: "results", label: "Result Registry", icon: GraduationCap },
  { id: "settings", label: "About & Settings", icon: Settings2 },
];

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("notices");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[hsl(152_55%_10%)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[hsl(43_90%_52%)] flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[hsl(152_55%_10%)]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Desk</h1>
            <p className="text-muted-foreground text-sm mt-1">YOSU International School</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    error ? "border-destructive focus:ring-destructive/50" : "border-input focus:border-primary"
                  }`}
                  data-testid="input-admin-password"
                />
              </div>
              {error && <p className="text-destructive text-xs mt-1.5">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
              data-testid="button-admin-login"
            >
              Access Admin Desk
            </button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-4">Authorised personnel only</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <div className="bg-[hsl(152_55%_14%)] text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[hsl(43_90%_52%)]" />
            <div>
              <p className="font-serif font-bold text-white">Admin Desk</p>
              <p className="text-green-300 text-xs">YOSU International School</p>
            </div>
          </div>
          <button
            onClick={() => setUnlocked(false)}
            className="text-xs text-green-300 hover:text-white border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
            data-testid="button-admin-logout"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "notices" && <AdminNotices />}
        {activeTab === "events" && <AdminEvents />}
        {activeTab === "results" && <AdminResults />}
        {activeTab === "settings" && <AdminSettings />}
      </div>
    </div>
  );
}
