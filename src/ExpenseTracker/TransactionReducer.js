const loadState = () => {
    try {
        const serialState = localStorage.getItem('transactionList');
        const budgetLs = localStorage.getItem('budget');
        if (serialState === null){
            return {}
        }
        return {transactionList: JSON.parse(serialState),
                budget: budgetLs};
    } catch (err) {
        return {};
    }
};

const transactionListFromLs = loadState();
console.log(transactionListFromLs)

const initState = {
    budget: 0.00,
    transactionList: [
        {date: '28/04/2022', description: 'Haorgani', sum: 435.06, payment: 'mastercard', id: 1},
        {date: '29/04/2022', description: 'Loccitane', sum: 377.50, payment: 'amex', id: 2}
    ],
    ...transactionListFromLs,
}

const TransactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SAVE_BUDGET':
            return {
                ...state,
                budget: action.newBudget
            }

        case 'SAVE_DATE':
            return {
                ...state,
                date: action.newDate
            }
    
        case 'SAVE_DESCRIPTION':
            return {
                ...state,
                description: action.newDescription
            }
   
        case 'SAVE_SUM':
            return {
                ...state,
                sum: action.newSum
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactionList: [...state.transactionList, action.newTransaction]
            }
        
        case 'DELETE_TRANSACTION':
            let restTransactionList = state.transactionList.filter(el => {
                return el.id !== action.id
            });
            return {
                ...state,
                transactionList: restTransactionList
            }
    
        default:
            return state
    }
}

export default TransactionReducer;