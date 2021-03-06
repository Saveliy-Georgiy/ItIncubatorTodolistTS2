type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state, name: action.name}
        default:
            return state
    }
}

export const incAgeAC = () => {
    return {
        type: 'INCREMENT-AGE',
    }
}

export const incChildrenCountAC = () => {
    return {
        type: 'INCREMENT-CHILDREN-COUNT'
    }
}

export const changeNameAC = (newName: string) => {
    return {
        type: 'CHANGE-NAME',
        name: newName
    }
}