export interface Order {
  id: string;
  date: string;
  product: string;
  price: string;
  status: "delivered" | "processing" | "cancelled";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatarInitials: string;
  memberSince: string;
  orders: Order[];
}
