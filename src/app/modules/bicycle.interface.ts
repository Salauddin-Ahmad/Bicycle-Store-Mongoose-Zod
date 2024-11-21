export enum BicycleTypeInterface {
    Mountain = 'Mountain',
    Road = 'Road',
    Hybrid = 'Hybrid',
    BMX = 'BMX',
    Electric = 'Electric',
  }
  
  export interface ProductInterface {
    _id: string;
    name: string;
    brand: string;
    price: number;
    type: BicycleTypeInterface;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
  }

  
  export interface Orderinterface {
    _id: string;
    email: string;
    product: string;  // Product ObjectId
    quantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  }
  