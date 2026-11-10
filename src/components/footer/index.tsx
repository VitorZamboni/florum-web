import './style.css'
import { FaPix } from "react-icons/fa6";
import { RiVisaFill, RiMastercardLine } from "react-icons/ri";

function Footer() {
    return (
        <>
            <footer className='footer'>
                <div className='information'>
                    <div>
                        <span>Suporte e Ajuda</span>
                        <div>
                            <ul>
                                <li><a href="#">Perguntas Frequentes (FAQ)</a></li>
                                <li><a href="#">Politicas de Trocas</a></li>
                                <li><a href="#">Acompanhar Pedido</a></li>
                                <li><a href="#">Termos de Uso</a></li>
                                <li><a href="#">Política de Privacidade</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <span>Contato</span>
                        <div>
                            <ul>
                                <li>(46) 99999-9999</li>
                                <li>atendimento@florum.com.br</li>
                                <li>instagram.com/florum</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <span>Formas de Pagamento</span>
                        <div>
                            <ul>
                                <li><FaPix /> Pix</li>
                                <li><RiVisaFill /> <RiMastercardLine />Cartão de Crédito</li>
                                <li><RiVisaFill /> <RiMastercardLine />Cartão de Débito</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span>Endereço Físico</span>
                        <div>
                            <ul>
                                <li>Avenida Tupi, 110 - Pinheirinho<br /> Pato Branco - PR</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='copyright'>

                    <span>&copy; 2026 Florum - CNPJ 00.000.000/0001/00</span>
                </div>
            </footer>
        </>
    );
}

export default Footer;