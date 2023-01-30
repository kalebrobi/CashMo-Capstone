const GET_ALL_TRANSACTIONS = 'transactions/GET_ALL_TRANSACTIONS'
const POST_TRANSACTION = 'transactions/POST_TRANSACTION'
const UPDATE_TRANSACTION =   'transactions/UPDATE_TRANSACTION'
const DELETE_TRANSACTION = 'transactions/ DELETE_TRANSACTION'


const getAll = (everyTransaction) => ({
  type: GET_ALL_TRANSACTIONS,
  everyTransaction
})

const postATransaction = (createdTransaction) => ({
  type: POST_TRANSACTION,
  createdTransaction
})


const updateATransaction = (transaction) => ({
  type: UPDATE_TRANSACTION,
  transaction
});


const deleteATransaction = (deleteId) => ({
  type: DELETE_TRANSACTION,
  deleteId

})


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

export const updateTransaction = (payload, id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const updatedTransaction = await response.json();
    dispatch(updateATransaction(updatedTransaction));
    return updatedTransaction;
  }

};


export const deleteTransaction = (deleteId) => async(dispatch) => {
  const response = await fetch(`/api/transactions/${deleteId}`, {
    method: 'DELETE'
  })

  if (response.ok){
    const deletionTransaction = await response.json()

    dispatch(deleteATransaction(deleteId))
    return deletionTransaction
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
      newState.allTransactions[action.createdTransaction.id] = action.createdTransaction;
      return newState
    }
    case UPDATE_TRANSACTION: {
      const newState = {...state, allTransactions: {...state.allTransactions} }
      newState.allTransactions[action.transaction.id] = action.transaction
      return newState
    }
    case DELETE_TRANSACTION: {
      const newState = {...state}
      const newObj = {...state.allTransactions}
      delete newObj[action.deleteId]
      newState.allTransactions = newObj
      return newObj
    }
    default:
      return state
  }

}


export default transactionsReducer
