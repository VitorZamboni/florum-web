import { Link } from "react-router-dom";
import "./style.css";

export function NotFoundPage() {
    return (
        <div className="container not-found">
            <h2 className="title">Página não encontrada</h2>
            <p>O endereço que você acessou não existe ou foi removido.</p>
            <Link to="/" className="button not-found-button">Voltar para o início</Link>
        </div>
    );
}
