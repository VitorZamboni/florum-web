import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { emailValidator, requiredValidator } from "@/utils/validators";
import { ToastContext } from "@/contexts/ToastContext";
import { UserService } from "@/services/user-service";
import { useAuth } from "@/contexts/hooks/use-auth";

export function useSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogin } =  useAuth();

    const nameValidator = {
        message: "deve ter entre 4 e 50 caracteres",
        uid: "nameSize",
        validate: (value: string) => value.length >= 4 && value.length <= 50
    }

    const emailSizeValidator = {
        message: "deve ter no máximo 50 caracteres",
        uid: "emailSize",
        validate: (value: string) => value.length <= 50
    }

    const passwordValidator = {
        message: "deve ter pelo menos 6 caracteres, com uma letra maiúscula, uma minúscula e um número",
        uid: "password",
        validate: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
    }

    const confirmPasswordValidator = {
        message: "não coincide com a senha",
        uid: "confirmPassword",
        validate: (value: string) => value === password
    }

    const emailInUseValidator = {
        message: "já está em uso por outro cliente",
        uid: "emailInUse",
        validate: async (value: string) => !((await UserService.existsUser(value)).data?.exists)
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const isValid = requiredValidator.validate(name)
            && nameValidator.validate(name)
            && requiredValidator.validate(email)
            && emailValidator.validate(email)
            && emailSizeValidator.validate(email)
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
                    navigate(location.state?.from?.pathname ?? "/");
                } else {
                    showToast("Não foi possivel fazer login automaticamente faça-o agora", "error");
                    navigate("/login", { state: location.state });
                }
            } else {
                showToast("Erro ao criar conta de usuário verifique as informações inseridas", "error");
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
        nameValidator,
        emailSizeValidator,
        passwordValidator,
        confirmPasswordValidator,
        emailInUseValidator,
        locationState: location.state
    };
}
