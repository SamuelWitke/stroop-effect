let nextQuestion =0;
export const addQuestion = (color,colors) => ({
    type: 'ADD_QUESTION',
    id: nextQuestion++,
    color,
    colors
})

export const toggleQuestion = id => ({
  type: 'TOGGLE_QUESTION',
  id
})
