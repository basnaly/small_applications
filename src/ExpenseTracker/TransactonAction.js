

export const SaveBudget = (newBudget) => {
    return {
        type: 'SAVE_BUDGET',
        newBudget
    }
}

export const SaveDate = (id, newDate) => {
    return {
        type: 'SAVE_DATE',
        id,
        newDate
    }
}

export const SaveDescription = (id, newDescription) => {
    return {
        type: 'SAVE_DESCRIPTION',
        id,
        newDescription
    }
}

export const SaveSum = (id, newSum) => {
    return {
        type: 'SAVE_SUM',
        id,
        newSum
    }
}

export const AddTransaction = newTransaction => {
    return {
        type: 'ADD_TRANSACTION',
        newTransaction
    }
}

export const DeleteTransaction = id => {
    return {
        type: 'DELETE_TRANSACTION',
        id
    }
}