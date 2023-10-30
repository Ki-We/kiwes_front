interface ChatRoom {
  id: string;
  title: string;
  lastChatContent: string | null;
  lastChatDate: Date | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  numberOfUsers: number;
}
