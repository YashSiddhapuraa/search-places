import React, { forwardRef } from 'react';

import styles from './styles.module.css';

const Input = forwardRef(({ type = "text", value, handleOnChange, classNameWrapper, inputClassName, ...props }, ref) => {
    return (
        <div className={`${styles.inputWrapper} ${classNameWrapper}`}>
            <input type={type} value={value} ref={ref} onChange={handleOnChange} {...props} className={`${styles.input} ${inputClassName}`} />
        </div>
    )
})

export default Input