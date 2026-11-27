import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContext } from "@/contexts/ToastContext";
import { emailValidator, requiredValidator } from "@/utils/validators";
import { UserService } from "@/services/user-service";
import { useAuth } from "@/contexts/hooks/use-auth";

export function useLogin() {
    const { handleLogin } =  useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const isValid = requiredValidator.validate(email)
            && emailValidator.validate(email)
            && requiredValidator.validate(password);

        if (!isValid) {
            showToast("Preencha o formulário corretamente", "error");
            return;
        }

        const response = await UserService.login({ email, password });
        if (response.success && response.data) {
            await handleLogin(response.data);
            showToast("Login realizado com sucesso!", "success");
            navigate(location.state?.from?.pathname ?? "/");
        } else {
            showToast("Erro ao fazer login. Verifique suas credenciais", "error");
        }
    };

    return { setEmail, setPassword, onSubmit, locationState: location.state };
}
