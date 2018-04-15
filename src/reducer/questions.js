const questions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [
        ...state,
        {
          id: action.id,
          color: action.color,
          colors: action.colors,
          completed: false
        }
      ]
    case 'TOGGLE_QUESTION':
      return state.map( question =>
        (question.id === action.id)
          ? {...question, completed: !question.completed}
          : question 
      )
    default:
      return state
  }
}

export default questions; 
