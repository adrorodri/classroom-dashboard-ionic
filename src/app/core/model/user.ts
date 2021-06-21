export interface User {
  activities: PresentedActivity[];
  activities_grades: ActivityGrade[];
  discordName: string;
  attendance: string[];
  discordId: string;
  exam_grades: ExamGrade[];
  participations: string[];
  universityId: string;
  name: string;
  presence: string[];
  lastPresence: string;
}

export interface PresentedActivity {
  activity: string;
  presentation: string;
  time: string;
}

export interface ActivityGrade {
  activity: string;
  grade: string;
}

export interface ExamGrade {
  partialName: string;
  grade: string;
}
