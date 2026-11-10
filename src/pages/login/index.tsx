import { MdOutlineEmail } from 'react-icons/md'
import { GoLock } from "react-icons/go";
import './style.css'
import { Link } from 'react-router-dom';
import { useLogin } from './use-login';
import { Input } from '@/components/input';
import { emailValidator, requiredValidator } from '@/utils/validators';

export function LoginPage() {
    const { setEmail, setPassword, onSubmit } = useLogin();

    return (
        <div className='container login-container'>
            <h2 className='title'>Faça login</h2>
            <form onSubmit={onSubmit}>
                <Input
                    icon={<MdOutlineEmail />}
                    type="email"
                    name="email"
                    label="Email"
                    validators={[requiredValidator, emailValidator]}
                    changeValue={setEmail}
                ></Input>
                <Input
                    icon={<GoLock />}
                    type="password"
                    name="password"
                    label="Senha"
                    validators={[requiredValidator]}
                    changeValue={setPassword}
                ></Input>
                <span className='forgot-password span-link'>Esqueci minha senha</span>

                <button className='button login-button' type="submit">Entrar</button>

                <div className='not-account'>
                    <span >Não possui uma conta? <Link to="/signup" className='span-link'>Criar cadastro</Link></span>
                </div>
            </form>
        </div>
    )
}