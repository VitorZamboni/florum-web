import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "@/contexts/ToastContext";
import { emailValidator, requiredValidator } from "@/utils/validators";
import UserService from "@/services/user-service";
import { useAuth } from "@/contexts/hooks/use-auth";

export function useLogin() {
    const { handleLogin } =  useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const isValid = requiredValidator.validate(email)
            && emailValidator.validate(email)
            && requiredValidator.validate(password);

        if (!isValid) {
            showToast("Preencha o formulário corretamente", "error");
            return;
        }

        try {
            const response = await UserService.login({ email, password });
            if (response.status === 200 && response.data) {
                await handleLogin(response.data); 
                // await resolveCart();
                showToast("Login realizado com sucesso!", "success");
                navigate("/");
            } else {
                showToast("Erro ao fazer login. Verifique suas credenciais", "error");
            }
        } catch {
            showToast("Erro ao fazer login. Verifique suas credenciais", "error");
        }
    };

    return { setEmail, setPassword, onSubmit };
}
