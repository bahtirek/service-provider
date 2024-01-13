export interface Message {
  messageId?: number;
  message?: string;
  createdAt?: string;
  createdBy?: number;
  viewed?: boolean;
  subjectId?: number;
  accessToken?: string;
  toUserId?: string;
}
