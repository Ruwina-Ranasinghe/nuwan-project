'use client';
import { useState, useEffect } from 'react';
import { Class } from '@/types/class';
import { getClasses } from '../firebase/firestore';

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const classesData = await getClasses();
      setClasses(classesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch classes');
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return { classes, loading, error, refetch: fetchClasses };
};