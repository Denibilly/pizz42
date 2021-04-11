import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  state: {
    cart: [],
    cartSize: 0,
    products: [
        {
            id: 0,
            name: "Original Cheese & Tomato",
            price: 16.99,
            description: "Our original Cheese & Tomato pizza with even more cheese. 193kcal / large slice / classic crust.",
            images: ["pizza1.jpg"]
        },
        {
            id: 1,
            name: "Mighty Meaty®",
            price: 19.99,
            description: "Pepperoni, ham, ground beef, sausage, onions, mushrooms and mozzarella cheese. 225kcal / large slice / classic crust.",
            images: ["pizza2.jpg"]
    
        },
        {
            id: 2,
            name: "Vegi Supreme ",
            price: 18.99,
            description: "Onions, green and red peppers, sweetcorn, mushrooms, tomatoes. 180kcal / large slice / classic crust.",
            images: ["pizza3.jpg"]
        },
    ]
  },
  mutations: {
    addToCart(state, item) {
      let found = state.cart.find(product => product.id == item.id);
      if(found){
        found.quantity++;
        found.totalPrice = found.quantity * found.price;
      }
      else {
        state.cart.push(item);
        Vue.set(item, 'quantity', 1);
        Vue.set(item, 'totalPrice', item.price);
      }
      state.cartSize++;
      return state.cart;
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      if (index > -1) {
          let product = state.cart[index];
          state.cartSize -= product.quantity;
          state.cart.splice(index, 1);
      }
    }
  },
  actions: {
    
  },
  getters: {
    product: (state) => (id) => {
      return state.products.filter(p => p.id === Number(id))[0]
    },
    totalPrice: state => {
      if(state.cart.length > 0) {
        let total = 0;
        for (let item of state.cart) {
            total += item.totalPrice;
        }
        return total.toFixed(2);
      } else {
          return 0;
      }
    },
  }
});