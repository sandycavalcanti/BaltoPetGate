export default [
  {
    _id: 9,
    text: '#awesome 3',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 8,
    text: '#awesome 2',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 7,
    text: '#awesome',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 6,
    text: 'Paris',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/280px-Paris_-_Eiffelturm_und_Marsfeld2.jpg',
    sent: true,
    received: true,
  },
  {
    _id: 5,
    text: 'Send me a picture!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 4,
    text: '',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
    location: {
      latitude: 48.864601,
      longitude: 2.398704,
    },
  },
  {
    _id: 3,
    text: 'Where are you?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 2,
    text: 'Yes, and I use #GiftedChat!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
  },
  {
    _id: 1,
    text: 'Are you building a chat app?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
]
