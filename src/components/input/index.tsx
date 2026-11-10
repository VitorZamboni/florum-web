import './style.css'
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlash } from "react-icons/bs";
import { useInput, type InputOptions } from "./use-input";

export function Input({icon, placeholder, type, name, label, validators = [], changeValue}: InputOptions) {    

    const {visible, toggleVisibility, error, validate} = useInput();
    return (
        <>
            <div className="input-container">
                <label htmlFor={name}>{label}:</label>
                <input 
                    type={(type === "password" && visible) ? "text" : type} 
                    name={name} 
                    id={name} 
                    placeholder={placeholder}
                    onChange={(e) => changeValue && changeValue(e.target.value)}
                    onBlur={(e) => validate(e.target.value, label, validators)}
                />
                {(icon) && icon}
                {(type === "password") && 
                    (visible ? 
                        <BsEyeSlash onClick={toggleVisibility} className="password-icon" />
                    : 
                        <IoEyeOutline onClick={toggleVisibility} className="password-icon" /> 
                    )}
            
            </div>
            {error.length > 0 && (
                <div className="error-message">
                    {error.map((err, index) => (
                        <span key={index}>{err.message}</span>
                    ))}
                </div>
            )}
        </>
    )
}