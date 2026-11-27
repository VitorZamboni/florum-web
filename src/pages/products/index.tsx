import ProductCard from '@/components/product-card'
import useProducts from '@/contexts/hooks/use-products';
import './style.css'
import '@/components/layout/style.css'
import useCategory from '@/contexts/hooks/use-category';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
    const categories = useCategory();
    const { products, totalPages, page, loading } = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategoryId = searchParams.get("categoryId") ?? "";
    const searchText = searchParams.get("text") ?? "";
    const isPromotion = searchParams.get("promotion") === "true";

    const categoryFilter = selectedCategoryId ? (categories?.find((c) => c.id === Number(selectedCategoryId))?.name ?? "Todos os Produtos") : "Todos os Produtos";

    let title = categoryFilter;
    if (searchText) {
        title = `Resultados para "${searchText}"`;
    } else if (isPromotion) {
        title = "Promoções";
    }

    function handleCategoryFilter(id: string) {
        setSearchParams((prev) => {
            if (id) {
                prev.set("categoryId", id);
            } else {
                prev.delete("categoryId");
            }
            prev.delete("page");
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

    function handlePageChange(newPage: number) {
        setSearchParams((prev) => {
            if (newPage > 0) {
                prev.set("page", String(newPage));
            } else {
                prev.delete("page");
            }
            return prev;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className='container container-products'>
            <div className='title-filters'>
                <div>
                    <h2 className='title'>{title}</h2>
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
                            <option value="">Recentes</option>
                            <option value="PRICE_DESC">Maior valor</option>
                            <option value="PRICE_ASC">Menor valor</option>
                        </select>
                    </div>
                </div>
            </div>

            {!loading && products.length === 0 ? (
                <p className='empty-products'>Nenhum produto encontrado.</p>
            ) : (
                <div className='products'>
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className='pagination'>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                        Anterior
                    </button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
                        Próxima
                    </button>
                </div>
            )}

        </div>
    )
}
