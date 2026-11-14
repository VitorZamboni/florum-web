import Carousel from "@/components/carousel";
import Highlight from "@/components/highlight";
import { useCarousel } from "@/contexts/hooks/use-carousel";
import './style.css'
import '../../components/layout/style.css'
import bannerOferta from '@/assets/bannerOferta.png'

export const HomePage = () => {
  const dataNovidades = useCarousel({ promotion: false, categoryIds: [] });
  const dataPromocoes = useCarousel({ promotion: true, categoryIds: [] });

  return (
    <>
      <div className="banner">
        <img src={bannerOferta} alt="Frete grátis para compras acima de R$ 499,99 "/>
      </div>

      <div className="container container-home">
        <Highlight/>
      </div>

      <div className="container container-home">

        <Carousel products={dataNovidades} title={"Novidades"} />
      </div>

      <div className="container container-home">
        <Carousel products={dataPromocoes} title={"Promoções"} />
      </div>
    </>
  );
};