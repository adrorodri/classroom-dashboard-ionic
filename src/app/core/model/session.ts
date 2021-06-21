export interface Session {
  attendance: string[];
  attendanceCode: string;
  date: string;
  name: string;
  participations: string[];
  resources: SessionResource[];
}

export interface SessionResource {
  name: string;
  value: string;
}
