export interface ISize {
id: number 
  label: string
  // stock?: number 
  // extraPrice?: number | null
  // sku?: string | null
  userId?: string
  productSizes?: IProductSize[]
}

export interface IProductSize {
  productId?: string
  sizeId: number
  extraPrice?: number | null
  stock?: number 
  sku?: string | null
  size?: ISize
  // label: string
  // id?: number,
}