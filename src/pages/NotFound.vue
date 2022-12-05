<template>
  <section class="not-f">
    <div class="card">
      <h2>Page not found: 404 Error</h2>
      <p>
        This page could not be found - maybe check out our
        <router-link to="/">Home</router-link>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: auto;
  width: 60%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.not-f{
  height: 66vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
