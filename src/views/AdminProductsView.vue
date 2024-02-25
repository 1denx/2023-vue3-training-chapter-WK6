<template>
    <div class="container mt-4 text-center">
        <h2>產品列表</h2>
        <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('create')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td class="text-end">{{product.origin_price}}</td>
              <td class="text-end">{{product.price}}</td>
              <td>
                <span class="text-success" v-if="product.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', product)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- pagination -->
        <PaginationComponent :pages="pages" :get-data="getData"></PaginationComponent>
      </div>
      <!-- Modal -->
      <ProductModal
        :temp-product="tempProduct"
        :update-product="updateProduct"
        :create-images="createImages"
        :is-new="isNew"
        ref="pModal"
      ></ProductModal>
      <DelProductModal
        :temp-product="tempProduct"
        :del-product="delProduct"
        ref="dModal"
      ></DelProductModal>
    </div>
</template>
<script>
import axios from 'axios';
import PaginationComponent from '../components/PaginationComponent.vue';
import ProductModal from '../components/ProductModal.vue';
import DelProductModal from '../components/DelProductModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isNew: false,
      // 全部產品資料
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pages: {},
    };
  },
  methods: {
    getData(page = 1) { // 參數預設值為1
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`; // 分頁
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(isNew, product) {
      if (isNew === 'create') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...product };
        this.isNew = false;
        this.$refs.pModal.openModal();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.dModal.openModal();
      }
    },
    updateProduct() {
      let url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$refs.pModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delProduct() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
        .then((res) => {
          alert(res.data.message);
          this.$refs.dModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    this.getData();
  },
  components: {
    PaginationComponent,
    ProductModal,
    DelProductModal,
  },
};
</script>
