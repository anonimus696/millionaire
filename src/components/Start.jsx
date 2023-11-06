import { useRef } from "react"



export default function Start({ setUsername }) {
    const inputRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        inputRef.current.value && setUsername(inputRef.current.value)
    }
    return (
        <div className="start">
            <form className="form" onSubmit={handleClick}>
                <input
                    placeholder="enter your name*"
                    className="startInput"
                    ref={inputRef}
                />
                <button className="startButton"> Start</button>
            </form>
        </div>
    )
}
