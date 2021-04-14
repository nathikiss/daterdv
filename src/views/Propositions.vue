<template>
  <div class="">
    <h1>Propositions de Reunions</h1>
    <br />
    <br />
    
    <!-- TABLEAU de dates -->
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
      <button type="submit" class="btn btn-primary" @click="ajoutDate()">
        +
      </button>
      <button type="submit" class="btn btn-danger" @click="retireDate()">
        -
      </button>
    </div>
    <br />
    <br />
    <!-- TABLEAU Participants -->
    <table class="table">
      <thead>
        <tr class="row">
          <th scope="col">Participants</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(lesParticipant, input) in lesParticipants"
          v-bind:key="input"
          class="row"
        >
          <td><input type="email" v-model="lesParticipant.participants" /></td>
        </tr>
      </tbody>
    </table>
    <div class="btn-margin">
      <button type="submit" class="btn btn-primary" @click="ajoutParticipant()">
        +
      </button>
      <button type="submit" class="btn btn-danger" @click="retireParticipant()">
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
    <br>
    <!-- Nom et Email -->
    <div class="row">
      <div class="col-md-3">
        <div>
          <div class="mb-3">
            
          </div>
        </div>
      </div>
      <div class="col-md-3" v-for="(leNom, input) in created_by"
          v-bind:key="input">
        <input
          type="text"
          class="form-control"
          id="nom"
          placeholder="Votre Nom"
          v-model="leNom.nom"
        />
      </div>
      <div class="col-md-3" v-for="(leMail, input) in created_by"
          v-bind:key="input">
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
</template>
<script>
import Datepicker from "@/components/Datepicker.vue";
import axios from "axios";

export default {
  name: "Propositions",
  components: {
    Datepicker,
  },
  data() {
    return {
      reunion: null,
      toIncrement: 0,
      date: null,
      selectedDates: [{ dates: "", notes: null }],
      lesParticipants: [{ participants: "" }],
      mot_de_passe: "",
      nom_reunion: "",
      created_by: [{ nom: "", email: "" }],
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
      this.lesParticipants.push({
        participants: "",
      });
    },
    //todo probleme UX la fonction retire le premier pas le dernier participant
    retireParticipant() {
      this.lesParticipants.splice(this.lesParticipants.participants, 1);
    },
    dataToDb() {
      const donnees = {
        dates: this.selectedDates,
        nom_reunion: this.nom_reunion,
        participants: this.lesParticipants,
        mot_de_passe: this.mot_de_passe,
        created_by:this.created_by,
        email:this.created_by.email,
        nom :this.created_by.nom
      };
      axios
        .post("http://localhost:5000/reunions", donnees)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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