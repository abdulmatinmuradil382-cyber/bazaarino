"use client";

import { useEffect, useState } from "react";
type CartItem = {
  id: number;
  quantity: number;
};

const products = [
  { id: 1, name: "گوشی هوشمند Pro X", price: 24900, image: "/products/phone.png" },
  { id: 2, name: "لپ‌تاپ Business 15", price: 48900, image: "/products/laptop.png" },
  { id: 3, name: "ست لباس روزمره", price: 1890, image: "/products/clothes.png" },
  { id: 4, name: "هدفون بی‌سیم", price: 3200, image: "/products/headphone.png" },
  { id: 5, name: "ساعت هوشمند", price: 4100, image: "/products/watch.png" },
  { id: 6, name: "کیبورد مکانیکی", price: 2800, image: "/products/keyboard.png" },
  { id: 7, name: "کفش اسپرت", price: 2450, image: "/products/shoes.png" },
  { id: 8, name: "چراغ مطالعه هوشمند", price: 1350, image: "/products/lamp.png" },
];

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [province, setProvince] = useState("");
const [address, setAddress] = useState("");
const [payment, setPayment] = useState("پرداخت هنگام دریافت");
useEffect(() => {
  const savedCart = localStorage.getItem("bazarino-cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);

const totalPrice = cart.reduce((total, item) => {
  const product = products.find((p) => p.id === item.id);

  if (!product) return total;

  return total + product.price * item.quantity;
}, 0);

const formatPrice = (price: number) => {
  return price.toLocaleString("fa-AF") + " افغانی";
};

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const order = {
    id: Date.now(),
    customer: {
      name,
      phone,
      province,
      address,
      payment,
    },
    products: cart,
    total: totalPrice,
    date: new Date().toLocaleString("fa-AF"),
  };

  const savedOrders = localStorage.getItem("bazarino-orders");

const orders = savedOrders
  ? JSON.parse(savedOrders)
  : [];

orders.push({
  ...order,
  status: "جدید",
});

localStorage.setItem(
  "bazarino-orders",
  JSON.stringify(orders)
);

localStorage.setItem(
  "bazarino-last-order",
  JSON.stringify(order)
);

localStorage.removeItem("bazarino-cart");

  setCart([]);
  setSubmitted(true);
};

  if (submitted) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50 grid place-items-center p-6"
      >
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-10 text-center max-w-lg w-full">
          <div className="text-6xl mb-5">✅</div>

          <h1 className="text-3xl font-black text-slate-900">
            سفارش شما ثبت شد
          </h1>

          <p className="text-slate-500 mt-4 leading-8">
            تشکر از خرید شما. اطلاعات سفارش شما با موفقیت ثبت گردید.
          </p>

          <a
            href="/"
            className="inline-block mt-7 bg-indigo-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-indigo-700"
          >
            برگشت به فروشگاه
          </a>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-black text-indigo-600"
          >
            بازارینو
          </a>

          <a
            href="/"
            className="font-bold text-slate-600 hover:text-indigo-600"
          >
            ← برگشت به فروشگاه
          </a>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-10">
          <div className="mb-8">
            <p className="text-indigo-600 font-bold">
              تکمیل سفارش
            </p>

            <h1 className="text-3xl md:text-4xl font-black mt-2">
              اطلاعات دریافت سفارش
            </h1>

            <p className="text-slate-500 mt-3">
              لطفاً اطلاعات خود را برای ارسال سفارش وارد کنید.
            </p>
          </div>
          <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
  <h2 className="text-xl font-black text-slate-900 mb-5">
    سفارش شما
  </h2>

  <div className="space-y-4">
    {cart.length === 0 ? (
      <p className="text-slate-500">
        سبد خرید شما خالی است.
      </p>
    ) : (
      cart.map((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) return null;

        return (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-2xl p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-bold text-slate-900">
                {product.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                تعداد: {item.quantity}
              </p>
            </div>

            <div className="font-black text-indigo-600">
              {formatPrice(product.price * item.quantity)}
            </div>
          </div>
        );
      })
    )}
  </div>

  <div className="border-t border-slate-200 mt-5 pt-5 flex justify-between items-center">
    <span className="font-bold text-slate-700">
      مجموع سفارش
    </span>

    <span className="text-xl font-black text-indigo-600">
      {formatPrice(totalPrice)}
    </span>
  </div>
</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-bold mb-2">
                نام و نام خانوادگی
              </label>

             <input
  required
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="نام خود را وارد کنید"
  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white"
/>
            </div>

            <div>
              <label className="block font-bold mb-2">
                شماره تماس
              </label>

              <input
                required
                type="tel"
                value={phone}
onChange={(e) => setPhone(e.target.value)}
                placeholder="مثلاً 07XXXXXXXX"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                ولایت
              </label>

              <input
                required
                type="text"
                value={province}
onChange={(e) => setProvince(e.target.value)}
                placeholder="ولایت خود را وارد کنید"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                آدرس دقیق
              </label>

              <textarea
                required
                value={address}
onChange={(e) => setAddress(e.target.value)}
                rows={4}
                placeholder="آدرس محل تحویل سفارش"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white resize-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                روش پرداخت
              </label>

              <select
              value={payment}
onChange={(e) => setPayment(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white"
              >
                <option>پرداخت هنگام دریافت</option>
                <option>پرداخت آنلاین</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700"
            >
              ثبت نهایی سفارش 🛍️
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}