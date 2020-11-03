type UserType = {
    name: string
    age: number
    childrenCount: number
}
type ActionType ={
    type: string
    [key: string]: any
}

export const userReducer = (user: UserType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT_AGE":
            return {...user, age: user.age + 1}
        case "INCREMENT_CHILDREN_COUNT":
            return {...user, childrenCount: user.childrenCount + 1}
        case 'CHANGE_NAME':
            return {...user, name: action.name}
        default:
            throw new Error("I don't understand this type")
    }
}
