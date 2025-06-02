import { db } from './config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { Class, Comment, ClassFile } from '@/types/class';

// Classes
export const getClasses = async (): Promise<Class[]> => {
  const q = query(collection(db, 'classes'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Class));
};

export const getClass = async (id: string): Promise<Class | null> => {
  const docRef = doc(db, 'classes', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Class : null;
};

export const createClass = async (classData: Omit<Class, 'id'>) => {
  return await addDoc(collection(db, 'classes'), classData);
};

// Comments
export const getComments = async (classId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, 'comments'), 
    where('classId', '==', classId),
    orderBy('createdAt', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
};

export const addComment = async (commentData: Omit<Comment, 'id'>) => {
  return await addDoc(collection(db, 'comments'), commentData);
};

// Files
export const getClassFiles = async (classId: string): Promise<ClassFile[]> => {
  const q = query(
    collection(db, 'classFiles'),
    where('classId', '==', classId),
    orderBy('uploadedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClassFile));
};

export const addClassFile = async (fileData: Omit<ClassFile, 'id'>) => {
  return await addDoc(collection(db, 'classFiles'), fileData);
};