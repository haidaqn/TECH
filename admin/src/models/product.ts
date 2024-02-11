
export interface Product {
  _id: string
  title: string
  slug: string
  description: string[]
  thumb: string
  price: number
  category: string
  quantity: number
  sold: number
  images: string[]
  color: string
  brand?:string
  totalRatings: number
  ratings: Rating[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Rating {
  star: number
  postedBy: string
  comment: string
  updateAt: string
  _id: string
}


export interface RootProduct {
    count: number;
    products: Product[];
    success: boolean;
}

export interface RootProductGet {
  success : boolean
  product :Product
}


export interface CreateProduct {
  title: string
  description: string
  price: number
  category: string
  quantity?: number
  thumb: string
}