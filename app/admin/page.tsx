"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  customer: {
    name: string;
    phone: string;
    province: string;
    address: string;
    payment: string;
  };
  products: {
    id: number;
    quantity: number;
  }[];
  total: number;
  date: string;
  status: string;
};

const products = [
  { id: 1, name: "گوشی هوشمند Pro X" },
  { id: 2, name: "لپ‌تاپ Business 15" },
  { id: 3, name: "ست لباس روزمره" },
  { id: 4, name: "هدفون بی‌سیم" },
  { id: 5, name: "ساعت هوشمند" },
  { id: 6, name: "کیبورد مکانیکی" },
  { id: 7, name: "کفش اسپرت" },
  { id: 8, name: "چراغ مطالعه هوشمند" },
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
const newOrders = orders.filter(
  (order) => order.status === "جدید"
).length;

const processingOrders = orders.filter(
  (order) => order.status === "در حال بررسی"
).length;

const shippedOrders = orders.filter(
  (order) => order.status === "ارسال شد"
).length;

const completedOrders = orders.filter(
  (order) => order.status === "تکمیل شد"
).length;
  useEffect(() => {
    const savedOrders = localStorage.getItem("bazarino-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-AF") + " افغانی";
  };

  const changeStatus = (id: number, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "bazarino-orders",
      JSON.stringify(updatedOrders)
    );
  };

  const deleteOrder = (id: number) => {
    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "bazarino-orders",
      JSON.stringify(updatedOrders)
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
          <p className="text-indigo-600 font-bold">
            پنل مدیریت بازارینو
          </p>

          <h1 className="text-3xl md:text-4xl font-black mt-2">
            مدیریت سفارش‌ها
          </h1>

          <p className="text-slate-500 mt-3">
            سفارش‌های ثبت‌شده فروشگاه در این قسمت نمایش داده می‌شوند.
          </p>

          <div className="mt-5 inline-flex bg-indigo-50 text-indigo-700 px-5 py-3 rounded-2xl font-black">
            تعداد سفارش‌ها: {orders.length}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">

  <div className="bg-indigo-50 rounded-2xl p-5">
    <p className="text-sm text-slate-500">
      کل سفارش‌ها
    </p>
    <p className="text-3xl font-black text-indigo-600 mt-2">
      {orders.length}
    </p>
  </div>

  <div className="bg-blue-50 rounded-2xl p-5">
    <p className="text-sm text-slate-500">
      سفارش‌های جدید
    </p>
    <p className="text-3xl font-black text-blue-600 mt-2">
      {newOrders}
    </p>
  </div>

  <div className="bg-yellow-50 rounded-2xl p-5">
    <p className="text-sm text-slate-500">
      در حال بررسی
    </p>
    <p className="text-3xl font-black text-yellow-600 mt-2">
      {processingOrders}
    </p>
  </div>

  <div className="bg-orange-50 rounded-2xl p-5">
    <p className="text-sm text-slate-500">
      سفارش‌های ارسال‌شده
    </p>
    <p className="text-3xl font-black text-orange-600 mt-2">
      {shippedOrders}
    </p>
  </div>

  <div className="bg-green-50 rounded-2xl p-5">
    <p className="text-sm text-slate-500">
      تکمیل‌شده
    </p>
    <p className="text-3xl font-black text-green-600 mt-2">
      {completedOrders}
    </p>
  </div>

</div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-2xl font-black">
              هنوز سفارشی ثبت نشده است
            </h2>

            <p className="text-slate-500 mt-3">
              وقتی مشتری سفارشی ثبت کند، اطلاعات آن در اینجا نمایش داده می‌شود.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-7"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">

                  <div>
                    <p className="text-sm text-slate-400">
                      شماره سفارش
                    </p>

                    <h2 className="font-black text-lg">
                      #{order.id}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      تاریخ ثبت
                    </p>

                    <p className="font-bold">
                      {order.date}
                    </p>
                  </div>

                  <div>
  <p className="text-sm text-slate-400 mb-2">
    وضعیت سفارش
  </p>

  <div className="flex items-center gap-2">
    <span
      className={`px-3 py-2 rounded-xl font-bold text-sm ${
        order.status === "جدید"
          ? "bg-blue-100 text-blue-700"
          : order.status === "در حال بررسی"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "ارسال شد"
          ? "bg-orange-100 text-orange-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {order.status}
    </span>

    <select
      value={order.status}
      onChange={(e) =>
        changeStatus(order.id, e.target.value)
      }
      className="border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 font-bold outline-none focus:border-indigo-500"
    >
      <option value="جدید">جدید</option>
      <option value="در حال بررسی">
        در حال بررسی
      </option>
      <option value="ارسال شد">
        ارسال شد
      </option>
      <option value="تکمیل شد">
        تکمیل شد
      </option>
    </select>
  </div>
</div>

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-black text-lg mb-4">
                      👤 اطلاعات مشتری
                    </h3>

                    <div className="space-y-2 text-slate-700">
                      <p>
                        <strong>نام:</strong>{" "}
                        {order.customer.name}
                      </p>

                      <p>
                        <strong>شماره تماس:</strong>{" "}
                        {order.customer.phone}
                      </p>

                      <p>
                        <strong>ولایت:</strong>{" "}
                        {order.customer.province}
                      </p>

                      <p>
                        <strong>آدرس:</strong>{" "}
                        {order.customer.address}
                      </p>

                      <p>
                        <strong>پرداخت:</strong>{" "}
                        {order.customer.payment}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-black text-lg mb-4">
                      🛍️ محصولات سفارش
                    </h3>

                    <div className="space-y-3">
                      {order.products.map((item) => {
                        const product = products.find(
                          (p) => p.id === item.id
                        );

                        if (!product) return null;

                        return (
                          <div
                            key={item.id}
                            className="flex justify-between items-center bg-white rounded-xl p-3"
                          >
                            <span className="font-bold">
                              {product.name}
                            </span>

                            <span className="text-slate-500">
                              × {item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                      <span className="font-bold">
                        مجموع:
                      </span>

                      <span className="font-black text-indigo-600">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-100"
                  >
                    🗑️ حذف سفارش
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}