export const mockPosts = [
  {
    id: '1',
    title: 'Bienvenidos al nuevo foro de la comunidad',
    content: '¡Hola a todos! Este es el primer post del foro. Aquí podremos compartir ideas, hacer preguntas y ayudarnos mutuamente.',
    author: 'Admin',
    createdAt: '2024-03-20T10:00:00Z',
    reactions: [
      { emoji: '👍', count: 5, users: ['user1', 'user2', 'user3', 'user4', 'user5'] },
      { emoji: '❤️', count: 3, users: ['user1', 'user2', 'user3'] }
    ],
    rating: {
      value: 5,
      count: 3,
      average: 4.7,
      users: [
        { userId: 'user1', rating: 5 },
        { userId: 'user2', rating: 4 },
        { userId: 'user3', rating: 5 }
      ]
    },
    comments: [
      {
        id: '1',
        content: '¡Excelente iniciativa! Estoy seguro que será de gran ayuda para todos.',
        author: 'Usuario1',
        createdAt: '2024-03-20T10:30:00Z',
        reactions: [
          { emoji: '👍', count: 2, users: ['user2', 'user3'] }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Tips para mejorar el rendimiento de tu sitio web',
    content: 'Aquí les comparto algunos consejos para optimizar el rendimiento de sus sitios web...',
    author: 'WebDev',
    createdAt: '2024-03-19T15:00:00Z',
    reactions: [
      { emoji: '👍', count: 8, users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8'] },
      { emoji: '😮', count: 2, users: ['user9', 'user10'] }
    ],
    rating: {
      value: 5,
      count: 4,
      average: 4.5,
      users: [
        { userId: 'user1', rating: 5 },
        { userId: 'user2', rating: 4 },
        { userId: 'user3', rating: 5 },
        { userId: 'user4', rating: 4 }
      ]
    },
    comments: []
  }
]; 