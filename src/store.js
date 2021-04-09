import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
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
    
  },
  actions: {
    
  },
  getters: {
    product: (state) => (id) => {
      return state.products.filter(p => p.id === Number(id))[0]
    }
  }
});