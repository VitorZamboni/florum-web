import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export function useHeader() {
    const { user, handleLogout: handleLogoutContext } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [search, setSearch] = useState("");
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

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const term = search.trim();
        navigate(term ? `/products?text=${encodeURIComponent(term)}` : "/products");
    }

    const handleBurgerToggle = () => setBurgerOpen(prev => !prev);
    const handleBurgerClose = () => setBurgerOpen(false);

    return { user, menuOpen, handleUserIconClick, handleLogout, handleOrder, burgerOpen, handleBurgerToggle, handleBurgerClose, search, setSearch, handleSearch };
}
