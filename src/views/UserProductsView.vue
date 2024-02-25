<template>
    <div class="container mt-4 text-center">
        <h2>產品列表</h2>
        <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.key">
                <td style="width: 200px">
                  <div
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{
                      backgroundImage: `url(${product.imageUrl})`
                    }"
                  ></div>
                </td>
                <td>{{ product.title }}</td>
                <td>
                  <div class="h5" v-if="product.origin_price === product.price">
                    {{ product.price }} 元
                  </div>
                  <div v-else>
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                  </div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="openModal(product)"
                    >
                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      :disabled="product.id === status.addCartLoading"
                      @click="addCart(product.id)"
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        v-if="product.id === status.addCartLoading"
                      ></span>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
</template>
<script>
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
      },
      carts: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/products/all`;
      axios.get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
        });
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addCart(id, qty = 1) {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart`;
      const order = {
        product_id: id,
        qty,
      };
      this.status.addCartLoading = id;
      axios.post(url, { data: order })
        .then((res) => {
          console.log(res);
          this.status.addCartLoading = '';
          this.$refs.userModal.close();
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
