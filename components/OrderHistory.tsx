import { Order } from "@/types/user";

interface OrderHistoryProps {
  orders: Order[];
}

const statusLabels: Record<Order["status"], { label: string; color: string }> =
  {
    delivered: { label: "تم التوصيل", color: "bg-green-100 text-green-700" },
    processing: { label: "قيد المعالجة", color: "bg-amber-100 text-amber-700" },
    cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
  };

export default function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 text-center">
        <p className="text-4xl mb-4">🛍️</p>
        <p className="text-gray-500">لا توجد طلبات بعد</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">سجل الطلبات</h3>
      <div className="space-y-3">
        {orders.map((order) => {
          const statusInfo = statusLabels[order.status];
          return (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {order.product}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.id} · {order.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-amber-700">
                  {order.price}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.color}`}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
