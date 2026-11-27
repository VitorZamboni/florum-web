
import { PiHouse } from "react-icons/pi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useHeader } from "@/components/header/use-header";
import { BurgerMenu } from "@/components/burger-menu";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

import './style.css';
import "@/components/header/style.css";

export function FooterMenu() {
    const { user, menuOpen, handleUserIconClick, handleLogout, burgerOpen, handleBurgerToggle, handleBurgerClose } = useHeader();
    const {productsCartCount} = useContext(CartContext);
    return (
        <>
            <footer className='footerMenu'>
                <div className='footerMenu-icons'>
                    <div>
                        <Link to="/">
                            <PiHouse className="footerMenu-icon" />
                        </Link>
                    </div>
                    <div>
                        <FiUser className='icons footerMenu-icon' onClick={handleUserIconClick} />
                        {menuOpen && (
                            <div className="user-menu">
                                <div className="user-menu-info">
                                    <FiUser className="footerMenu-icon" />
                                    <div className="user-menu-details">
                                        <span className="user-menu-name">{user?.name}</span>
                                        <span className="user-menu-email">{user?.email}</span>
                                    </div>
                                </div>
                                <hr className="user-menu-divider" />
                                <button className="user-menu-logout" onClick={handleLogout}>
                                    <FiLogOut className="user-menu-icon" />
                                    <span>Sair</span>
                                </button>
                            </div>
                        )}

                    </div>
                    <div>
                        <Link to="/cart" className='footerMenu-cart-link'>
                            <MdOutlineShoppingCart className='footerMenu-icon' />
                            {productsCartCount > 0 && <span className="footerMenu-cart-count">{productsCartCount}</span>}
                        </Link>

                    </div>
                    <div>
                        <FiMenu className="footerMenu-icon" onClick={handleBurgerToggle} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </footer>
            {burgerOpen && <BurgerMenu onClose={handleBurgerClose} />}
        </>
    );
}
