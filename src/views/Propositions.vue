<template>
  <div class="" >
    <h1>Propositions de Reunions</h1>
    <br />
    <br />

    <!-- TABLEAU de dates -->
    <div v-if="!isHidden">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Dates</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(selectedDate, input) in selectedDates" v-bind:key="input">
          <td><Datepicker v-model="selectedDate.dates" /></td>
        </tr>
      </tbody>
    </table>
    <div class="btn-margin">
      <button type="button" class="btn btn-primary" @click="ajoutDate()">
        +
      </button>
      <button type="button" class="btn btn-danger" @click="retireDate()">
        -
      </button>
    </div>
    <br />
    <br />
    <!-- TABLEAU Participants -->
    <table class="table">
      <thead>
        <tr class="row">
          <th scope="col">Mails Participants</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(lesParticipant, input) in lesParticipants"
          v-bind:key="input"
          class="row" 
        >
          <td><input type="email" v-model="lesParticipant.participant" /></td>
        </tr>
      </tbody>
    </table>
    <div class="btn-margin">
      <button type="button" class="btn btn-primary" @click="ajoutParticipant()">
        +
      </button>
      <button type="button" class="btn btn-danger" @click="retireParticipant()">
        -
      </button>
    </div>
    <br />
    <!-- NOM Reunion -->
    <div class="row">
      <div class="col-md-3">
        <div>
          <div class="mb-3"></div>
        </div>
      </div>
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          id="nom_reunion"
          placeholder="Nom de reunion"
          v-model="nom_reunion"
        />
      </div>
      <div class="col-md-3"></div>
    </div>
    <br />
    <!-- Nom et Email -->
    <div class="row">
      <div class="col-md-3">
        <div>
          <div class="mb-3"></div>
        </div>
      </div>
      <div
        class="col-md-3"
        v-for="(leNom, input) in created_by"
        v-bind:key="input"
      >
        <input
          type="text"
          class="form-control"
          id="nom"
          placeholder="Votre Nom"
          v-model="leNom.nom"
        />
      </div>
      <div
        class="col-md-3"
        v-for="(leMail, input) in created_by"
        v-bind:key="input"
      >
        <input
          type="text"
          class="form-control"
          id="email"
          placeholder="Votre Email"
          v-model="leMail.email"
        />
      </div>
    </div>
    <br />
    <br />
    <h2>Mot de Passe de la Reunion</h2>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="mot_de_passe"
              placeholder="Mot de passe"
              v-model="mot_de_passe"
            />
          </div>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              @click="dataToDb"
            >
              Valider la reunion
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    </div>
    <div v-if="isHidden" class="alert alert-success">
      <h4 class="alert-heading">Well done!</h4> 
      <p > La propositions de réunion a été envoyé vous recevrez
         une notification une fois que tous les participants auront votés </p>
    </div>
  </div>
  
</template>
<script>
import Datepicker from "@/components/Datepicker.vue";
import axios from "axios";
import emailjs from "emailjs-com";
const API=process.env.VUE_APP_ROOT_API
console.log(API)
export default {
  name: "Propositions",
  components: {
    Datepicker,
  },
  data() {
    return {
      reunion: null,
      counter: 1,
      date: null,
      selectedDates: [{ dates: "", notes: null }],
      lesParticipants: [{ id_participant: 1, participant: "" }],
      mot_de_passe: "",
      nom_reunion: "",
      created_by: [{ nom: "", email: "" }],
      isHidden: false,
    };
  },
  methods: {
    ajoutDate() {
      this.selectedDates.push({
        dates: "",
      });
    },
    retireDate() {
      this.selectedDates.splice(this.selectedDates.dates, 1);
    },
    ajoutParticipant() {
      //Les id_participants commencent à 0 pas à 1, (this.lesParticipants.length)+1 n'a pas suffit à arranger cela
      this.lesParticipants.push({
        id_participant: this.lesParticipants.length + 1,
        participant: "",
      });
    },

    retireParticipant() {
      this.lesParticipants.pop({
        id_participant: this.lesParticipants.length + 1,
        participant: "",
      });
    },

    sendEmail: (e) => {
      emailjs
        .sendForm(
          "service_hrb3teh",
          "template_rormsbj",
          e.target,
          "YOUR_USER_ID"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
    dataToDb() {
      const donnees = {
        dates: this.selectedDates,
        nom_reunion: this.nom_reunion,
        participants: this.lesParticipants,
        mot_de_passe: this.mot_de_passe,
        created_by: this.created_by,
        email: this.created_by.email,
        nom: this.created_by.nom,
      };
      axios
        .post("http://localhost:5000/reunions", donnees)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.isHidden = true;
    },
  },
  mounted() {
    axios
      //Ajouter un propositions/"login" dans l'API pour trouver uniquement
      //les dates proposer par l'user connecté changer égalment le lien suivant
      .get("http://localhost:5000/reunions")
      .then((response) => {
        this.reunion = response.data;
        console.log(this.reunion);
      });
  },
};
</script>

<style scoped>
.btn-margin button {
  margin-right: 0.4em;
}
.center {
  padding: auto;
  margin: auto;
  text-align: center;
}
</style>