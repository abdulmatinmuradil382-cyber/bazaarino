"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  icon: string;
image?: string;
  badge?: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "گوشی هوشمند Pro X",
    category: "موبایل",
    price: 24900,
    oldPrice: 27900,
    icon: "📱",
    image: "/products/phone.png",
    badge: "پرفروش",
  },
  {
  id: 2,
  name: "لپ‌تاپ Business 15",
  category: "کامپیوتر",
  price: 48900,
  icon: "💻",
  image: "/products/laptop.png",
},
  {
    id: 3,
    name: "ست لباس روزمره",
    category: "لباس",
    price: 1890,
    oldPrice: 2290,
    icon: "👕",
    image: "/products/clothes.png",
    badge: "تخفیف",
  },
  {
    id: 4,
    name: "هدفون بی‌سیم",
    category: "لوازم خانه",
    price: 3200,
    icon: "🎧",
    image: "/products/headphone.png",
  },
  {
    id: 5,
    name: "ساعت هوشمند",
    category: "موبایل",
    price: 4100,
    icon: "⌚",
    image: "/products/watch.png",
  },
  {
    id: 6,
    name: "کیبورد مکانیکی",
    category: "کامپیوتر",
    price: 2800,
    icon: "⌨️",
    image: "/products/keyboard.png",
  },
  {
    id: 7,
    name: "کفش اسپرت",
    category: "لباس",
    price: 2450,
    icon: "👟",
    image: "/products/shoes.png",
  },
  {
    id: 8,
    name: "چراغ مطالعه هوشمند",
    category: "لوازم خانه",
    price: 1350,
    icon: "💡",
    image: "/products/lamp.png",
  },
];

const categories = [
  ["همه", "🛍️"],
  ["موبایل", "📱"],
  ["کامپیوتر", "💻"],
  ["لباس", "👕"],
  ["لوازم خانه", "🏠"],
];

