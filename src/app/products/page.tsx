'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CATEGORIES, readProducts, PRODUCT_STORAGE_KEY, type Product } from '@/lib/products';
import { MessageCircle, Filter, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { ProductGridSkeleton } from '@/components/ui/ProductSkeleton';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => setProducts(readProducts());

    loadProducts();
    window.addEventListener('mata-products-updated', loadProducts);
    window.addEventListener('storage', loadProducts);

    const startTime = Date.now();
    const minLoadingTime = 1200; // 1.2 seconds

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    };

    // Sync from server JSON file
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(data));
          loadProducts();
        }
      })
      .catch((err) => console.error('Error fetching products from server:', err))
      .finally(() => {
        finishLoading();
      });

    return () => {
      window.removeEventListener('mata-products-updated', loadProducts);
      window.removeEventListener('storage', loadProducts);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.specs.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white text-left">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Product Catalog</h1>
          <p className="mt-2 text-secondary-light">Genuine refrigeration and HVAC supplies in Navi Mumbai</p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64">
              <div className="sticky top-24">
                <div className="mb-6 flex items-center space-x-2 font-bold text-primary">
                  <Filter size={20} />
                  <span>Categories</span>
                </div>
                <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`whitespace-nowrap rounded-md px-4 py-2 text-xs md:text-sm font-medium transition-all text-left ${
                        selectedCategory === cat 
                          ? 'bg-secondary text-white shadow-md' 
                          : 'text-gray-600 border lg:border-none hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Showing <span className="font-bold text-primary">{filteredProducts.length}</span> products
                </div>
              </div>

              {isLoading ? (
                <ProductGridSkeleton count={8} />
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden text-gray-400 p-2">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-[8px] sm:text-xs italic text-center px-1">Product Photo</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-1.5 md:p-4">
                        <div className="mb-0.5 md:mb-1 text-[7px] md:text-xs font-semibold uppercase tracking-wider text-secondary truncate">
                          {product.category}
                        </div>
                        <h3 className="mb-1 md:mb-2 text-[9px] sm:text-[11px] md:text-lg font-bold text-primary line-clamp-2 leading-tight h-6 md:h-auto">
                          {product.name}
                        </h3>
                        <p className="hidden md:block mb-6 text-sm text-gray-600">
                          {product.specs}
                        </p>
                        
                        <div className="mt-auto flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-2">
                          <Button variant="outline" size="sm" className="w-full h-5 md:h-9 text-[8px] md:text-sm py-0 px-1">
                            Details
                          </Button>
                          <a href={`https://wa.me/918080673647?text=Hello, I am interested in ${product.name}. Please share best price and availability.`} className="w-full">
                            <Button variant="whatsapp" size="sm" className="w-full h-5 md:h-9 text-[8px] md:text-sm py-0 px-1">
                              <MessageCircle size={10} className="mr-0.5 md:mr-1 md:w-4 md:h-4" />
                              <span className="md:inline">Quote</span>
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-6 text-gray-400">
                    <Search size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-primary">No products found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search or category filter</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Inquiry Banner */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold text-primary">Looking for Bulk Orders?</h2>
          <p className="mb-8 text-gray-600">Get specialized wholesale pricing for large quantities and long-term supply contracts.</p>
          <Link href="/contact">
            <Button size="lg" variant="primary">
              Request Bulk Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
