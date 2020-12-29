import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    const changeMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onBlurClickHandler = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        editMode && !props.disabled ?
            <TextField value={title}
                   onBlur={onBlurClickHandler}
                   onChange={onChangeInput}
                   autoFocus/>
            : <span onDoubleClick={changeMode}>{props.title}</span>
    )
})