export default function Home() {
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
 
  useEffect(() => {
  const savedCart = localStorage.getItem("bazarino-cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);

useEffect(() => {
  localStorage.setItem("bazarino-cart", JSON.stringify(cart));
}, [cart]);

  const visibleProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (category === "همه" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [category, query]);

  const money = (n: number) =>
    n.toLocaleString("fa-AF") + " افغانی";

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const addToCart = (id: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { id, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <div className="bg-slate-950 text-white text-center text-sm py-2">
        ارسال سریع • پشتیبانی آنلاین • پرداخت امن
      </div>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منو"
          >
            ☰
          </button>

          <div className="font-black text-2xl tracking-tight text-indigo-600">
            بازارینو
          </div>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex absolute md:static top-full right-0 left-0 bg-white md:bg-transparent p-4 md:p-0 gap-5 flex-col md:flex-row shadow md:shadow-none`}
          >
            <a
              href="#"
              className="font-semibold hover:text-indigo-600"
            >
              خانه
            </a>
            <a
              href="#products"
              className="font-semibold hover:text-indigo-600"
            >
              محصولات
            </a>
            <a
              href="#categories"
              className="font-semibold hover:text-indigo-600"
            >
              دسته‌بندی‌ها
            </a>
            <a
              href="#about"
              className="font-semibold hover:text-indigo-600"
            >
              درباره ما
            </a>
          </nav>

          <div className="flex-1 max-w-xl mx-auto hidden sm:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جست‌وجوی محصول..."
              className="w-full rounded-2xl bg-slate-100 border border-transparent focus:border-indigo-300 focus:bg-white outline-none px-5 py-3"
            />
          </div>

          <button
            className="relative rounded-2xl bg-indigo-600 text-white px-4 py-3 font-bold hover:bg-indigo-700"
            onClick={() => setCartOpen(true)}
          >
            🛒{" "}
            <span className="hidden sm:inline">
              سبد خرید
            </span>

            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-rose-500 text-xs grid place-items-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="sm:hidden px-4 pb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجوی محصول..."
            className="w-full rounded-2xl bg-slate-100 px-5 py-3 outline-none"
          />
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 text-white p-8 md:p-14 overflow-hidden relative">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block bg-white/15 rounded-full px-4 py-2 text-sm mb-5">
              فروشگاه آنلاین مدرن
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              هر چیزی که می‌خواهی، یک‌جا پیدا کن.
            </h1>

            <p className="mt-5 text-indigo-100 text-lg leading-8">
              از موبایل و کامپیوتر تا لباس و لوازم خانه؛
              محصولات منتخب با تجربه خرید ساده و سریع.
            </p>

            <a
              href="#products"
              className="inline-block mt-7 bg-white text-indigo-700 font-black px-7 py-3.5 rounded-2xl hover:bg-indigo-50"
            >
              مشاهده محصولات
            </a>
          </div>

          <div className="absolute left-[-20px] bottom-[-45px] text-[180px] opacity-20">
            🛍️
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="max-w-7xl mx-auto px-4 py-10"
      >
        <div className="mb-5">
          <p className="text-indigo-600 font-bold">
            دسته‌بندی
          </p>
          <h2 className="text-2xl font-black">
            خرید بر اساس دسته
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map(([name, icon]) => (
            <button
              key={name}
              onClick={() => setCategory(name)}
              className={`rounded-2xl p-5 text-right border transition ${
                category === name
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-300"
              }`}
            >
              <div className="text-3xl">{icon}</div>
              <div className="mt-3 font-black">{name}</div>
            </button>
          ))}
        </div>
      </section>

      <section
        id="products"
        className="max-w-7xl mx-auto px-4 pb-14"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-indigo-600 font-bold">
              محصولات
            </p>
            <h2 className="text-2xl font-black">
              محصولات پیشنهادی
            </h2>
          </div>

          <span className="text-sm text-slate-500">
            {visibleProducts.length} محصول
          </span>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            محصولی پیدا نشد.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleProducts.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition"
              >
               <a
  href={`/product/${p.id}`}
  className="block"
>
  <div className="h-48 bg-slate-100 grid place-items-center text-8xl relative">
    {p.image ? (
  <img
    src={p.image}
    alt={p.name}
    className="w-full h-full object-cover"
  />
) : (
  p.icon
)}

                  {p.badge && (
                    <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
                </a>
                <div className="p-4">
                  <p className="text-xs text-indigo-600 font-bold">
                    {p.category}
                  </p>

                  <h3 className="font-black mt-1">
                    {p.name}
                  </h3>

                  <div className="mt-4 flex items-end gap-2">
                    <strong className="text-lg">
                      {money(p.price)}
                    </strong>

                    {p.oldPrice && (
                      <del className="text-xs text-slate-400">
                        {money(p.oldPrice)}
                      </del>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(p.id)}
                    className="mt-4 w-full rounded-2xl bg-slate-950 text-white py-3 font-bold hover:bg-indigo-700"
                  >
                    افزودن به سبد
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        id="about"
        className="bg-white border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl">🚚</div>
            <h3 className="font-black mt-3">
              ارسال سریع
            </h3>
            <p className="text-slate-500 mt-2">
              سفارش شما با روند ساده و قابل پیگیری آماده
              ارسال می‌شود.
            </p>
          </div>

          <div>
            <div className="text-3xl">🔒</div>
            <h3 className="font-black mt-3">
              خرید امن
            </h3>
            <p className="text-slate-500 mt-2">
              ساختار فروشگاه برای اضافه شدن پرداخت امن
              طراحی شده است.
            </p>
          </div>

          <div>
            <div className="text-3xl">🤖</div>
            <h3 className="font-black mt-3">
              آماده برای AI
            </h3>
            <p className="text-slate-500 mt-2">
              در مراحل بعدی می‌توانیم جست‌وجوی هوشمند و
              دستیار خرید اضافه کنیم.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <strong className="text-white">
              بازارینو
            </strong>{" "}
            — فروشگاه آنلاین
          </div>

          <div className="text-sm">
            نسخه اولیه پروژه • آماده توسعه به فروشگاه کامل
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-black">
                سبد خرید
              </h2>

              <button
                onClick={() => setCartOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <div className="text-6xl mb-5">🛒</div>
                <p>سبد خرید شما خالی است.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 py-5">
                  {cart.map((item) => {
                    const product = products.find(
                      (p) => p.id === item.id
                    );

                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="border rounded-2xl p-4"
                      >
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-xl bg-slate-100 grid place-items-center text-3xl">
                          <div className="w-16 h-16 rounded-xl bg-slate-100 grid place-items-center text-3xl">
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      className="w-14 h-14 object-contain"
    />
  ) : (
    <span>{product.icon}</span>
  )}
</div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-black">
                              {product.name}
                            </h3>

                            <p className="text-sm text-indigo-600 mt-1">
                              {money(product.price)}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    decreaseQuantity(item.id)
                                  }
                                  className="w-8 h-8 rounded-lg bg-slate-100 font-bold"
                                >
                                  −
                                </button>

                                <span className="font-bold w-6 text-center">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    increaseQuantity(item.id)
                                  }
                                  className="w-8 h-8 rounded-lg bg-slate-100 font-bold"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  removeFromCart(item.id)
                                }
                                className="text-rose-500 text-sm font-bold"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-5">
                  <div className="flex justify-between text-lg font-black">
                    <span>مجموع:</span>
                    <span>{money(totalPrice)}</span>
                  </div>
<a
  href="/checkout"
  onClick={() => setCartOpen(false)}
  className="block w-full mt-5 rounded-2xl bg-indigo-600 text-white py-4 font-black text-center hover:bg-indigo-700"
>
  ادامه به ثبت سفارش
</a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

