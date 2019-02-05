const initialState = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente in officia eaque ab vel, minus fuga voluptate asperiores veritatis numquam!',
    city: 'London, UK',
    venue: "Tower of London, St Katherine's & Wapping, London",
    hostedBy: 'Bob',
    hostedPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Stefan',
        photoURL: 'https://randomuser.me/api/portraits/men/25.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to the Colloseum',
    date: '2018-03-27',
    category: 'culture',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente in officia eaque ab vel, minus fuga voluptate asperiores veritatis numquam!',
    city: 'London, UK',
    venue: "Tower of London, St Katherine's & Wapping, London",
    hostedBy: 'Bob',
    hostedPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'c',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'd',
        name: 'Stefan',
        photoURL: 'https://randomuser.me/api/portraits/men/25.jpg'
      }
    ]
  }
]

const eventReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_EVENT':
      return [...state, action.payload.event]
    case 'UPDATE_EVENT':
      return [...state.filter(event => event.id !== action.payload.event.id), Object.assign({}, action.payload.event)]
    case 'DELETE_EVENT':
      return [...state.filter(event => event.id !== action.payload.eventId)]
    default:
      return state
  }
}

export default eventReducer
