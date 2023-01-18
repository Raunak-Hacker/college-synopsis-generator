<template>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <home-start v-else-if="hstart && reg" @start="start" />
  <section class="home" v-else-if="reg">
    <VueCountdown @end="update" v-slot="{ days, hours, minutes, seconds }" :time="time">
      <div class="cd">
        <div class="cd-con">
          <div class="text">Registeration Closes in -</div>
          <div class="time">{{ days }}<span>days</span></div>
          <div class="time">{{ hours }}<span>hours</span></div>
          <div class="time">{{ minutes }}<span>min</span></div>
          <div class="time">{{ seconds }}<span>sec</span></div>
        </div>
      </div>
    </VueCountdown>
    <div class="title">
      <img src="../assets/logox.png" alt="" /> <span>{{ nclass }} SYNOPSIS</span>
    </div>
    <form @submit.prevent="postForm">
      <div class="left">
        <div class="fisnput">
          <label for="team"
            >Team Members
            <span @click="addUser" v-if="!nclass.includes('BBA')"
              ><i class="bx bx-user-plus"></i></span
          ></label>
          <TransitionGroup name="list">
            <div class="input-name" v-for="(item, index) in items" :key="item">
              <span class="sr">{{ index + 1 }}.</span>
              <input
                type="text"
                minlength="6"
                :required="index === 0"
                maxlength="60"
                name="name"
                oninvalid="setCustomValidity('Invalid! Enter Full Name')"
                onkeydown="return /[a-z ]/i.test(event.key)"
                oninput="setCustomValidity('')"
                id="name"
                placeholder="Enter Full Name"
                pattern="^((\b[a-zA-Z]{2,40}\b)\s*){2,3}$"
                v-model.trim="names[index]"
              />
              <input
                type="text"
                inputmode="numeric"
                pattern="[0-9]{1,3}"
                onkeypress="return /[0-9]/i.test(event.key) || event.key === 'Backspace'"
                class="roll"
                :required="index === 0"
                maxlength="3"
                name="name"
                oninvalid="setCustomValidity('Invalid! Roll No.')"
                oninput="setCustomValidity('')"
                placeholder="Roll"
                v-model.trim="roll[index]"
              />
            </div>
          </TransitionGroup>
        </div>
        <div class="finput" style="padding-top: 5%">
          <label for="email">Email </label>
          <input type="email" maxlength="60" v-model.trim="email" required />
        </div>
        <div class="finput opts" style="padding-top: 5%" required>
          <select v-model="nclass" @change="setClass">
            <option value="" disabled>Class</option>
            <option value="BCA II">BCA II</option>
            <option value="BBA II">BBA II</option>
            <option value="BCA III">BCA III</option>
            <option value="BBA III">BBA III</option>
          </select>
          <select v-model="sem" required>
            <option value="" disabled>Semester</option>
            <option value="SEM IV" v-if="nclass == 'BBA II'">SEM III</option>
            <option value="SEM IV" v-if="nclass == 'BCA II' || nclass == 'BBA II'">
              SEM IV
            </option>
            <option value="SEM V" v-if="nclass == 'BBA III'">SEM V</option>
            <option value="SEM VI" v-if="nclass == 'BCA III' || nclass == 'BBA III'">
              SEM VI
            </option>
          </select>
          <select v-model="project" required>
            <option value="" disabled>Project</option>
            <option value="mini" v-if="nclass == 'BCA II' || nclass == 'BBA II'">
              Mini Project
            </option>
            <option value="major" v-if="nclass == 'BCA III' || nclass == 'BBA III'">
              Major Project
            </option>
          </select>
        </div>
      </div>
      <div class="right">
        <div class="finput">
          <label>Project Title</label>
          <input minlength="7" maxlength="80" type="text" v-model.trim="title" required />
        </div>
        <br />
        <div class="finput">
          <label>{{ nclass.includes("BCA") ? "Front End" : "Specialization" }}</label>
          <input minlength="7" maxlength="80" type="text" v-model.trim="front" required />
        </div>
        <br />

        <div class="finput">
          <label>{{ nclass.includes("BCA") ? "Back End" : "Name of Industry" }}</label>
          <input minlength="7" maxlength="80" type="text" v-model.trim="back" required />
        </div>
        <div class="finput" style="padding-top: 5%">
          <label>Project Description</label>
          <textarea
            minlength="70"
            maxlength="800"
            rows="10"
            type="text"
            v-model.trim="des"
            placeholder="Start with i) ii) iii) ... &#10;&#10;for eg. &#10; &#10;i) This is a point&#10;ii) This is another point"
            required
          />
        </div>
        <button type="submit" class="button-68" role="button" :disabled="disabled">
          SUBMIT
        </button>
      </div>
    </form>
  </section>
  <section class="regclose" v-else>
    <div class="title">
      <div class="mb">
        <select v-model="nclass" @change="setClass">
          <option value="BCA II">BCA II</option>
          <option value="BBA II">BBA II</option>
          <option value="BCA III">BCA III</option>
          <option value="BBA III">BBA III</option>
        </select>
      </div>
      <img class="cl" src="../assets/logox.png" alt="" />
      <span class="mb">
        <img src="../assets/logox.png" alt="" />
        REGISTRATION CLOSED</span
      >
      <span class="cl">
        <select v-model="nclass" @change="setClass">
          <option value="BCA II">BCA II</option>
          <option value="BBA II">BBA II</option>
          <option value="BCA III">BCA III</option>
          <option value="BBA III">BBA III</option>
        </select>
        REGISTRATION CLOSED</span
      >
    </div>
    <div class="text">
      <p>
        Registration for the synopsis has been closed. You can still view the synopsis of
        the projects.
      </p>
    </div>
  </section>
  <!-- <div class="subtitle">A simple, easy to use, and free synopsis generator for BCA III students.</div> -->
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import HomeStart from "../components/HomeStart.vue";
export default {
  components: {
    HomeStart,
    VueCountdown,
  },
  async created() {
    if (localStorage.getItem("class")) {
      this.nclass = localStorage.getItem("class");
      this.hstart = false;
    }
    this.changeDate();
  },
  data() {
    return {
      hstart: true,
      items: 1,
      disabled: false,
      names: [],
      roll: [],
      title: null,
      des: null,
      email: null,
      front: null,
      back: null,
      nclass: "BCA III",
      sem: "",
      project: "",
      isLoading: false,
      time: new Date(),
      reg: true,
    };
  },
  methods: {
    async changeDate() {
      this.isLoading = true;
      let deadline = new Date();
      const res = await fetch(
        `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/admin/${this.nclass}.json`
      );
      const data = await res.json();
      if (data != null) {
        deadline = new Date(data.date);
        deadline.setHours(23);
        deadline.setMinutes(59);
        deadline.setSeconds(59);
      }
      const dateresp = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
      const dataresp = await dateresp.json();
      const now = new Date(dataresp.datetime);
      this.time = deadline - now;
      if (this.time <= 0) {
        this.reg = false;
      } else {
        this.reg = true;
      }
      this.isLoading = false;
    },
    setClass() {
      localStorage.setItem("class", this.nclass);
      this.changeDate();
    },
    addUser() {
      this.items <= 3 ? this.items++ : this.items;
    },
    update() {
      this.reg = false;
    },
    start() {
      this.nclass = localStorage.getItem("class");
      this.hstart = false;
    },
    async postForm() {
      this.disabled = true;
      this.names = this.names.filter((name) => name !== "");
      this.roll = this.roll.filter((roll) => roll !== "");
      if (this.names.length !== this.roll.length) {
        alert("Please enter all the names or roll numbers or clear the extra fields");
        this.disabled = false;
        return;
      }
      const dateresp = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
      const dataresp = await dateresp.json();
      const now = new Date(dataresp.datetime);
      const team = {
        names: this.names,
        title: this.title,
        des: this.des,
        email: this.email,
        date: now,
        class: this.nclass,
        sem: this.sem,
        project: this.project,
        first: this.front,
        second: this.back,
        roll: this.roll,
        decision: "review pending",
      };

      const res = await fetch(
        `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/${this.nclass}teams.json`
      );
      const data = await res.json();
      for (const key in data) {
        if (data[key].email === this.email) {
          alert("Email already exists");
          return;
        }
      }
      try {
        const resp = await fetch(
          `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/teams/${this.nclass}.json`,
          {
            method: "POST",
            body: JSON.stringify(team),
          }
        );
        if (resp.status !== 200) {
          alert("Something went wrong");
          return;
        }
      } catch (err) {
        alert("Something went wrong");
        return;
      }
      this.names = [];
      this.title = null;
      this.des = null;
      this.email = null;
      this.items = 1;
      this.disabled = false;
      setTimeout(() => {
        this.$router.push("/teams");
      }, 250);
    },
  },
};
</script>

