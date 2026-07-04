import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Notification, Result, SchoolEvent, SchoolSettings } from "@/types";

interface SchoolContextType {
  notifications: Notification[];
  results: Result[];
  events: SchoolEvent[];
  settings: SchoolSettings;
  addNotification: (n: Omit<Notification, "id" | "timestamp">) => Promise<void>;
  updateNotification: (id: string, data: Partial<Notification>) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addResult: (r: Omit<Result, "id">) => Promise<void>;
  updateResult: (id: string, data: Partial<Result>) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;
  addEvent: (e: Omit<SchoolEvent, "id">) => Promise<void>;
  updateEvent: (id: string, data: Partial<SchoolEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateSettings: (data: Partial<SchoolSettings>) => Promise<void>;
}

const defaultSettings: SchoolSettings = {
  heroTitle: "YOSU INTERNATIONAL SCHOOL",
  heroSubtitle: "Nurturing Excellence, Building Futures",
  phone: "+92 344 9757557",
  email: "info@d.yosu.edu.pk",
  address: "Shah je market opposite Arshad Super store, Deolai Swat Pakistan",
  curriculumStatement:
    "We deliver an English-medium international curriculum rooted in STEM excellence, character development, and the rich cultural heritage of Swat Valley.",
  totalStudents: 850,
  totalTeachers: 42,
  computerLabs: 3,
  libraryBooks: 5000,
};

const SchoolContext = createContext<SchoolContextType>({} as SchoolContextType);

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [settings, setSettings] = useState<SchoolSettings>(defaultSettings);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notification)));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "results"), orderBy("studentName"));
    const unsub = onSnapshot(q, (snap) => {
      setResults(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Result)));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SchoolEvent)));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const ref = doc(db, "schoolSettings", "main");
    const unsub = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        setSettings({ ...defaultSettings, ...snap.data() } as SchoolSettings);
      } else {
        await setDoc(ref, defaultSettings);
      }
    });
    return unsub;
  }, []);

  const addNotification = async (n: Omit<Notification, "id" | "timestamp">) => {
    await addDoc(collection(db, "notifications"), { ...n, timestamp: Date.now() });
  };
  const updateNotification = async (id: string, data: Partial<Notification>) => {
    await updateDoc(doc(db, "notifications", id), data);
  };
  const deleteNotification = async (id: string) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  const addResult = async (r: Omit<Result, "id">) => {
    await addDoc(collection(db, "results"), r);
  };
  const updateResult = async (id: string, data: Partial<Result>) => {
    await updateDoc(doc(db, "results", id), data);
  };
  const deleteResult = async (id: string) => {
    await deleteDoc(doc(db, "results", id));
  };

  const addEvent = async (e: Omit<SchoolEvent, "id">) => {
    await addDoc(collection(db, "events"), e);
  };
  const updateEvent = async (id: string, data: Partial<SchoolEvent>) => {
    await updateDoc(doc(db, "events", id), data);
  };
  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  const updateSettings = async (data: Partial<SchoolSettings>) => {
    await setDoc(doc(db, "schoolSettings", "main"), { ...settings, ...data });
  };

  return (
    <SchoolContext.Provider
      value={{
        notifications,
        results,
        events,
        settings,
        addNotification,
        updateNotification,
        deleteNotification,
        addResult,
        updateResult,
        deleteResult,
        addEvent,
        updateEvent,
        deleteEvent,
        updateSettings,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchool = () => useContext(SchoolContext);
