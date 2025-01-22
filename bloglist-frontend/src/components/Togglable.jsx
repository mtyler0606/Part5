import { useState, useImperativeHandle, forwardRef } from "react";

const Toggleable = forwardRef((props, ref) => {
    const [visable, setVisible] = useState(false)

    const hideWhenVisible = { display: visable ? 'none' : ''}
    const showWhenVisible = { display: visable ? '' : 'none' }
    
    const toggleVisibility = () => {
        setVisible(!visable)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
})
export default Toggleable