<style scoped>
.regclose {
  height: 87vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home {
  height: max-content;
  display: flex;
  flex-direction: column;
}

.cd {
  background-color: #1e1e1edc;
  height: 8vh;
  width: 100%;
  color: white;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
.cd-con {
  height: 100%;
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}
.text {
  font-size: 1.5rem;
  width: max-content;
}
.time {
  /* width: calc(50%/3); */
  width: max-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  letter-spacing: 0.4rem;
}
.time span {
  font-size: 1.2rem;
  margin-left: 10%;
  letter-spacing: normal;
}
.mb {
  display: none;
}
.title {
  font-size: 2.2em;
  font-weight: 600;
  color: #000;
  padding: 1.4% 0 3% 0;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title img {
  width: 6%;
  height: auto;
  object-fit: contain;
  margin-right: 1%;
}
form {
  height: 88%;
  display: flex;
}
form .left {
  width: 50%;
  height: 100%;
  padding: 0 1%;
}
label[for="team"] {
  font-size: 1.5em;
  font-weight: 500;
  color: #000;
  text-align: center;
  padding: 1% 0;
  width: 80%;
  display: flex;
  justify-content: center;
  cursor: text;
}
label[for="team"] span {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4%;
  border-radius: 40%;
  padding: 0.5%;
  cursor: pointer;
}

label {
  font-size: 1.5em;
  font-weight: 500;
  color: #000;
  text-align: left;
  padding: 1%;
  width: 100%;
  cursor: text;
}

.finput {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.finput input,
.finput textarea {
  width: 80%;
  resize: none;
}
.finput textarea {
  font-size: 1em;
}
input,
textarea {
  padding: 2%;
  border: 1px solid rgba(0, 0, 0, 0.404);
  border-radius: 5px;
  margin: 1% 0;
  font-size: 1.1em;
  outline: 0;
  transition: all 0.25s ease-in-out;
}
.input-name {
  display: flex;
  align-items: center;
}
.input-name input {
  width: 60%;
}
.input-name .sr {
  font-weight: 600;
  font-size: 1.3em;
  width: 5%;
}

form .right {
  width: 50%;
  height: 100%;
  padding: 0 1%;
  padding-left: 4%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 2%;
}
.button-68 {
  appearance: none;
  width: max-content;
  backface-visibility: hidden;
  background-color: #27ae60;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, 0.15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  padding: 2.5% 5%;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  transition: box-shadow 0.15s, transform 0.15s;
  margin-right: 20%;
}

.button-68:hover {
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}

.button-68:active {
  transform: translateY(2px);
  transition-duration: 0.35s;
  transform: translateY(2px);
}

.button-68:hover {
  box-shadow: rgba(39, 174, 96, 0.2) 0 6px 12px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;

  transform: translateY(-2px);
}

select {
  width: max-content;
  padding: 2%;
  border: 1px solid rgba(0, 0, 0, 0.404);
  border-radius: 5px;
  margin-right: 2%;
  font-size: 1.1em;
  outline: 0;
  transition: all 0.25s ease-in-out;
}
.cl {
  white-space: nowrap;
  margin-top: 0.5%;
}
.cl select {
  padding: 1%;
  font-size: 1.9rem;
}
.opts {
  flex-direction: row;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
  box-shadow: 4px 4px 4px rgba(81, 203, 238, 0.8);
  border: 1.55px solid rgba(81, 203, 238, 1);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

button {
  margin-top: 2.5%;
}
.roll {
  width: 10% !important;
  margin-left: 4%;
}
@media screen and (max-width: 768px) {
  .roll {
    width: 13% !important;
  }
  form {
    flex-direction: column;
    margin-left: 5%;
    margin-top: 5%;
  }
  form .left {
    width: 100%;
    padding: 0%;
    margin: 0;
  }
  form .right {
    width: 100%;
    padding: 0%;
    margin: 0;
    align-items: flex-start;
    margin-bottom: 5vh;
  }
  .button-68 {
    margin-right: 0;
  }
  .title {
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    font-size: 1.6rem;
  }
  .title img {
    object-fit: contain;
    width: 17%;
  }
  .finput {
    margin-top: 7%;
    padding-left: 3%;
  }
  .button-68 {
    margin: 5vh 0;
    margin-left: 5%;
    font-size: 1.02rem;
    padding: 5% 9%;
  }
  .input-name .sr {
    margin-right: 3%;
    font-size: 1rem;
  }
  .input-name {
    margin-top: 2%;
  }
  label[for="team"],
  label {
    font-size: 1.3rem;
  }
  input,
  textarea,
  .finput textarea {
    font-size: 1em;
    padding: 2%;
    border: 1px solid rgba(0, 0, 0, 0.204);
    border-radius: 5px;
    font-size: 0.9rem;
  }
  .opts {
    flex-direction: column;
  }
  select {
    width: 80%;
    margin-bottom: 6%;
    border: 1px solid rgba(0, 0, 0, 0.104);
    background: whitesmoke;
  }
  .regclose .text {
    width: fit-content;
    font-size: 1.2rem;
    text-align: justify;
    display: block;
    margin-top: 5vh;
  }
  .regclose {
    padding: 0 10%;
  }
  .regclose .title {
    font-size: 1.3rem;
    white-space: nowrap;
  }
  .cd .text {
    display: none;
  }
  .cd-con {
    width: 80%;
  }
  .time {
    font-size: 140%;
    width: min-content;
    letter-spacing: 0.2rem;
  }
  .time span {
    font-size: 0.9rem;
    margin: 0;
  }
  .cl {
    display: none;
  }
  .mb {
    display: block;
    padding-top: 5vh;
  }
  .mb select {
    width: max-content;
    font-size: 1.15rem;
    padding: 10%;
  }
  span.mb {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
