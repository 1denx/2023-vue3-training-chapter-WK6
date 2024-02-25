<template>
  <div class="container mt-4 text-center">
    <nav>
      <h2>後台頁面</h2>
      <RouterLink to="/">回到前台</RouterLink>
    </nav>
    <Router-view></Router-view>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    checkLogin() {
      axios.post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          console.log('驗證成功:', res.data.success);
        })
        .catch((err) => {
          console.log(err);
          this.$router.push('/admin/login');
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkLogin();
  },
};
</script>
