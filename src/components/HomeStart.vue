<template>
  <section class="start">
    <div class="title">
      <img src="../assets/logox.png" alt="" />
      <h1>NCK SYNOPSIS</h1>
    </div>
    <h1>Select a class to start</h1>
    <select v-model="nclass">
      <option value="" disabled>Select a class</option>
      <option value="BCA II">BCA II</option>
      <option value="BBA II">BBA II</option>
      <option value="BCA III">BCA III</option>
      <option value="BBA III">BBA III</option>
    </select>
    <button @click="start()" :class="{ rig: nclass }">START</button>
  </section>
</template>

<script>
export default {
  name: "HomeStart",
  data() {
    return {
      nclass: "",
    };
  },
  methods: {
    start() {
      if (this.nclass !== "") {
        localStorage.setItem("class", this.nclass);
        this.$emit("start");
      }
    },
  },
};
</script>

<style scoped>
.start {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 87vh;
  padding-top: 3vh;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 5vh;
}
img {
  width: 25%;
  height: auto;
  object-fit: contain;
  margin-right: 3%;
}
select {
  width: max-content;
  outline: 0;
  margin: 7vh 0;
  height: 9%;
  border: 1px solid rgba(0, 0, 0, 0.204);
  border-radius: 5px;
  padding: 0 1%;
  font-size: 1rem;
}
button {
  padding: 1% 5%;
  border-radius: 5px;
  border: 1px solid white;
  font-size: 24px;
}
.rig {
  animation: glow 1s infinite alternate;
  background: linear-gradient(#ff469f, #ff6062);
  cursor: pointer;
  color: rgba(245, 245, 245, 0.795);
}
@keyframes glow {
  from {
    box-shadow: 0 0 5px -10px #aef4af;
  }
  to {
    box-shadow: 0 0 5px 10px #aef4af;
  }
}

@media screen and (max-width: 768px) {
  .title h1{
    font-size: 1.4rem;
  }
  h1{
    font-size: 1.07rem;
  }
  .title img {
    object-fit: contain;
    width: 17%;
    margin-right: 2;
  }
  select {
    margin: 5vh 0;
    border: 1px solid rgba(0, 0, 0, 0.104);
    background: whitesmoke;
    width: 40%;
  }
  button {
    font-size: 1.2rem;
    padding: 5% 10%;
  }
}
</style>
