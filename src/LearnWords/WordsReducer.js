const loadState = () => {
    try {
        const serialState = localStorage.getItem('listWords');
        if (serialState === null){
            return {}
        }
        return {listWords: JSON.parse(serialState)};
    } catch (err) {
        return {};
    }
};

const listWordsFromLs = loadState();
console.log(listWordsFromLs)

const initState = {
    listWords: [
        {word: 'house', description: 'a building for human habitation', id: 1},
        {word: 'kindred', description: 'one"s family and relation', id: 2},
        {word: 'definitely', description: 'without doubt', id: 3},
    ],
    ...listWordsFromLs,
}

const WordsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_WORD':
            return {
                ...state,
                listWords: [...state.listWords, action.addWord]
            }
        case 'DELETE_WORD':
            let restWords = state.listWords.filter(el => {
                return el.id !== action.id
            });
            return {
                ...state,
                listWords: restWords
            }

    default:
        return state
    
    }
}

export default WordsReducer