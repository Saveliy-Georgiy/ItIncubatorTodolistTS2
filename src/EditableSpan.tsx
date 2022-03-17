import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type EditableSpanTypeProps = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = memo((props: EditableSpanTypeProps) => {

    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => setEdit(true)

    const onBlurHandler = useCallback(() => {
        props.onChange(newTitle)
        setEdit(false)
    }, [props.onChange, newTitle])

    return (
        edit
            ?
            <input value={newTitle} autoFocus onBlur={onBlurHandler} onChange={onChangeHandler}/>
            :
            <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>

    );
});