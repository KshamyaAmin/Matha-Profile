'use client';

import { Button } from '@/components/ui/Button';
import { CATEGORIES, DEFAULT_PRODUCTS, readProducts, saveProducts, PRODUCT_STORAGE_KEY, type Product } from '@/lib/products';
import { ImagePlus, LogOut, Pencil, Plus, Save, Search, ShieldCheck, Trash2, X } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { FullPageLoader } from '@/components/ui/LoadingIndicator';

const emptyProduct: Product = {
  id: '',
  name: '',
  category: 'Refrigerant Gas',
  specs: '',
  image: '',
};

function createProductId(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${slug || 'product'}-${Date.now()}`;
}

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product>(emptyProduct);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const minLoadingTime = 1000; // 1 second

    const finishChecking = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      setTimeout(() => {
        setIsCheckingAuth(false);
      }, remaining);
    };

    const syncAuth = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store' });
        const data = await response.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } catch {
        setIsAuthenticated(false);
      } finally {
        finishChecking();
      }
    };

    const loadProducts = () => setProducts(readProducts());

    syncAuth();
    loadProducts();
    window.addEventListener('mata-admin-auth', syncAuth);

    // Sync from server JSON file
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(data));
          loadProducts();
        }
      })
      .catch((err) => console.error('Error fetching products from server:', err));

    return () => {
      window.removeEventListener('mata-admin-auth', syncAuth);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.specs}`.toLowerCase();
      return searchable.includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery]);

  const productsWithPhotos = products.filter((product) => product.image).length;

  const persistProducts = (nextProducts: Product[], message: string) => {
    setProducts(nextProducts);
    saveProducts(nextProducts);
    setStatusMessage(message);

    // Sync to server JSON file
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextProducts),
    }).catch((err) => console.error('Failed to sync products to server:', err));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({ message: 'Login failed.' }));

    if (response.ok) {
      window.dispatchEvent(new Event('mata-admin-auth'));
      setIsAuthenticated(true);
      setPassword('');
      setProducts(readProducts());
      return;
    }

    setLoginError(data.message || 'Invalid admin email or password.');
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.dispatchEvent(new Event('mata-admin-auth'));
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const startNewProduct = () => {
    setEditingProduct(emptyProduct);
    setStatusMessage('');
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setStatusMessage('');
  };

  const updateEditingProduct = (field: keyof Product, value: string) => {
    setEditingProduct((currentProduct) => ({
      ...currentProduct,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, productId?: string) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result?.toString() ?? '';

      if (productId) {
        const nextProducts = products.map((product) => (
          product.id === productId ? { ...product, image } : product
        ));
        persistProducts(nextProducts, 'Photo added to product.');

        if (editingProduct.id === productId) {
          setEditingProduct((currentProduct) => ({ ...currentProduct, image }));
        }
        return;
      }

      setEditingProduct((currentProduct) => ({ ...currentProduct, image }));
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemoveImage = (productId: string) => {
    const nextProducts = products.map((product) => (
      product.id === productId ? { ...product, image: '' } : product
    ));
    persistProducts(nextProducts, 'Photo removed from product.');

    if (editingProduct.id === productId) {
      setEditingProduct((currentProduct) => ({ ...currentProduct, image: '' }));
    }
  };

  const handleSaveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productToSave = {
      ...editingProduct,
      id: editingProduct.id || createProductId(editingProduct.name),
      name: editingProduct.name.trim(),
      specs: editingProduct.specs.trim(),
    };

    if (!productToSave.name || !productToSave.category || !productToSave.specs) {
      setStatusMessage('Please fill product name, category, and details.');
      return;
    }

    const exists = products.some((product) => product.id === productToSave.id);
    const nextProducts = exists
      ? products.map((product) => (product.id === productToSave.id ? productToSave : product))
      : [productToSave, ...products];

    persistProducts(nextProducts, exists ? 'Product details updated.' : 'New product added.');
    setEditingProduct(productToSave);
  };

  const resetCatalog = () => {
    persistProducts(DEFAULT_PRODUCTS, 'Catalog reset to default products.');
    setEditingProduct(emptyProduct);
  };

  if (isCheckingAuth) {
    return <FullPageLoader label="Verifying session..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <form onSubmit={handleLogin} className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-primary p-3 text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
              <p className="text-sm text-gray-500">Manage product photos and catalog details.</p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="Admin email"
            autoComplete="username"
          />

          <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="Admin password"
            autoComplete="current-password"
          />

          {loginError && <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{loginError}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary">Product Admin</h1>
          <p className="mt-2 text-gray-500">Add products, edit catalog details, and upload photos for existing items.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={startNewProduct} className="gap-2">
            <Plus size={18} />
            New Product
          </Button>
          <Button type="button" variant="outline" onClick={handleLogout} className="gap-2 md:hidden">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="mt-2 text-3xl font-bold text-primary">{products.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Products With Photos</p>
          <p className="mt-2 text-3xl font-bold text-primary">{productsWithPhotos}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Session Security</p>
          <p className="mt-2 text-lg font-bold text-primary">Server cookie</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <div className="xl:sticky xl:top-24 xl:self-start">
          <form onSubmit={handleSaveProduct} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-primary">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h2>
                <p className="text-xs text-gray-500">Changes are saved to the live catalog.</p>
              </div>
              {editingProduct.id && (
                <button type="button" onClick={startNewProduct} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100" aria-label="Clear form">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="mb-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex h-28 items-center justify-center overflow-hidden text-gray-400">
                {editingProduct.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editingProduct.image} alt={editingProduct.name || 'Product preview'} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-xs">
                    <ImagePlus size={20} />
                    Product photo
                  </div>
                )}
              </div>
              {editingProduct.image ? (
                <div className="grid grid-cols-2 border-t border-gray-200 divide-x divide-gray-200">
                  <label className="flex cursor-pointer items-center justify-center gap-2 bg-white px-3 py-2 text-xs font-semibold text-primary hover:bg-gray-50">
                    <ImagePlus size={14} />
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload(event)} />
                  </label>
                  <button
                    type="button"
                    onClick={() => updateEditingProduct('image', '')}
                    className="flex items-center justify-center gap-2 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 border-t border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary hover:bg-gray-50">
                  <ImagePlus size={14} />
                  Upload Photo
                  <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload(event)} />
                </label>
              )}
            </div>

            <label className="mb-1 block text-xs font-semibold text-primary" htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              value={editingProduct.name}
              onChange={(event) => updateEditingProduct('name', event.target.value)}
              className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              placeholder="Enter product name"
            />

            <label className="mb-1 block text-xs font-semibold text-primary" htmlFor="product-category">Category</label>
            <select
              id="product-category"
              value={editingProduct.category}
              onChange={(event) => updateEditingProduct('category', event.target.value)}
              className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            >
              {CATEGORIES.filter((category) => category !== 'All').map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <label className="mb-1 block text-xs font-semibold text-primary" htmlFor="product-specs">Product Details</label>
            <textarea
              id="product-specs"
              value={editingProduct.specs}
              onChange={(event) => updateEditingProduct('specs', event.target.value)}
              rows={3}
              className="mb-3 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              placeholder="Enter product description or specifications"
            />

            {statusMessage && <p className="mb-3 rounded-md bg-surface-container-low px-3 py-2 text-xs text-primary">{statusMessage}</p>}

            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="submit" size="sm" className="gap-2">
                <Save size={16} />
                Save Product
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={resetCatalog}>
                Reset Catalog
              </Button>
            </div>
          </form>
        </div>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-primary">Existing Products</h2>
              <p className="text-sm text-gray-500">Upload a photo directly or edit full details.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                placeholder="Search products..."
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gray-100 text-gray-400">
                  {product.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(product.id)}
                        className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-red-600 shadow-sm border border-gray-100 hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  ) : (
                    <span className="text-sm italic">No photo</span>
                  )}
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-secondary">{product.category}</p>
                    <h3 className="mt-1 line-clamp-2 min-h-12 font-bold text-primary">{product.name}</h3>
                  </div>
                  <p className="line-clamp-2 min-h-10 text-sm text-gray-500">{product.specs}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white">
                      <ImagePlus size={16} />
                      Photo
                      <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload(event, product.id)} />
                    </label>
                    <Button type="button" size="sm" onClick={() => startEditProduct(product)} className="gap-2">
                      <Pencil size={16} />
                      Edit
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
