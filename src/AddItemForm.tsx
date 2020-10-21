import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void
}

export  function AddItemForm (props: AddItemFormPropsType) {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (taskTitle.trim() === '') {
            setError("Title is required")
            setTaskTitle('')
            return
        }
        props.addItem(taskTitle.trim())
        setTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return(
        <div>
            <input onChange={onChangeHandler}
                   value={taskTitle}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? "error-message" : ""}>{error}</div>}
        </div>
    )
}