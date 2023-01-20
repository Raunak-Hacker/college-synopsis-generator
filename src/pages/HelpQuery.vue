<template>
  <section class="whole-pg">
    <div class="title">
      <h1>{{ pageData[propId - 1].title }}</h1>
    </div>
    <div class="steps" v-for="step in pageData[propId - 1].steps" :key="step.id">
      <div class="step">
        <img :src="step.img" v-if="step.img" />
        <div class="text">
          <h2 v-if="step.title">{{ step.id }}. {{ step.title }}</h2>
          <p>
            {{ step.para }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";
import s6 from "../assets/s6.png";
import s7 from "../assets/s7.png";

export default {
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  created() {
    if (
      this.$route.params.id == undefined ||
      this.$route.params.id == null ||
      this.$route.params.id > 3 ||
      this.$route.params.id < 1
    ) {
      window.location.replace("/404");
    }
  },
  data() {
    return {
      propId: this.$route.params.id,
      pageData: [
        {
          id: 1,
          title: "How to submit the synopsis in right way?",
          steps: [
            {
              id: 1,
              title: "Select Your Class to start with Synopsis",
              para:
                "Select your class from the dropdown menu and click on the start button",
              img: s1,
            },
            {
              id: 2,
              title: "Fill the details and submit the synopsis",
              para:
                "Fill all the details and select options, carefully as it will be used to generate the synopsis pdf and take permission from your partners before adding them in the team. Editing and deleting the entry is not allowed after submission (So be careful). In the photo, dummy data is used for demonstration purpose. Once Everything is filled, click on the submit button.",
              img: s2,
            },
            {
              id: 3,
              title: "Check if your team is registered",
              para:
                "Once you submit the synopsis, you will be redirected to the all teams page. Check if your team is in list or not. If your team is registered, then you have successfully submitted the synopsis, Please wait till your guide approves your synopsis. If your team is not registered, then you have to submit the synopsis again. For any query, contact your guide teacher.",
              img: s3,
            },
          ],
        },
        {
          id: 2,
          title: "How to generate synopsis pdf and download?",
          steps: [
            {
              id: 1,
              title: "Navigate to the Teams Page and select your class",
              para:
                "Go on All Teams Page from header links and select your class from the dropdown menu.",
              img: s4,
            },
            {
              id: 2,
              title: "Click on your team to download the synopsis pdf",
              para:
                "Once you click on your team, your synopsis pdf will be downloaded shortly. Similarly, you can download the synopsis of any team for your reference.",
              img: s5,
            },
            {
              id: 3,
              title: "Choose Your Location and name for file",
              img: s6,
            },
            {
              id: 4,
              title: "Your Synopsis is ready for the print",
              para: "Now You can print your synopsis, once your guide teacher approves.",
              img: s7,
            },
          ],
        },
        {
          id: 3,
          title: "How To Edit Or Delete Your Team Entry In Teams?",
          steps: [
            {
              para:
                "Currently, editing and deleting the team entry is not allowed. If you want to edit or delete your team entry, contact your guide teacher.",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.whole-pg {
  min-height: 87vh;
  width: 100%;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  font-size: 1.3rem;
  margin-bottom: 5vh;
  text-decoration: underline;
  text-transform: capitalize;
}
.steps {
  width: 100%;
  height: max-content;
}
.step {
  width: 100%;
  height: max-content;
  display: flex;
  padding: 0 2%;
  margin-bottom: 7vh;
}
.step img {
  width: 40%;
  height: max-content;
  object-fit: contain;
  outline: 1px solid rgba(36, 36, 36, 0.281);
  margin-right: 2%;
}
.text {
  width: 60%;
  height: max-content;
  align-items: center;
  /* font-size: 1.4rem; */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding-top: 1vh;
  padding-right: 8%;
}
h2 {
  margin-bottom: 3vh;
}

@media screen and (max-width: 768px) {
  .title {
    height: 15vh;
    font-size: 0.95rem;
    line-height: 5vh;
    padding: 0 4%;
    width: 100%;
    overflow: hidden;
    display: flex;
    margin: 5vh 0;
    margin-bottom: 8vh;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* number of lines to show */
    max-height: 10vh;
  }
  .step {
    flex-direction: column-reverse;
    padding: 0 5%;
  }
  .text {
    width: 100%;
    padding: 0;
  }
  .step img {
    width: 100%;
    height: max-content;
    margin: 0;
    margin-top: 3vh;
  }
  h2 {
    font-size: 1.15rem;
  }
  p {
    font-size: 0.9rem;
  }
}
</style>
