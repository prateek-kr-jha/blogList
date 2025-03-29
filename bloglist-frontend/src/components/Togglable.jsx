import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(null)
    const showWhenVisible = { display: visible ? '' : 'none'}
    const hideWhenVisible = { display: visible ? 'none' : ''}
    const toggleVsibilty = () => {
        setVisible(!visible)
    }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVsibilty}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVsibilty}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable