import { UserProfile } from "@/types/user";

export const mockUser: UserProfile = {
  id: "u-001",
  name: "أحمد العمري",
  email: "ahmed@example.com",
  phone: "+966 50 123 4567",
  city: "الرياض",
  avatarInitials: "أع",
  memberSince: "يناير ٢٠٢٤",
  orders: [
    {
      id: "ORD-001",
      date: "١٥ يناير ٢٠٢٥",
      product: "عود الملوك",
      price: "٢٥٠ ريال",
      status: "delivered",
    },
    {
      id: "ORD-002",
      date: "٢ فبراير ٢٠٢٥",
      product: "ورد الطائف",
      price: "١٨٠ ريال",
      status: "processing",
    },
    {
      id: "ORD-003",
      date: "١٠ فبراير ٢٠٢٥",
      product: "المسك الأبيض",
      price: "٢٢٠ ريال",
      status: "delivered",
    },
  ],
};
