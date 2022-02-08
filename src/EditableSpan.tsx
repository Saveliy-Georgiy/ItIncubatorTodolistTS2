import React, {ChangeEvent, useState} from 'react';

type EditableSpanTypeProps = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanTypeProps) => {

    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => setEdit(true)

    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }

    return (
        edit
            ?
            <input value={newTitle} autoFocus onBlur={onBlurHandler} onChange={onChangeHandler}/>
            :
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    );
};