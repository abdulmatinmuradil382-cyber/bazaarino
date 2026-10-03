"use client";

import { use } from "react";

const products = [
  {
    id: 1,
    name: "گوشی هوشمند Pro X",
    category: "موبایل",
    price: 24900,
    icon: "📱",
    image: "/products/phone.png",
    description:
      "یک گوشی هوشمند زیبا و قدرتمند برای استفاده روزمره، کار و سرگرمی.",
  },
  {
    id: 2,
    name: "لپ‌تاپ Business 15",
    category: "کامپیوتر",
    price: 48900,
    icon: "💻",
    image: "/products/laptop.png",
    description:
      "لپ‌تاپ مناسب برای کارهای روزمره، برنامه‌نویسی، درس و کارهای اداری.",
  },
  {
    id: 3,
    name: "ست لباس روزمره",
    category: "لباس",
    price: 1890,
    icon: "👕",
    image: "/products/clothes.png",
    description:
      "لباس راحت و مناسب استفاده روزمره با طراحی ساده و زیبا.",
  },
  {
    id: 4,
    name: "هدفون بی‌سیم",
    category: "لوازم خانه",
    price: 3200,
    icon: "🎧",
    image: "/products/headphone.png",
    description:
      "هدفون بی‌سیم برای موسیقی، تماس و استفاده روزمره.",
  },
  {
    id: 5,
    name: "ساعت هوشمند",
    category: "موبایل",
    price: 4100,
    icon: "⌚",
    image: "/products/watch.png",
    description:
      "ساعت هوشمند با ظاهر مدرن برای استفاده روزانه.",
  },
  {
    id: 6,
    name: "کیبورد مکانیکی",
    category: "کامپیوتر",
    price: 2800,
    icon: "⌨️",
    image: "/products/keyboard.png",
    description:
      "کیبورد مکانیکی مناسب تایپ، برنامه‌نویسی و استفاده طولانی.",
  },
  {
    id: 7,
    name: "کفش اسپرت",
    category: "لباس",
    price: 2450,
    icon: "👟",
    image: "/products/shoes.png",
    description:
      "کفش اسپرت راحت برای استفاده روزمره.",
  },
  {
    id: 8,
    name: "چراغ مطالعه هوشمند",
    category: "لوازم خانه",
    price: 1350,
    icon: "💡",
    image: "/products/lamp.png",
    description:
      "چراغ مطالعه زیبا و مناسب برای میز مطالعه و کار.",
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50 grid place-items-center p-6"
      >
        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <div className="text-6xl mb-5">😕</div>

          <h1 className="text-2xl font-black">
            محصول پیدا نشد
          </h1>

          <a
            href="/"
            className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold"
          >
            برگشت به فروشگاه
          </a>
        </div>
      </main>
    );
  }

  const money = (n: number) =>
    n.toLocaleString("fa-AF") + " افغانی";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
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

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="min-h-[380px] bg-slate-100 grid place-items-center text-[160px]">
              <img
  src={product.image}
  alt={product.name}
  className="max-h-[340px] max-w-[90%] object-contain"
/>
            </div>

            <div className="p-7 md:p-12">
              <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold">
                {product.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-black mt-5">
                {product.name}
              </h1>

              <p className="text-slate-500 leading-8 mt-5">
                {product.description}
              </p>

              <div className="mt-8">
                <p className="text-sm text-slate-500">
                  قیمت محصول
                </p>

                <strong className="text-3xl font-black text-indigo-600">
                  {money(product.price)}
                </strong>
              </div>

              <button
                onClick={() =>
                  alert("محصول به سبد خرید اضافه شد.")
                }
                className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700"
              >
                افزودن به سبد خرید 🛒
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}