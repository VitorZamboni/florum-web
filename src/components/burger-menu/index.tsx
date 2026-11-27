import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { BsBoxSeam, BsGrid, BsTag, BsStar } from 'react-icons/bs';
import { FaPix } from 'react-icons/fa6';
import { RiVisaFill, RiMastercardLine } from 'react-icons/ri';
import { AuthContext } from '@/contexts/AuthContext';

import './style.css';

export function BurgerMenu({ onClose }: { onClose: () => void }) {
    const { user, handleLogout: handleLogoutContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNav = (path: string) => {
        navigate(path);
        onClose();
    }

    const handleLogout = () => {
        handleLogoutContext();
        onClose();
        navigate('/');
    }

    return (
        <>
            <div className="burger-backdrop" onClick={onClose} />
            <div className="burger-panel">
                <div className="burger-header">
                    <h2>Florum</h2>
                </div>

                <section className="burger-section">
                    <span className="burger-section-title">Navegação</span>
                    <button className="burger-item" onClick={() => handleNav('/products')}><BsGrid /> Todos os Produtos</button>
                    <button className="burger-item" onClick={() => handleNav('/products?promotion=true')}><BsTag /> Promoções</button>
                    <button className="burger-item" onClick={() => handleNav(`/products?categoryId=${Math.floor(Math.random() * 3) + 1}`)}><BsStar /> Destaques</button>
                </section>

                <hr className="burger-divider" />

                <section className="burger-section">
                    <span className="burger-section-title">Conta</span>
                    {user ? (
                        <>
                            <div className="burger-user-info">
                                <FiUser className="burger-user-icon" />
                                <div className="burger-user-details">
                                    <span className="burger-user-name">{user.name}</span>
                                    <span className="burger-user-email">{user.email}</span>
                                </div>
                            </div>
                            <button className="burger-item" onClick={() => handleNav('/orders')}>
                                <BsBoxSeam /> Meus Pedidos
                            </button>
                            <button className="burger-item" onClick={handleLogout}>
                                <FiLogOut /> Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="burger-item" onClick={() => handleNav('/login')}><FiLogIn /> Entrar</button>
                            <button className="burger-item" onClick={() => handleNav('/signup')}><FiUserPlus /> Cadastrar</button>
                        </>
                    )}
                </section>

                <div className="burger-footer">
                    <hr className="burger-divider" />

                    <section className="burger-section">
                        <span className="burger-section-title">Suporte e Ajuda</span>
                        <span className="burger-contact-item">Perguntas Frequentes</span>
                        <span className="burger-contact-item">Políticas de Trocas</span>
                        <span className="burger-contact-item">Acompanhar Pedido</span>
                        <span className="burger-contact-item">Termos de Uso</span>
                        <span className="burger-contact-item">Política de Privacidade</span>
                    </section>

                    <hr className="burger-divider" />

                    <section className="burger-section">
                        <span className="burger-section-title">Contato</span>
                        <span className="burger-contact-item">(46) 99999-9999</span>
                        <span className="burger-contact-item">atendimento@florum.com.br</span>
                        <span className="burger-contact-item">instagram.com/florum</span>
                    </section>

                    <hr className="burger-divider" />

                    <section className="burger-section">
                        <span className="burger-section-title">Formas de Pagamento</span>
                        <span className="burger-contact-item"><FaPix /> Pix</span>
                        <span className="burger-contact-item"><RiVisaFill /> <RiMastercardLine /> Cartão de Crédito</span>
                        <span className="burger-contact-item"><RiVisaFill /> <RiMastercardLine /> Cartão de Débito</span>
                    </section>

                    <hr className="burger-divider" />

                    <section className="burger-section">
                        <span className="burger-section-title">Endereço</span>
                        <span className="burger-contact-item">Avenida Tupi, 110 - Pinheirinho<br />Pato Branco - PR</span>
                    </section>

                    <hr className="burger-divider" />

                    <span className="burger-copyright">&copy; 2026 Florum - CNPJ 00.000.000/0001/00</span>
                </div>
            </div>
        </>
    );
}
