import api from './api';

export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  author: string;
  author_name: string;
  category: number;
  category_name: string;
  is_pinned: boolean;
  is_closed: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  replies_count: number;
  votes_count: number;
  user_vote: number;
}

export interface ForumReply {
  id: number;
  topic: number;
  content: string;
  author: string;
  author_name: string;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
  votes_count: number;
  user_vote: number;
}

const forumService = {
  // Topics
  getTopics: async () => {
    const response = await api.get<ForumTopic[]>('/forum/topics/');
    return {
      data: Array.isArray(response.data) ? response.data : []
    };
  },
  getTopic: (id: number) => api.get<ForumTopic>(`/forum/topics/${id}/`),
  createTopic: (data: Partial<ForumTopic>) => api.post<ForumTopic>('/forum/topics/', data),
  updateTopic: (id: number, data: Partial<ForumTopic>) => api.put<ForumTopic>(`/forum/topics/${id}/`, data),
  deleteTopic: (id: number) => api.delete(`/forum/topics/${id}/`),
  voteTopic: (id: number, value: number) => api.post(`/forum/topics/${id}/vote/`, { value }),

  // Replies
  getReplies: (topicId: number) => api.get<ForumReply[]>(`/forum/topics/${topicId}/replies/`),
  createReply: (data: Partial<ForumReply>) => api.post<ForumReply>('/forum/replies/', data),
  updateReply: (id: number, data: Partial<ForumReply>) => api.put<ForumReply>(`/forum/replies/${id}/`, data),
  deleteReply: (id: number) => api.delete(`/forum/replies/${id}/`),
  voteReply: (id: number, value: number) => api.post(`/forum/replies/${id}/vote/`, { value }),
  markAsSolution: (id: number) => api.post(`/forum/replies/${id}/mark_as_solution/`),
};

export default forumService; 