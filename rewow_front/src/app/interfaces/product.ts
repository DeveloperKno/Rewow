export interface Product {
  id?: number;
  description: string;
  amount: number;
  category_id: number;
  price: number;
  image: string;
  category?: string;
}
