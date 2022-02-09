import React from 'react';
import {FilterValuesType} from "./App";

type ButtonPropsType = {
    filter?: FilterValuesType
    name: string
    callBack: () => void
}

export const Button = (props: ButtonPropsType) => {

    const onAllClickHandler = () => props.callBack();

    return (
        <button className={props.filter === props.name ? "active-filter" : ""}
                onClick={onAllClickHandler}>
            {props.name}
        </button>
    );
};