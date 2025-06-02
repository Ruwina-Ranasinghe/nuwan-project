'use client';
import { useState, useEffect } from 'react';
import { Comment } from '@/types/class';
import { getComments } from '../firebase/firestore';

export const useComments = (classId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(classId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchComments();
    }
  }, [classId]);

  return { comments, loading, setComments };
};