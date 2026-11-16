import { Input } from "@/components/input";
import { emailValidator, requiredValidator } from "@/utils/validators";
import { FiUser } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSignup } from "./use-signup";

export function SignupPage() {
  const { setEmail, setPassword, setConfirmPassword, setName, onSubmit, passwordValidator, confirmPasswordValidator, emailInUseValidator } = useSignup();
    return (
      <div className='container login-container'>
        <h2 className='title'>Faça seu cadastro</h2>
        <form onSubmit={onSubmit}>
          <Input
            icon={<FiUser />}
            type="text"
            name="name"
            label="Nome de usuário"
            validators={[requiredValidator]}
            changeValue={setName}
          ></Input>
          <Input
            icon={<MdOutlineEmail />}
            type="email"
            name="email"
            label="Email"
            validators={[requiredValidator, emailValidator, emailInUseValidator]}
            changeValue={setEmail}
          ></Input>
          <Input
            icon={<GoLock />}
            type="password"
            name="password"
            label="Senha"
            validators={[passwordValidator]}
            changeValue={setPassword}
          ></Input>
          <Input
            icon={<GoLock />}
            type="password"
            name="confirmPassword"
            label="Confirmar Senha"
            validators={[passwordValidator, confirmPasswordValidator ]}
            changeValue={setConfirmPassword}
          ></Input>

          <button className='button login-button' type='submit'>Criar conta</button>

          <div className='not-account'>
              <span >Já possui uma conta? <Link to="/login" className='span-link'>Fazer login</Link></span>
          </div>
        </form>
      </div>
    )
}