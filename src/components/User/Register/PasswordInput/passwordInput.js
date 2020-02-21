import React from "react";
import './passwordInputStyle.css';
import {strengthColor,strengthIndicator} from '../PasswordStrength/passwordStrength'
function PasswordInput(props) {
    // console.log(strengthIndicator(props.value));
    const strength=strengthIndicator(props.value);
    const color=strengthColor(strength);
    return(

        <div>
            <label className="labelLogin4" htmlFor={"password"}>Password</label>
            <input
                type="password"
                value={props.value}
                name={props.name}
                onChange={props.handleChange}
                className="form-control col-md-6 inputPass"
                placeholder="Enter password"
                style={{
                    border:`2px solid ${color}`
                }}/>
        </div>
    )
};
export default PasswordInput;