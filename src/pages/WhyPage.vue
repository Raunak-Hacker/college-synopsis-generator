<template>
  <section class="help">
    <div class="items">
      <div class="item">
        <strong>
          Basically, this project is designed to stop the duplication of synopsis topics
          and make it simple for students to submit their synopsis.
        </strong>
      </div>
      <div class="item">
        <strong>
          It is now possible for students to check the topics that have already been
          submitted by others, so they can choose something different from what has
          already been submitted.
        </strong>
      </div>
      <div class="item">
        <strong>
          With our new feature, students are now able to generate a pdf version of their
          synopsis and can download it as well, which saves them time.
        </strong>
      </div>
    </div>
  </section>
</template>


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
}
.items {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin: 4vh 0;
  padding: 0 5%;
  padding-left: 3%;
  transition: all 0.5s ease-in;
}
.item i {
  font-size: 1.8rem;
}

@media screen and (max-width: 768px) {

  .items {
    width: 80%;
  }
  .item {
    height: max-content;
    padding: 12% 7%;
    margin-bottom: 5vh;
    text-align: justify;
  }
  strong {
    font-size: .8rem;
    word-spacing: 0.1rem;
  }
  
}
</style>
