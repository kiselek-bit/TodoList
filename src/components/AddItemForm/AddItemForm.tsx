import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

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
        if(error !== null){
            setError(null)
        }
        setTaskTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <TextField onChange={onChangeHandler}
                       disabled={props.disabled}
                       value={taskTitle}
                       variant={'outlined'}
                       label={'Type value'}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}
                       error={!!error}
            />
            <IconButton disabled={props.disabled} onClick={addTask} color={'primary'}>
                <AddBox />
            </IconButton>
        </div>
    )
})