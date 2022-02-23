import {changeNameAC, incAgeAC, incChildrenCountAC, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, incAgeAC())

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, incChildrenCountAC())

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
});

test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const newName = 'Victor'
    const endState = userReducer(startState, changeNameAC(newName))

    expect(endState.name).toBe('Victor')

});
