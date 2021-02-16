<template>
  <v-container class="vacancies">
    <v-data-table
      :calculate-widths="true"
      :hide-default-footer="true"
      caption="Список ваканский"
      :headers="headers"
      :items="vacancies"
      :items-per-page="onPage"
      :loading="$apollo.queries.vacancies.loading"
      loading-text="Загрузка..."
      class="vacancies__table"
    >
    <template v-slot:item.dateOpen="{ item }">
      <span>{{ new Date(Date(item.dateOpen)).toLocaleString('ru',{
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) }}</span>
    </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-select
        :items='paging'
        v-model='onPage'
        label='Строк на страницу'
      />
    </div>
    <div v-if="error" class="vacancies__msg vacancies__msg--error"><span>{{ error }}</span></div>
  </v-container>
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
      headers: [
        { text: 'ID', value: 'ID' },
        { text: 'Должность', value: 'position.text' },
        { text: 'Описание', value: 'description' },
        { text: 'Город', value: 'Address.city' },
        { text: 'Зарплата от', value: 'salaryFrom' },
        { text: 'Дата размещения', value: 'dateOpen', width: '1' },
      ],
      paging: [
        {text:'10', value: 10},
        {text:'20', value: 20},
        {text:'40', value: 40},
        {text:'60', value: 60},
        {text:'Все', value: -1}
      ],
      onPage: 10,
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