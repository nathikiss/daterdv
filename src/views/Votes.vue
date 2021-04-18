<template>
  <div class="">
    <h1>Votes Reunions</h1>
    <div :key="index" v-for="(reunion, index) in reunion">
      <div v-if="reunion.nom_reunion =='Ma Reunion Test'">
        <h1>{{ reunion.nom_reunion }}</h1>
        <p>{{ reunion.mot_de_passe }}</p>
        <p>{{ reunion.created_by }}</p>
        <table class="table table-hover">
          <!-- nbDates permet de retrouver le nb de dates dans l'objet et ainsi naviguer facilement -->
          <thead>
            <tr>
              <th scope="col">Dates</th>
              <th scope="col">Disponibilités</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="nbDates" v-for="nbDates in reunion.dates.length">
              <td>{{ reunion.dates[nbDates - 1].date }}</td>
              <td>
                <div>
                  <button type="button" class="btn btn-success btn-margin">
                    +
                  </button>
                  <button type="button" class="btn btn-warning btn-margin">
                    + -
                  </button>
                  <button type="button" class="btn btn-danger btn-margin">
                    - -
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>{{ reunion.participants }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const API=process.env.VUE_APP_ROOT_API
console.log(API)
export default {
  name: "Votes",
  components: {
    
  },
  data() {
    return {
      reunion: null,
      toIncrement: 0,
      date: null,
    };
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
.btn-margin {
  margin-right: 0.2em;
}
</style>