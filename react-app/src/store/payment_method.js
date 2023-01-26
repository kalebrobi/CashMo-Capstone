const GET_ALL_PAYMENT_METHODS = 'payment-method/GET_ALL_PAYMENT_METHODS'
const POST_PAYMENT_METHOD = 'payment-method/POST_PAYMENT_METHOD'
// const DELETE_PAYMENT_METHOD = 'payment-method/DELETE_PAYMENT_METHOD'





const getAll = (payment_methods) => ({
  type: GET_ALL_PAYMENT_METHODS,
  payment_methods
})

const postACard = (payment_method) => ({
  type: POST_PAYMENT_METHOD,
  payment_method
})

// const deleteCard = (payment_method) => ({
//   type: POST_PAYMENT_METHOD,
//   payment_method
// })






export const getAllPmtMethods = () => async (dispatch) => {
  const response = await fetch(`/api/paymentmethod/`);
  if(response.ok) {
    const payment_methods = await response.json();
    dispatch(getAll(payment_methods))
  }
  return response
}


export const createCard = (newCard) => async (dispatch) => {
  const response = await fetch('/api/paymentmethod/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCard)
  })


  if(response.ok) {
    const createdNewCard = await response.json();
    dispatch(postACard(createdNewCard));
    return createdNewCard
  } else {
    const badData = await response.json();
    console.log('BadDattaaa', badData.errors)
    return badData
  }
}






const initialState = { allPaymentMethods: {}}

const paymentMethodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAYMENT_METHODS: {
      const newState = { allPaymentMethods: {}}
      action.payment_methods.cards.forEach(card => {
      newState.allPaymentMethods[card.id] = card
    });
      return newState
    }
    case POST_PAYMENT_METHOD: {
      const newState = {...state, allPaymentMethods: {...state.allPaymentMethods}}
      newState.allPaymentMethods[action.payment_method.id] = action.payment_method;
      return newState
    }
    default:
      return state
  }
}


export default paymentMethodsReducer
