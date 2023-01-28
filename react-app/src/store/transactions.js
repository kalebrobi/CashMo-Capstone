const GET_ALL_TRANSACTIONS = 'transactions/GET_ALL_TRANSACTIONS'
// const POST_TRANSACTIONS = 'transactions/POST_TRANSACTION'
// const EDIT_TRANSACTION =   'transactions/EDIT_TRANSACTION'
// const DELETE_TRANSACTION = 'transactions/ DELETE_TRANSACTION'


const getAll = (everyTransaction) => ({
  type: GET_ALL_TRANSACTIONS,
  everyTransaction
})

// const postATransaction = () => ({
//   type: POST_TRANSACTION,

// })

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
    default:
      return state
  }

}


export default transactionsReducer
