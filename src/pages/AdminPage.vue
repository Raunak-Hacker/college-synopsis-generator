<template>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <section class="admin" v-else>
    <div class="title">
      <img src="../assets/logox.png" alt="" />
      <span
        ><select v-model="nclass" @change="changeClass">
          <option value="BCA II">BCA II</option>
          <option value="BBA II">BBA II</option>
          <option value="BCA III">BCA III</option>
          <option value="BBA III">BBA III</option>
        </select>
        Deadline
      </span>
    </div>
    <div class="date">
      <span>Change Date: </span>
      <br />
      <datepicker v-model="date" :lower-limit="lower" />
    </div>
    <button @click="submit">Submit</button>
  </section>
</template>

<script>
import Datepicker from "vue3-datepicker";
export default {
  components: {
    Datepicker,
  },
  computed: {
    host() {
      return this.$store.getters.host;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  data() {
    return {
      date: new Date(),
      lower: new Date(),
      isLoading: false,
      nclass: localStorage.getItem("class") || "BCA II",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    changeClass() {
      localStorage.setItem("class", this.nclass);
      this.fetchData();
    },
    async submit() {
      this.isLoading = true;
      try {
        const res = await fetch(this.host + "/change-date/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            date: this.date,
            class: this.nclass,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          alert("Date changed");
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const res = await fetch(this.host + "/get-date/");
        const data = await res.json();
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].class === this.nclass) {
              this.date = new Date(data[i].date);
              break;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.date {
  display: flex;
  margin-top: 10vh;
  width: max-content;
  align-items: center;
  justify-content: center;
  height: 5vh;
}
.date span {
  margin-right: 8%;
  white-space: nowrap;
  font-size: 1.4rem;
}
.admin {
  height: 87vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  padding: 4.4% 0 3% 0;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title img {
  width: 7%;
  height: auto;
  object-fit: contain;
  margin-right: 1%;
}
.title span {
  display: flex;
  align-items: center;
}
.title select {
  width: max-content;
  padding: 2%;
  border: 1px solid rgba(0, 0, 0, 0.304);
  border-radius: 5px;
  margin-right: 5%;
  font-size: 1.6rem;
  font-weight: 600;
  background: #f8f8f8;
  outline: 0;
  transition: all 0.25s ease-in-out;
}
button {
  padding: 1% 2.5%;
  border: 1px solid rgba(0, 0, 0, 0.204);
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: 600;
  background: greenyellow;
  cursor: pointer;
  outline: 0;
  color: rgb(68, 68, 68);
  transition: all 0.25s ease-in-out;
  margin-top: 10vh;
}
button:hover {
  background: #dd0b0b;
  color: #fff;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 1rem;
  }
  .title img {
    width: 15%;
  }
  .date {
    flex-direction: column;
  }
  .title select {
    font-size: 1rem;
  }
  button {
    font-size: 1rem;
    padding: 3% 5%;
  }
}
</style>
