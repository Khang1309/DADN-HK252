import s from './Login.module.css'
import { theme } from '../utils/theme'
import { useState } from 'react'
import { check } from 'zod';

export default function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    }
    )
    const [agree, setAgree] = useState(false);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(e);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        console.log("Submitting to backend:", formData);
    };

    return <div className={s.parent}>
        <div className={s.container} style={{ background: theme.loginTheme.containBlockBackground }}>
            <div className={s.slider}>

            </div>
            <div className={s.content}>
                <div className={s.title}>Create an account</div>
                <div className={s.subtitle}>Already have an account? <span >Log in</span></div>
                <form onSubmit={handleSubmit}>
                    <div className={s.name}>
                        <input type="text" name="name" placeholder="Your full name" onChange={handleChange} />
                    </div>

                    <div>
                        <input type="text" name='email' placeholder="Your email" onChange={handleChange} />
                    </div>

                    <div>
                        <input type="password" name='password' placeholder="Your password" onChange={handleChange} />
                    </div>

                    <div>
                        <input type="password" name='repassword' placeholder="Re-enter your password to confirm" onChange={handleChange} />
                    </div>


                    <div style={{ display: 'flex', position: 'relative' }}>
                        <label htmlFor="agree">
                            <input type="checkbox" name="agree" id="check" />
                            Tôi đã đồng ý với các điều khoản
                        </label>
                    </div>
                    <button type="submit" style={{ background: theme.loginTheme.buttonCreate }} onSubmit={handleSubmit}> Create account </button>
                </form>
            </div>
        </div>
    </div>
}
