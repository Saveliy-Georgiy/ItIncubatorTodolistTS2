import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from "@material-ui/icons";

type AddItemFormTypeProps = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormTypeProps) => {

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                size={"small"}
            />
            <IconButton onClick={addTask} color={"primary"}><AddBox/></IconButton>
        </div>
    );
};