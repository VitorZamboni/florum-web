import ProductCard from '@/components/product-card'
import useProducts from '@/contexts/hooks/use-products';
import './style.css'
import '@/components/layout/style.css'
import useCategory from '@/contexts/hooks/use-category';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
    const categories = useCategory();
    const product = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategoryId = searchParams.get("categoryId") ?? "";

    const categoryFilter = selectedCategoryId ? (categories?.find((c) => c.id === Number(selectedCategoryId))?.name ?? "Todos os Produtos") : "Todos os Produtos";

    function handleCategoryFilter(id: string) {
        setSearchParams((prev) => {
            if (id) {
                prev.set("categoryId", id);
            } else {
                prev.delete("categoryId");
            }
            return prev;
        });
    }

    function handleSortOption(sort: string) {
        setSearchParams((prev) => {
            if (sort) {
                prev.set("sort", sort);
            } else {
                prev.delete("sort");
            }
            return prev;
        });
    }

    return (
        <div className='container container-products'>
            <div className='title-filters'>
                <div>
                    <h2 className='title'>{categoryFilter}</h2>
                </div>

                <div className='filters-options'>
                    <div className="filters text-decoration">
                        <label>Filtrar por: </label>
                        <select value={searchParams.get("categoryId") ?? ""} id="optionFilter" className='text-decoration' onChange={(e) => handleCategoryFilter(e.target.value)}>
                            <option value="">Todos os Produtos</option>
                            {categories?.map((c) => (<option value={c.id}>{c.name}</option>))}
                        </select>
                    </div>

                    <div className="filters text-decoration">
                        <label>Ordernar por: </label>
                        <select value={searchParams.get("sort") ?? ""} id="optionOrder" className='text-decoration' onChange={(e) => handleSortOption(e.target.value)}>
                            {/* <option value="maisVendidos">Mais vendidos</option> */}
                            <option value="">Recentes</option>
                            <option value="PRICE_DESC">Maior valor</option>
                            <option value="PRICE_ASC">Menor valor</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='products'>
                {product.map((p) => (
                    <ProductCard product={p} />
                ))
                }
            </div>
        </div>
    )
}
