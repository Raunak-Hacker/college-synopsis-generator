<template>
  <the-header />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
export default {
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("setAuth", true);
      this.$store.dispatch("autoLogin");
    }
  },
  components: {
    TheHeader,
  },
};
</script>

<style>
input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8%;
  font-size: 1rem;
  width: 100%;
  outline: 0;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-in-out;
}

.route-leave-active {
  transition: all 0.3s ease-in-out;
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
@media screen and (max-width: 768px) {
  input[type="text"] {
    padding: 5%;
  }
}
</style>
