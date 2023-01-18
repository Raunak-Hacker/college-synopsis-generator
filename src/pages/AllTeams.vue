<template>
  <section class="all-app">
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="nt" v-else-if="teams.length === 0">
      <div class="title">
        <img src="../assets/logox.png" alt="" />
        <span
          ><select v-model="nclass" @change="changeClass">
            <option value="BCA II">BCA II</option>
            <option value="BBA II">BBA II</option>
            <option value="BCA III">BCA III</option>
            <option value="BBA III">BBA III</option>
          </select>
          SYNOPSIS</span
        >
      </div>
      <h1>No teams Registered Yet.</h1>
    </div>
    <div class="teams" v-else>
      <span class="cm" v-if="login"
        ><span class="csv" @click="downloadFile">Download in Excel</span></span
      >
      <div class="title">
        <img src="../assets/logox.png" alt="" />
        <span
          ><select v-model="nclass" @change="changeClass">
            <option value="BCA II">BCA II</option>
            <option value="BBA II">BBA II</option>
            <option value="BCA III">BCA III</option>
            <option value="BBA III">BBA III</option>
          </select>
          SYNOPSIS
        </span>
      </div>
      <div class="team-con" v-for="(team, key, index) in teams" :key="key">
        <div
          class="team"
          @click="
            createPdf(
              team.title,
              team.names,
              team.des,
              index,
              team.first,
              team.second,
              team.roll,
              team.class,
              team.sem
            )
          "
        >
          <div class="left">
            <div class="head">
              <strong>Team {{ Object.keys(teams).length - index }}</strong>
              <span
                :style="
                  team.decision == 'review pending'
                    ? 'background: orange'
                    : team.decision == 'approved'
                    ? 'background: limegreen'
                    : 'background: red'
                "
                >{{ team.decision }}</span
              >
            </div>
            <br />
            <div class="ptitle"><strong>Project Title</strong> - {{ team.title }}</div>
            <br />
            <ol>
              <li v-for="name in team.names" :key="name">{{ name }}</li>
            </ol>
          </div>
          <div class="right">
            <i class="bx bx-download"></i>
          </div>
        </div>
        <div class="btns" v-if="login">
          <button style="background: limegreen" @click="dec('y', key, team.title)">
            Approve
          </button>
          <button style="background: red" @click="dec('n', key, team.title)">
            Reject
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import exportFromJSON from "export-from-json";
export default {
  data() {
    return {
      teams: [],
      isLoading: false,
      nclass: null,
    };
  },

  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  async created() {
    this.nclass = localStorage.getItem("class");
    this.fetchData();
    console.log("this.login");
  },
  computed: {
    filteredTeams() {
      return this.teams.filter((team) => {
        return team.class == this.nclass;
      });
    },
    login() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    async createPdf(title, names, des, index, first, second, roll, nclass, sem) {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      let fontSize = 14;
      page.drawText("Shri Prince Shivaji Maratha Boarding House’s", {
        x: width / 3.5,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      fontSize = 22;
      page.drawText("THE NEW COLLEGE, KOLHAPUR", {
        x: width / 4.5,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      fontSize = 16;
      page.drawText("Department of Computer Application", {
        x: width / 3.5,
        y: height - 4 * fontSize - 50,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText("SYNOPSIS", {
        x: width / 2.25,
        y: height - 4 * fontSize - 80,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      fontSize = 14;
      page.drawText("Project Title – " + title, {
        x: 50,
        y: height - 4 * fontSize - 150,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText("Students Name and Roll No –  ", {
        x: 50,
        y: height - 4 * fontSize - 180,
        size: fontSize,

        // bold font
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      let y = 0;
      for (let i = 0; i < names.length; i++) {
        y = height - 4 * fontSize - 210 - i * 20;
        page.drawText(i + 1 + ") " + "  " + names[i] + "  " + roll[i], {
          x: 50,
          y: y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }
      page.drawText(
        "Class  – " + "  " + nclass + "  " + (this.nclass.includes("BBA") ? sem : ""),
        {
          x: 50,
          y: y - 45,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        }
      );
      page.drawText(
        (this.nclass.includes("BCA") ? "Front End" : "Specialization") + " – " + first,
        {
          x: 50,
          y: y - 75,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        }
      );
      page.drawText(
        (this.nclass.includes("BCA") ? "Back End" : "Name of Industry") + " – " + second,
        {
          x: 50,
          y: y - 105,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        }
      );
      page.drawText("Project Information – ", {
        x: 50,
        y: y - 145,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      fontSize = 12;
      // remove \n \r in des
      des = des.replace(/(\r\n|\n|\r)/gm, "");
      if (des.includes("i)")) {
        if (!des.includes("iv)")) {
          des = des.replace(/i\)/, "\ni) ");
          des = des.replace(/ii\)/, "\n \nii) ");
          des = des.replace(/iii\)/, "\n \niii) ");
        } else {
          des = des.replace(/i\)/, "\ni) ");
          des = des.replace(/ii\)/, "\nii) ");
          des = des.replace(/iii\)/, "\niii) ");
          des = des.replace(/iv\)/, "\niv) ");
          des = des.replace(/v\)/, "\nv) ");
          des = des.replace(/vi\)/, "\nvi) ");
        }
      }
      page.drawText(des, {
        x: 70,
        y: y - 175,
        width: 500,
        height: 300,
        size: fontSize,
        font: timesRomanFont,
        lineHeight: 20,
        maxWidth: 460,
        color: rgb(0, 0, 0),
      });
      page.drawText("Teacher's Guide Sign ", {
        x: 50,
        y: 50,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      page.drawText("Students Sign", {
        x: width / 1.35,
        y: 50,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      const pdfBytes = await pdfDoc.save();
      // Trigger the browser to download the PDF document
      download(
        pdfBytes,
        `team ${Object.keys(this.teams).length - index}.pdf`,
        "application/pdf"
      );
    },
    changeClass() {
      localStorage.setItem("class", this.nclass);
      this.fetchData();
    },
    async dec(x, i, title) {
      if (x == "y" && confirm("Are you sure you want to approve: " + title + "?")) {
        await fetch(
          `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/teams/${this.nclass}/${i}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              decision: "approved",
            }),
          }
        );
      } else if (x == "n" && confirm("Are you sure you want to reject: " + title + "?")) {
        await fetch(
          `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/teams/${this.nclass}/${i}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              decision: "rejected",
            }),
          }
        );
      }
      this.fetchData();
    },
    downloadFile() {
      let data = [];
      // new object variable for teams to avoid changing the original data
      let teams = JSON.parse(JSON.stringify(this.teams));
      for (let i in teams) {
        data.push(teams[i]);
      }

      //  change key names
      data.forEach((item) => {
        item.names = item.names.join(", ");
        item.roll = item.roll.join(", ");
        // parse date
        item["Date"] = new Date(item.date).toLocaleDateString();
        item["Members"] = item.names;
        item["Roll No"] = item.roll;
        item["Project Title"] = item.title;
        if (item.class.includes("BCA")) {
          item["Front End"] = item.first;
          item["Back End"] = item.second;
        } else {
          item["Specialization"] = item.first;
          item["Name of Industry"] = item.second;
        }
        item["Project Information"] = item.des;
        item["Class"] = item.class;
        item["Semester"] = item.sem;
        item["Project"] = item.project;
        item["Decision"] = item.decision;
        item["Email"] = item.email;
        delete item.title;
        delete item.names;
        delete item.roll;
        delete item.class;
        delete item.first;
        delete item.second;
        delete item.des;
        delete item.decision;
        delete item.date;
        delete item.email;
        delete item.project;
        delete item.sem;

        // let keys = Object.keys(item);
        // keys.sort();
        // let sorted = {};
        // keys.forEach((key) => {
        //   sorted[key] = item[key];
        // });
        // data[data.indexOf(item)] = sorted;
      });

      const fileName = data[0]["Class"] + " Synopsis Teams";
      const exportType = exportFromJSON.types.csv;
      exportFromJSON({ data, fileName, exportType });
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const res = await fetch(
          `https://nck-synopsis-default-rtdb.asia-southeast1.firebasedatabase.app/teams/${this.nclass}.json`
        );
        const data = await res.json();
        if (data != null) {
          this.teams = data;
          // this.altTeams = Object.values(data);
          // this.teams.reverse();
          // this.teams = Object.values(data).reverse();
        } else {
          this.teams = [];
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
.title {
  font-size: 2rem;
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
  width: 7%;
  height: auto;
  object-fit: contain;
  margin-right: 1%;
}
.left .head {
  width: 100%;
  display: flex;
  align-items: center;
}
.left .head span {
  font-size: 0.9rem;
  font-weight: 600;
  color: whitesmoke;
  background: rgb(243, 165, 20);
  margin-left: 3%;
  padding: 1% 2%;
  border-radius: 25px;
  text-transform: capitalize;
}
.title span {
  display: flex;
  align-items: center;
}
.nt {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.nt img {
  width: 15%;
  object-fit: contain;
}
.nt .title {
  width: 100%;
}
.title select {
  width: max-content;
  padding: 2%;
  border: 1px solid rgba(0, 0, 0, 0.304);
  border-radius: 5px;
  margin-right: 5%;
  font-size: 1.8rem;
  font-weight: 600;
  background: #f8f8f8;
  outline: 0;
  transition: all 0.25s ease-in-out;
}
.all-app {
  display: flex;
  justify-content: center;
  min-height: 87vh;
  padding-top: 5vh;
  position: relative;
}
.csv {
  position: absolute;
  top: 2%;
  right: 0;
  padding: 1% 2%;
  background: rgb(243, 165, 20);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}
.head strong {
  font-size: 1.3rem;
}
strong {
  font-size: 1.1rem;
}
.teams {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
}
.left {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2%;
}
.right {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
}
.btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8%;
  margin-top: 4vh;
}
.btns button {
  width: 20%;
  padding: 1.5% 0;
  border: 1px solid rgba(0, 0, 0, 0.104);
  border-radius: 7px;
  font-size: 1.2rem;
  font-weight: 600;
  outline: 0;
  cursor: pointer;
  color: whitesmoke;
  transition: all 0.25s ease-in-out;
}
.team-con {
  width: 100%;
  height: 100%;
  margin-bottom: 8vh;
}
.team {
  display: flex;
  width: 100%;
  border: 1px solid rgba(124, 255, 2, 0.566);
  border-radius: 30px;
  background: white;
  box-shadow: 15px 15px 10px 2px rgba(0, 0, 0, 0.204);
  min-height: 22vh;
  /* margin-bottom: 8vh; */
  padding: 2%;
  transition: all 0.4s ease-in;
}
.team:hover {
  animation: glow 1s infinite alternate ease-in-out;
  transform: scale(1.03);
  cursor: pointer;
}

@keyframes glow {
  from {
    box-shadow: 10px 10px 10px -7px #aef4af;
  }
  to {
    box-shadow: 10px 10px 10px 7px #aef4af;
  }
}
ol {
  padding-left: 2%;
  line-height: 2;
}

@media screen and (max-width: 768px) {
  .teams {
    width: 85%;
  }
  .team {
    min-height: max-content;
    height: max-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .left {
    width: 100%;
    padding: 8%;
    padding-top: 5%;
  }
  img {
    width: 18% !important;
    margin-right: 5% !important;
  }
  .title {
    font-size: 1rem;
    margin-left: 15%;
  }
  .cm {
    margin-top: 5vh;
  }
  .title select {
    font-size: 1rem;
  }
  .title span {
    width: 78%;
  }
  .right {
    padding-bottom: 5%;
  }
  .right i {
    font-size: 1.95rem;
  }
  .head strong {
    font-size: 1.1rem;
  }
  .left .head span {
    padding: 3% 5%;
    margin-left: 10%;
  }
  .btns button {
    /* padding: 2% 10%; */
    height: 6vh;
    width: 35%;
    font-size: 1rem;
  }
  strong {
    font-size: 0.9rem;
  }
  li {
    font-size: 0.9rem;
  }
  .csv {
    font-size: 0.8rem;
    padding: 4%;
    top: 2vh;
  }
}
</style>
