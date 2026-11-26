import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidator, requiredValidator } from "@/utils/validators";
import { ToastContext } from "@/contexts/ToastContext";
import UserService from "@/services/user-service";
import { useAuth } from "@/contexts/hooks/use-auth";

export function useSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { handleLogin } =  useAuth();

    const passwordValidator = {
        message: " deve conter pelo menos 8 caracteres",
        uid: "password",
        validate: (value: string) => value.length >= 8
    }

    const confirmPasswordValidator = {
        message: " não coincide com a senha",
        uid: "confirmPassword",
        validate: (value: string) => value === password
    }

    const emailInUseValidator = {
        message: " já está em uso por outro cliente",
        uid: "emailInUse",
        validate: async (value: string) => !((await UserService.existsUser(value)).data?.exists)
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const isValid = requiredValidator.validate(name)
            && requiredValidator.validate(email)
            && emailValidator.validate(email)
            && passwordValidator.validate(password)
            && confirmPasswordValidator.validate(confirmPassword);

        if (!isValid) {
            showToast("Preencha o formulário corretamente", "error");
            return;
        }

        try {
            const signupRes = await UserService.signup({ name, email, password });
            if (signupRes.status === 201) {
                const loginRes = await UserService.login({email, password});
                if (loginRes.status === 200 && loginRes.data) {
                    await handleLogin(loginRes.data); 
                    showToast("Conta criada com sucesso!", "success");
                    navigate("/");
                } else {
                    showToast("Não foi possivel fazer login automaticamente faça-o agora", "error");
                    navigate("/login");
                }
            } else {
                showToast("Erro ao criar conta de usuário verifique as informações inseridas", "success");
            }
            
        } catch {
            showToast("Erro ao criar conta. Tente novamente", "error");
        }
    };

    return {
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        onSubmit,
        passwordValidator,
        confirmPasswordValidator,
        emailInUseValidator
    };
}
