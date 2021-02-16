<template>
  <div class="vacancies">
    <h2 class="vacancies__h2">This is my first GraphQL Clinet by Vue</h2>
    <div 
      v-if="$apollo.queries.vacancies.loading" 
      class="vacancies__msg vacancies__msg--loading"
    >
      <span>Загрузка...</span>
    </div>
    <div v-else-if="$apollo.queries.vacancies.data">
      <table class="vacancies__table">
        <caption>Вакансии - <a href="https://rabotut.com/">rabotut.com</a></caption>
        <thead class="vacancies__table--row vacancies__table--row-header">
          <th class="vacancies__table--cell">#(id)</th>
          <th class="vacancies__table--cell">Position</th>
          <th class="vacancies__table--cell">Description</th>
          <th class="vacancies__table--cell">Address</th>
          <th class="vacancies__table--cell">Salary from</th>
          <th class="vacancies__table--cell">Date open</th>
        </thead>
        <tbody v-for="( v, i ) in vacancies" :key="v.ID" class="vacancies__table--row vacancies__table--row-body">
          <td class="vacancies__table--cell">{{ i+1 }}({{ v.ID }})</td>
          <td class="vacancies__table--cell">{{ v.position.text }}</td>
          <td class="vacancies__table--cell">{{ v.description }}</td>
          <td class="vacancies__table--cell">{{ v.Address.city }}</td>
          <td class="vacancies__table--cell">{{ v.salaryFrom.toLocaleString("ru") }}</td>
          <td class="vacancies__table--cell">{{ new Date(Date(v.dateOpen)).toLocaleString("ru") }}</td>
        </tbody>
        <tfoot class="vacancies__table--row vacancies__table--row-footer">
          <td></td>
        </tfoot>
      </table>
    </div>
    <div v-if="error" class="vacancies__msg vacancies__msg--error"><span>{{ error }}</span></div>
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