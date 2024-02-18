import { Attachment } from "./attachment.interface";
import { Receiver } from "./receiver.interface";
import { ReplyToMessage } from "./reply-to-message.interface";

export interface Message {
  messageId?: number;
  message?: string;
  createdAt?: string;
  createdBy?: number;
  viewed?: boolean;
  subjectId?: number;
  accessToken?: string;
  toUserId?: number;
  isAttachment?: boolean;
  error?: string;
  attachments? : Attachment[];
  totalUploads?: number;
  replyToMessageId?: number | null;
  receiver?: Receiver;
  replyToMessage?: ReplyToMessage;
  highlightMessageOnScrollIntoView?: boolean;
}
