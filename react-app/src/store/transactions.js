const GET_ALL_TRANSACTIONS = 'transactions/GET_ALL_TRANSACTIONS'
const POST_TRANSACTION = 'transactions/POST_TRANSACTION'
// const EDIT_TRANSACTION =   'transactions/EDIT_TRANSACTION'
// const DELETE_TRANSACTION = 'transactions/ DELETE_TRANSACTION'


const getAll = (everyTransaction) => ({
  type: GET_ALL_TRANSACTIONS,
  everyTransaction
})

const postATransaction = (createdTransaction) => ({
  type: POST_TRANSACTION,
  createdTransaction
})

// const editATransaction = () => ({
//   type: EDIT_TRANSACTION,

// })

// const deleteATransaction = () => ({
//   type: DELETE_TRANSACTION,

// })


export const getAllTransactions = (userId) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${userId}`);
  console.log("RESPONSE", response)
  if(response.ok) {
    const everyTransaction = await response.json();
    dispatch(getAll(everyTransaction))
  }
}


export const createTransaction = (payload, userId) => async (dispatch) => {
  // console.log("In thunk---", payload)
  const response = await fetch(`/api/transactions/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const createdTransaction = await response.json();
    dispatch(postATransaction(createdTransaction));
    console.log("IN THUNK DISPATCHED",createdTransaction)
    return createdTransaction;
  }
}





const initialState = {allTransactions: {}}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS: {
      const newState = {allTransactions: {}}
      action.everyTransaction.transactions.forEach(transaction => {
        newState.allTransactions[transaction.id] = transaction
      });
      return newState
    }
    case POST_TRANSACTION: {
      const newState = {...state, allTransactions: {...state.allTransactions} }
      console.log("ACTION",action )
      newState.allTransactions[action.createdTransaction.id] = action.createdTransaction;
      return newState
    }
    default:
      return state
  }

}


export default transactionsReducer
