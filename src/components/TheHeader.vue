<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" @click="nameX" v-if="!name" />
      <div v-else @click="nameX" class="logo-text">
        Made with <span class="heart">♥</span> <br />
        by Raunak Sadhwani
      </div>
    </div>
    <i class="bx bx-menu" @click="toggleMenu" />
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/teams">All Teams</router-link></li>
      <li><router-link to="/why-made">Why Made?</router-link></li>
      <li><router-link to="/help">Help</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
    <transition name="slide">
      <ul class="mnav-links" v-if="menu">
        <div class="menu-btn" @click="toggleMenu">
          <i class="bx bx-x" />
        </div>
        <router-link @click="toggleMenu" to="/"><li>Home</li></router-link>
        <router-link @click="toggleMenu" to="/help"><li>Help</li></router-link>
        <router-link @click="toggleMenu" to="/why-made"><li>Why Made?</li></router-link>
        <router-link @click="toggleMenu" to="/teams"><li>All Teams</li></router-link>
        <router-link @click="toggleMenu" to="/login" v-if="!auth"
          ><li>Login</li></router-link
        >
        <a @click="logout" v-else><li>Logout</li></a>
      </ul>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      name: false,
      menu: false,
      auth: false,
    };
  },
  created() {
    if (localStorage.getItem("login")) {
      this.auth = true;
    }
  },
  methods: {
    nameX() {
      this.name = !this.name;
      setTimeout(() => {
        this.name = false;
      }, 3000);
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
    logout() {
      localStorage.removeItem("login");
      this.$router.push("/login");
      this.menu = !this.menu;
    },
  },
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  height: 13vh;
  width: 100%;
  z-index: 10000;
  border: 1px solid white;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 0 1.5%;
  padding-right: 5%;
}
.logo {
  height: 100%;
  width: max-content;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.logo-text {
  font-weight: 600;
  text-align: center;
}
.logo img {
  height: 80%;
  width: 100%;
  object-fit: contain;
}
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-weight: 600;
  width: 33%;
  overflow: hidden;
  white-space: nowrap;
}
li {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black;
}
i {
  display: none;
}
.mnav-links {
  display: none;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 200ms ease-in-out;
}

@media screen and (max-width: 768px) {
  header {
    height: 12vh;
    width: 100%;
  }
  .logo {
    width: 50%;
    justify-content: flex-start;
  }
  .logo img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  .logo-text {
    font-weight: 600;
    text-align: center;
    font-size: 0.8rem;
    color: black;
    white-space: nowrap;
  }
  ul {
    display: none;
  }
  i {
    display: block;
    font-size: 1.6rem;
    cursor: pointer;
  }
  .mnav-links {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 50vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    z-index: 2;
  }
  .menu-btn {
    height: 7vh;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;

    padding-right: 10%;
  }
  .menu-btn i {
    font-size: 1.6rem;
  }
  li {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 1.25rem;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
