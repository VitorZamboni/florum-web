import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export function useHeader() {
    const { user, handleLogout: handleLogoutContext } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        if (user) {
            setMenuOpen(prev => !prev);
        } else {
            navigate('/login');
        }
    }

    const handleOrder = () => {
        navigate('/orders');
        setMenuOpen(false);
    }

    const handleLogout = () => {
        handleLogoutContext();
        setMenuOpen(false);
        setBurgerOpen(false);
        navigate('/');
    }

    const handleBurgerToggle = () => setBurgerOpen(prev => !prev);
    const handleBurgerClose = () => setBurgerOpen(false);

    return { user, menuOpen, handleUserIconClick, handleLogout, handleOrder, burgerOpen, handleBurgerToggle, handleBurgerClose };
}
