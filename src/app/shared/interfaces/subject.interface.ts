export interface Subject {
  title?: string;
  providerId?: number | null;
  clientProviderId?:number | null;
  subjectId?: number;
  newMessageCount?: number;
}
