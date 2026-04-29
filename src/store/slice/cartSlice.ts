// src\store\orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { Prisma } from '@prisma/client'


type CartItemColor = {
    id: string;
    color: string;
    model: string;
    inventory: number;
};
type CartItemProduct = {
    id: string;
    title: string;
    priceWithProfit: number;
    priceOffer: number | null
    price: number
    colorSelected?: CartItemColor;  // 👈 رنگ انتخابی این محصول

    image?: string;  // productImage.map(item=>item.defaultImage ===true)[0].childImage
};
// PurchaseOrderItem interface
export type CartItem = {

    // یک شناسه منحصر به فرد برای هر آیتم در سبد خرید (مثلا: productId-color)
    // این کار برای پیدا کردن و آپدیت آیتم‌ها ضروری است
    clientSideId: string;
    product: CartItemProduct; //اطلاعات محصول
    quantity: number; // تعداد انتخاب شده محصول
    colorsSelect: string; // رنگ انتتخاب شده
    unitPrice: number; //قیمت یک دونه محصول
    totalPrice: number; // جمع تعداد * قیمت یک دانه
};



interface CartState {
    items: CartItem[]
    totalPrice: number;
    // orderProduct: FullPurchaseOrderRedux[],
    OpenCart: boolean
    accessCart: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedOrder: any | null; // 👈 سفارش انتخاب شده

}

const initialState: CartState = {
    // orderProduct: [],
    items: [],
    totalPrice: 0,
    OpenCart: false,
    accessCart: false,
    selectedOrder: null, // 👈 مقدار اولیه

}
// تابع کمکی برای محاسبه مجدد قیمت کل
const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

const cartSlice = createSlice({
    name: "cart", // ✅ نام اسلایس را به cart تغییر می‌دهیم
    initialState,
    reducers: {
        // این اکشن برای همگام‌سازی اولیه سبد خرید از دیتابیس با Redux است
        setCartFromDB: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            state.totalPrice = calculateTotalPrice(action.payload);
        },

        // افزودن محصول به سبد یا افزایش تعداد آن
        addItem: (state, action: PayloadAction<{ product: CartItemProduct; colorsSelect: string; quantity: number }>) => {
            const { product, colorsSelect, quantity } = action.payload;
            const clientSideId = `${product.id}-${colorsSelect}`;
            const existingItem = state.items.find(item => item.clientSideId === clientSideId);
            const unitPrice =
                product.priceOffer && product.priceOffer > 0
                    ? Math.round(product.priceWithProfit * (1 - product.priceOffer / 100))
                    : product.priceWithProfit;


            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            } else {
                const newItem: CartItem = {
                    clientSideId,
                    product,
                    colorsSelect,
                    quantity,
                    unitPrice,
                    totalPrice: quantity * unitPrice
                };
                state.items.push(newItem);
            }
            state.totalPrice = calculateTotalPrice(state.items);
        },

        // به‌روزرسانی تعداد یک محصول
        updateItemQuantity: (state, action: PayloadAction<{ clientSideId: string; quantity: number }>) => {
            const { clientSideId, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.clientSideId === clientSideId);

            if (itemToUpdate) {
                if (quantity <= 0) {
                    // اگر تعداد صفر یا کمتر شد، آیتم را حذف کن
                    state.items = state.items.filter(item => item.clientSideId !== clientSideId);
                } else {
                    itemToUpdate.quantity = quantity;
                    itemToUpdate.totalPrice = quantity * itemToUpdate.unitPrice;
                }
            }
            state.totalPrice = calculateTotalPrice(state.items);
        },

        // حذف کامل یک آیتم از سبد
        removeItem: (state, action: PayloadAction<{ clientSideId: string }>) => {
            state.items = state.items.filter(item => item.clientSideId !== action.payload.clientSideId);
            state.totalPrice = calculateTotalPrice(state.items);
        },

        // باز و بسته کردن سبد خرید
        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.OpenCart = action.payload;
        },
        // اگر در سبد خرید تایید نهایی شد  true  شود
        // تا صفحه cart براش نمایش داده شود 
        setAccessCart: (state, action: PayloadAction<boolean>) => {
            state.accessCart = action.payload;
        },

        // پاک کردن کامل سبد خرید
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        // 🟢 سفارش انتخاب شده
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSelectedOrder: (state, action: PayloadAction<any>) => {
            state.selectedOrder = action.payload;
        },

    },
});


export const { setCartFromDB,
    addItem,
    updateItemQuantity,
    removeItem,
    setCartOpen,
    setAccessCart,
    setSelectedOrder,
    clearCart, } = cartSlice.actions
export default cartSlice.reducer