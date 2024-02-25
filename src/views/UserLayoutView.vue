<template>
  <div class="container mt-4 text-center">
    <h2>前台頁面</h2>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/products">產品列表</RouterLink> |
      <RouterLink to="/cart">購物車</RouterLink> |
      <RouterLink to="/admin/login">後台登入</RouterLink>
    </nav>
  </div>
  <Router-view></Router-view>
</template>
