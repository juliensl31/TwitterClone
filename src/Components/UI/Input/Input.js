// Librairies
import React from "react";
import classes from './Input.module.css';

function Input(props) {

    let inputElement;
    const inputClasses = [];

    if(!props.valid && props.touched) {
        inputClasses.push(classes.invalid);
    }

    /* eslint-disable default-case */
    switch (props.type) {
        case ('input'):
            inputElement = (
                <input
                    {...props.config}
                    value={props.value}
                    id={props.id}
                    onChange={props.changed}
                    className={inputClasses}/>
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea 
                    value={props.value} 
                    id={props.id}
                    onChange={props.changed}
                    className={inputClasses}>
                </textarea>
            );
            break;
        case ('select'):
            inputElement = (
                <select value={props.value}
                        id={props.id} 
                        onChange={props.changed}
                        className={inputClasses}>
                    {props.config.options.map(options => (
                        <option key={options.value} value={options.value}>
                            {options.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
    }

    return (
        
        <div className={classes.Input}>
            <label htmlFor={props.id}>{props.label}</label>
            {inputElement}
            {!props.valid && props.touched ? <span>{props.error}</span> : null}
            
        </div>

    );
}

export default Input;