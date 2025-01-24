import { useState } from "react"

const Practice = ({practiceFunction}) => {
    const [someValue, setSomeValue] = useState('')

    const eventHandler = (event) => {
        event.preventDefault()
        practiceFunction(someValue)
        setSomeValue('')
    }

    return (
        <div>
            <form onSubmit={eventHandler}>
                <input 
                    type="text"
                    placeholder="input placeholder"
                    value={someValue}
                    onChange={event => setSomeValue(event.target.value)}
                />
                <button type="submit">Click Me</button>
            </form>
            
        </div>
    )
}


export default Practice