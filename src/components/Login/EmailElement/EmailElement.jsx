import {useState} from "react";

const EmailElement = ({register, errors}) => {

    const [email, setEmail] = useState("");


    return (
        <div className="login__email">
            <label>Email</label>
            <input {...register("email", {required: true, maxLength: 50})} id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p style={{color: "red"}}>{errors.email?.message}</p>
        </div>
    );
}

export default EmailElement;