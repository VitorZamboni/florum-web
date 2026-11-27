import { useContext, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export function useHeader() {
    const { user, handleLogout: handleLogoutContext } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const urlText = searchParams.get("text") ?? "";

    const [search, setSearch] = useState(urlText);
    const [prevUrlText, setPrevUrlText] = useState(urlText);

    if (urlText !== prevUrlText) {
        setPrevUrlText(urlText);
        setSearch(urlText);
    }
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

    const handleDestaques = () => {
        const categoryId = Math.floor(Math.random() * 3) + 1;
        navigate(`/products?categoryId=${categoryId}`);
    };

    const handleBurgerToggle = () => setBurgerOpen(prev => !prev);
    const handleBurgerClose = () => setBurgerOpen(false);

    return { user, menuOpen, handleUserIconClick, handleLogout, handleOrder, burgerOpen, handleBurgerToggle, handleBurgerClose, search, setSearch, handleSearch, handleDestaques };
}
