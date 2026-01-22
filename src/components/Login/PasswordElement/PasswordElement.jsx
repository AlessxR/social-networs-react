import {useState} from "react";

const PasswordElement = ({register, errors}) => {
    const [password, setPassword] = useState("");

    return (
        <div className="login__password">
            <label>Password</label>
            <input {...register("password", {required:true, maxLength: 50})} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p style={{color: "red"}}>{errors.password?.message}</p>
        </div>
    );
}

export default PasswordElement;