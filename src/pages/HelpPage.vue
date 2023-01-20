<template>
  <section class="help">
    <div class="items">
      <div class="item" @click="pushQuery(1)">
        <strong>How to submit the synopsis in right way?</strong>
        <i class="bx bx-arrow-to-right"></i>
      </div>
      <div class="item" @click="pushQuery(2)">
        <strong>How to generate synopsis pdf and download?</strong>
        <i class="bx bx-arrow-to-right"></i>
      </div>
      <div class="item" @click="pushQuery(3)">
        <strong>How to edit or delete your team entry in teams?</strong>
        <i class="bx bx-arrow-to-right"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    pushQuery(id) {
      this.$router.push("/help/" + id);
    },
  },
};
</script>

<style scoped>
.help {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87vh;
}
strong {
  font-size: 1.1rem;
  word-spacing: 0.3rem;
  text-transform: capitalize;
}
.items {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  height: 15vh;
  margin-bottom: 8vh;
  padding: 0 5%;
  padding-left: 3%;
  transition: all 0.5s ease-in;
}
.item i {
  font-size: 1.8rem;
}
.item:hover {
  transform: scale(1.03);
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .items {
    width: 80%;
  }
  .item strong {
    width: 70%;
    padding-left: 2.5%;
    font-size: 0.9rem;
    word-spacing: 0.1rem;
  }
  .item i {
    width: 15%;
    font-size: 1.6rem;
  }
}
</style>
