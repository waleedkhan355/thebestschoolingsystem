export interface Notification {
  id: string;
  message: string;
  level: "info" | "urgent" | "holiday";
  timestamp: number;
  active: boolean;
}

export interface SubjectMark {
  subjectName: string;
  scored: number;
  total: number;
}

export interface Result {
  id: string;
  rollNumber: string;
  studentName: string;
  gradeClass: string;
  examTerm: string;
  marks: SubjectMark[];
  status: "Pass" | "Fail";
  remarks: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnail: string;
}

export interface SchoolSettings {
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  curriculumStatement: string;
  totalStudents: number;
  totalTeachers: number;
  computerLabs: number;
  libraryBooks: number;
}

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timestamp: number;
}

