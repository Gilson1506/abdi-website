import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Check } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';


const formatMoney = (value, currency) => {
  try {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: currency === 'AOA' ? 'AOA' : 'AOA', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${value} ${currency || 'AOA'}`;
  }
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // {productId: {product, qty, variant}}
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [showCartMobile, setShowCartMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id,name,description,price,images,status,created_at')
          .eq('status', 'active')
          .order('created_at', { ascending: false });
        if (error) throw error;
        const mapped = (data || []).map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: Number(p.price || 0),
          currency: 'AOA',
          image: Array.isArray(p.images) && p.images.length ? p.images[0] : 'https://via.placeholder.com/800x600?text=Produto'
        }));
        if (mounted) setProducts(mapped);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        if (mounted) setProducts([]);
      }
      if (mounted) setLoading(false);
    })();
    const savedCart = JSON.parse(localStorage.getItem('store_cart') || '{}');
    setCart(savedCart);
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem('store_cart', JSON.stringify(cart));
  }, [cart]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filter !== 'all') list = list.filter(p => p.tags?.includes(filter));
    if (query) list = list.filter(p => (p.name + p.description).toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [products, filter, query]);

  const addToCart = (product, variant) => {
    setCart(prev => {
      const key = variant ? `${product.id}:${variant}` : product.id;
      const current = prev[key] || { product, qty: 0, variant };
      return { ...prev, [key]: { ...current, qty: current.qty + 1 } };
    });
  };

  const changeQty = (key, delta) => {
    setCart(prev => {
      const item = prev[key];
      if (!item) return prev;
      const nextQty = (item.qty || 0) + delta;
      if (nextQty <= 0) {
        const clone = { ...prev };
        delete clone[key];
        return clone;
      }
      return { ...prev, [key]: { ...item, qty: nextQty } };
    });
  };

  const clearCart = () => setCart({});

  const checkout = () => {
    if (Object.keys(cart).length === 0) return;
    const items = Object.values(cart).map(i => ({ id: i.product.id, name: i.product.name, variant: i.variant, qty: i.qty, price: i.product.price, currency: i.product.currency }));
    const draft = { items };
    localStorage.setItem('checkout_draft', JSON.stringify(draft));
    window.location.href = '/checkout';
  };

  const cartItems = Object.entries(cart);
  const cartTotal = cartItems.reduce((s, [_, i]) => s + i.product.price * i.qty, 0);

  return (
    <>
      <Helmet>
        <title>Loja - ABDI</title>
      </Helmet>

      <div className="py-10">
        {loading && <Loader />}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Loja</h1>
              <p className="text-gray-600">Produtos personalizados ABDI</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select value={filter} onChange={e => setFilter(e.target.value)} className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg">
                <option value="all">Todas categorias</option>
                <option value="vestuário">Vestuário</option>
                <option value="acessórios">Acessórios</option>
                <option value="papelaria">Papelaria</option>
              </select>
              <button
                type="button"
                onClick={() => setShowCartMobile(v => !v)}
                className="md:hidden flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                <ShoppingCart className="w-4 h-4" /> {cartItems.length}
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg">
                <ShoppingCart className="w-4 h-4" /> {cartItems.length}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                  <div className="h-48 sm:h-44 md:h-40 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-blue-700">{formatMoney(p.price, p.currency)}</span>
                    </div>
                    {p.variants && (
                      <div className="mb-3">
                        <label className="text-xs text-gray-600">Tamanho:</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {p.variants.map(v => (
                            <button key={v} onClick={() => addToCart(p, v)} className="px-2 py-1 border rounded text-sm hover:bg-gray-50">{v}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {!p.variants && (
                      <Button onClick={() => addToCart(p)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Adicionar ao Carrinho</Button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  {loading ? 'Carregando produtos...' : 'Nenhum produto disponível no momento.'}
                </div>
                {!loading && (
                  <p className="text-gray-400 text-sm mt-2">
                    Novos produtos serão adicionados em breve.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Carrinho - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow p-4 h-fit sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-3">Carrinho</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-sm">Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map(([key, item]) => (
                  <div key={key} className="flex items-center gap-3 border-b pb-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.product.name} {item.variant && <span className="text-gray-500">/ {item.variant}</span>}</div>
                      <div className="text-xs text-gray-600">{formatMoney(item.product.price, item.product.currency)}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => changeQty(key, -1)} className="p-1 border rounded"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm">{item.qty}</span>
                        <button onClick={() => changeQty(key, 1)} className="p-1 border rounded"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => changeQty(key, -item.qty)} className="p-1 border rounded text-red-600"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="font-semibold text-blue-700">{formatMoney(item.product.price*item.qty, item.product.currency)}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="font-bold text-blue-700">{formatMoney(cartTotal, 'AOA')}</span>
                </div>
                <Button onClick={checkout} className="w-full bg-green-600 hover:bg-green-700 text-white"><Check className="w-4 h-4 mr-2" /> Finalizar Pedido</Button>
                <Button onClick={clearCart} variant="outline" className="w-full">Esvaziar Carrinho</Button>
              </div>
            )}
          </div>
        </section>

        {/* Carrinho - Mobile (Acordeão) */}
        <section className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          {cartItems.length > 0 && (
            <div className="bg-white rounded-xl shadow">
              <button
                type="button"
                onClick={() => setShowCartMobile(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <span className="font-semibold text-gray-900">Carrinho ({cartItems.length})</span>
                <span className="text-blue-700 font-bold">{formatMoney(cartTotal, 'AOA')}</span>
              </button>
              {showCartMobile && (
                <div className="border-t p-4 space-y-3">
                  {cartItems.map(([key, item]) => (
                    <div key={key} className="flex items-center gap-3 border-b pb-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.product.name} {item.variant && <span className="text-gray-500">/ {item.variant}</span>}</div>
                        <div className="text-xs text-gray-600">{formatMoney(item.product.price, item.product.currency)}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => changeQty(key, -1)} className="p-1 border rounded"><Minus className="w-3 h-3" /></button>
                          <span className="text-sm">{item.qty}</span>
                          <button onClick={() => changeQty(key, 1)} className="p-1 border rounded"><Plus className="w-3 h-3" /></button>
                          <button onClick={() => changeQty(key, -item.qty)} className="p-1 border rounded text-red-600"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <div className="font-semibold text-blue-700">{formatMoney(item.product.price*item.qty, item.product.currency)}</div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-bold text-blue-700">{formatMoney(cartTotal, 'AOA')}</span>
                  </div>
                  <Button onClick={checkout} className="w-full bg-green-600 hover:bg-green-700 text-white"><Check className="w-4 h-4 mr-2" /> Finalizar Pedido</Button>
                  <Button onClick={clearCart} variant="outline" className="w-full">Esvaziar Carrinho</Button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Store;


