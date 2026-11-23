import { Link } from "react-router-dom";
import "./style.css"

export default function Highlight() {
    return (
        <div>
            <h2 className='title'>Destaques</h2>
            <div className="highlight">
                <div className="card">
                    <Link to="/products?categoryId=3" className="link">
                        <img src="https://images.pexels.com/photos/34808311/pexels-photo-34808311.jpeg" alt="Arranjos" />
                        <h3>Arranjos</h3>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/products?categoryId=2" className="link">
                        <img src="https://images.pexels.com/photos/36739287/pexels-photo-36739287.jpeg" alt="Buques" />
                        <h3>Buques</h3>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/products?categoryId=1" className="link">
                        <img src="https://images.pexels.com/photos/36931775/pexels-photo-36931775.jpeg" alt="Vasos" />
                        <h3>Vasos</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
