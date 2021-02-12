<template>
  <div>
    <h2>This is my first GraphQL Clinet by Vue</h2>
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
      <tr>{{  }}</tr>
    </table>
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
    };
  },
  apollo: {
    vacancies: {
      query: GET_VACANCIES,
    },
  },
};
</script>

<style scoped>
</style>