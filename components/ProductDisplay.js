app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock :(</p>
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in product.details">{{ detail }}</li>
          </ul>
          <div
            class="color-circle"
            v-for="(variant, index) in product.variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            :style="{ backgroundColor: variant.color }">
          </div>
          <button
            class="button"
            :class="{ disabledButton: !inStock }"
            @click="addToCart"
            :disabled="!inStock">Add to cart</button>
        </div>
      </div>
      <review-list v-show="product.reviews.length" :reviews="product.reviews" />
      <review-form @review-submitted="addReview" />
    </div>`,
  data() {
    return {
      product: {
        name: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { 
                id: 1000, 
                quantity: 3,
                color: 'green', 
                image: './assets/images/socks_green.jpg'
            }, { 
                id: 1001, 
                quantity: 1,
                color: 'blue', 
                image: './assets/images/socks_blue.jpg'
            }
        ],
        reviews: []
      },
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.currentVariant.id)
    },
    updateVariant(index) {
      this.product.selectedVariant = index
    },
    addReview(review) {
      this.product.reviews.push(review)
    }
  },
  computed: {
    title() {
      return this.product.brand + ' ' + this.product.name
    },
    currentVariant() {
      return this.product.variants[this.product.selectedVariant]
    },
    image() {
      return this.currentVariant.image
    },
    inStock() {
      return this.currentVariant.quantity
    }, 
    shipping() {
      if (this.premium) {
        return 'Free'
      }

      return '$ 2.99'
    }
  }
})