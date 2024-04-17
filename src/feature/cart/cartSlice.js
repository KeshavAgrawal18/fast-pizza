import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart:[],
}

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        addItem(state, action) {
            // payload : newItem 
        state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            const index = state.cart.findIndex(obj=> obj.pizzaId === action.payload);

            state.cart.splice(index, 1);
        },
        updateQuantityIncrement(state, action) {
            const index = state.cart.findIndex(obj=> obj.pizzaId === action.payload);
            console.log(index);
            if(index>-1)
            state.cart[index].quantity+=1;
        },
        updateQuantityDecrement(state, action) {
            const index = state.cart.findIndex(obj=> obj.pizzaId === action.payload);
            state.cart[index].quantity-=1;
            if(state.cart[index].quantity ===0) cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state){
            state.cart=[];
        },
        
    }
})

export default cartSlice.reducer;
export const {addItem,updateQuantityDecrement,updateQuantityIncrement, clearCart, deleteItem} = cartSlice.actions;

export const getTotalCartPrice = state => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getTotalCartQuantity = state => state.cart.cart.reduce((total, item) => total + item.quantity, 0)

export const getCurrentQuantityById = id => state => {
    const pizza = state.cart.cart.filter(obj => obj.pizzaId === id);

    if(!pizza.length) return 0;
    return pizza[0].quantity;
}

export const getCart = state => state.cart.cart;
    