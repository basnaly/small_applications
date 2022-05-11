
export const AddWord = addWord => {
    return {
        type: 'ADD_WORD',
        addWord
    }
}

export const DeleteWord = id => {
    return {
        type: 'DELETE_WORD',
        id
    }
}