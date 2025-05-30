export interface ForumMessage {
  id: string;
  author: string;
  content: string;
  date: Date;
  likes: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  date: Date;
  likes: number;
} 