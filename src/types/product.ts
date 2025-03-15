export interface Product {
    id: string;
    name: string;
    price: number;
    cover: string;           // 封面图片
    originalPrice?: number;  // 原价，用于显示折扣
    images: string[];        // 商品图片
    description: string;
    category: string;      // 分类，如'vestidos', 'blusas'等
    sizes: string[];       // 尺码
    colors?: string[];     // 颜色选项
    stock: number;         // 库存
    isNew?: boolean;       // 是否新品
    isOnSale?: boolean;    // 是否特价
    createdAt: Date;
    updatedAt: Date;
}