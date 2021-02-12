<template>
  <div>
    <h2>This is my first GraphQL Clinet by Vue</h2>
    <div v-if="$apollo.queries.vacancies.loading" class="msg msg__loading">Loading...</div>
    <table border="1">
      <tr>
        <th>#(id)</th>
        <th>Position</th>
        <th>Description</th>
        <th>Address</th>
        <th>Salary from</th>
        <th>Date open</th>
      </tr>
      <tr v-for="( v, i ) in vacancies" :key="v.ID">
        <td>{{ i+1 }}({{ v.ID }})</td>
        <td>{{ v.position.text }}</td>
        <td>{{ v.description }}</td>
        <td>{{ v.Address.city }}</td>
        <td>{{ v.salaryFrom.toLocaleString("ru") }}</td>
        <td>{{ new Date(Date(v.dateOpen)).toLocaleString("ru") }}</td>
      </tr>
    </table>
    <div v-if="error" class="msg msg__error">{{ error }}</div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_VACANCIES = gql`
  query {
    vacancies {
      ID
      position {
        text
        id
      }
      description
      salaryFrom
      dateOpen
      Address {
        id
        city
      }
    }
  }
`;

export default {
  name: "Vacancies",
  data() {
    return {
      paging: [10,20,40,60,0],
      onPage: 0,
      sortBy: '',
      vacancies: [],
      error: null,
    };
  },
  apollo: {
    vacancies: {
      query: GET_VACANCIES,
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>

<style scoped>
</style>