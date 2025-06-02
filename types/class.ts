export interface Class {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  teacherName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassFile {
  id: string;
  classId: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'document';
  uploadedAt: Date;
}

export interface Comment {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  createdAt: Date;
}