import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, { type: 'INCREMENT_AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, {type: "INCREMENT_CHILDREN_COUNT"})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
    expect(endState.name).toBe('Dimych')
});

test('user reducer should changed only name', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, {type: "CHANGE_NAME", name: "Genya"})

    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)
    expect(endState.name).toBe('Genya')
});