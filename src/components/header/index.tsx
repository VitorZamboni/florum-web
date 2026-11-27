import './style.css'
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdOutlineSearch, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useHeader } from './use-header';
import { BsBoxSeam } from 'react-icons/bs';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';

function Header() {
    const { user, menuOpen, handleUserIconClick, handleLogout, handleOrder, search, setSearch, handleSearch, handleDestaques } = useHeader();
    const {productsCartCount} = useContext(CartContext);

    return (
            <header className="navbar">
                <div className="header">
                    <div className='brand'>
                        <Link to="/"><h1>Florum</h1></Link>
                    </div>

                    <form className='inputBar' onSubmit={handleSearch}>
                        <input type="search" name="inputBar" id="inputBar" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" aria-label="Pesquisar"><MdOutlineSearch/></button>
                    </form>

                    <div>
                        <div className="user-menu-wrapper" >
                            <FiUser className='icons user-icon' onClick={handleUserIconClick} />
                            {menuOpen && (
                                <div className="user-menu">
                                    <div className="user-menu-info">
                                        <FiUser className="user-menu-icon" />
                                        <div className="user-menu-details">
                                            <span className="user-menu-name">{user?.name}</span>
                                            <span className="user-menu-email">{user?.email}</span>
                                        </div>
                                    </div>
                                    <hr className="user-menu-divider" />
                                    <button className="user-menu-logout" onClick={handleOrder}>
                                        <BsBoxSeam className="user-menu-icon" />
                                        <span>Meus pedidos</span>
                                    </button>
                                    <button className="user-menu-logout" onClick={handleLogout}>
                                        <FiLogOut className="user-menu-icon" />
                                        <span>Sair</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <Link to="/cart" className='cart-link'>
                            <MdOutlineShoppingCart className='icons' />
                            {productsCartCount > 0 && <span className="cart-count">{productsCartCount}</span>}
                        </Link>
                    </div>

                </div>
                <div className="tabs">
                    <Link to={"/products"}><h3>Todos os produtos</h3></Link>
                    <Link to={"/products?promotion=true"}><h3>Promoções</h3></Link>
                    <Link to="/products" onClick={(e) => { e.preventDefault(); handleDestaques(); }}><h3>Destaques</h3></Link>
                </div>
            </header>
    );
}

export default Header;
