'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getComments, addComment } from '@/lib/firebase/firestore';
import { Comment } from '@/types/class';
import Image from 'next/image';

interface CommentSectionProps {
  classId: string;
}

export default function CommentSection({ classId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

    fetchComments();
  }, [classId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || submitting) return;

    setSubmitting(true);
    try {
      const commentData = {
        classId,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        content: newComment.trim(),
        createdAt: new Date(),
      };

      await addComment(commentData);
      
      // Add to local state immediately for better UX
      setComments([...comments, { ...commentData, id: Date.now().toString() }]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-4">
            <Image
              src={user.photoURL || '/default-avatar.png'}
              alt="Your avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Posting...' : 'Post'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex space-x-4"
              >
                <Image
                  src={comment.userPhoto || '/default-avatar.png'}
                  alt={comment.userName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {comment.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}