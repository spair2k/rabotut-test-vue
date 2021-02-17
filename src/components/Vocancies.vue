<template>
  <v-container class="vacancies">
    <div v-if="!error">
      <v-item-group>
        <v-container>
          <v-col>
            <v-row dense>
              <v-col sm="3">
                <v-text-field
                  v-model="position"
                  append-icon="mdi-briefcase-account-outline"
                  label="Должность"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col sm="3">
                <v-text-field
                  v-model="city"
                  append-icon="mdi-city-variant-outline"
                  label="Город"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col sm="3">
                <v-text-field
                  v-model="salaryFrom"
                  append-icon="mdi-currency-rub"
                  label="Зарплата от"
                  hide-details
                  type="number"
                  step="500"
                ></v-text-field>
              </v-col>
              <v-col sm="3">
                <v-text-field
                  v-model="dateOpen"
                  append-icon="mdi-calendar"
                  label="Размещено от"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-container>
      </v-item-group>
      <v-data-table
        :calculate-widths="true"
        :headers="headers"
        :items="getFiltered"
        :loading="$apollo.queries.vacancies.loading"
        loading-text="Загрузка..."
        :header-props="headerProps"
        :footer-props="footerProps"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
      <template v-slot:item.ID="{ item }">
        <span>{{ positionIndex( item ) }}</span>
      </template>
      <template v-slot:item.dateOpen="{ item }">
        <span>{{ 
          new Date(Date(item.dateOpen)).toLocaleString('ru',{
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }) 
          }}
        </span>
      </template>
      </v-data-table>

    </div>
    <!-- <div v-if="error" class="vacancies__msg vacancies__msg--error"><span>{{ error }}</span></div> -->
    <v-alert
      v-if="error"
      type="error"
      text
    >{{ error }}</v-alert>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

const GET_VACANCIES = gql`
  query {
    vacancies {
      ID
      employer {
        id
        text
        logo
      }
      position {
        id
        text
      }
      salaryFrom
      salaryTo
      ageFrom
      ageTo
      typeEmployment{
        id
        text
      }
      description
      fio
      email
      viewContact
      dateOpen
      Address {
        id
        city
        street
        houses
      }
    }
  }`;

export default {
  name: "Vacancies",
  data() {
    return {
      headers: [
        { text: '№', value: 'ID' },
        { text: 'Работодатель', value: 'employer.text'},
        { text: 'Должность', value: 'position.text' },
        { text: 'Описание', value: 'description' },
        { text: 'Город', value: 'Address.city' },
        { text: 'Зарплата от', value: 'salaryFrom', width: '10%' },
        { text: 'Дата размещения', value: 'dateOpen', width: '10%' },
      ],
      headerProps: {
        'disable-sort': true,
      },
      footerProps: {
        'items-per-page-options': [5, 10, 20, 40, 60, -1],
      },
      vacancies: [],
      salaryFrom: null,
      city: null,
      dateOpen: null,
      error: null,
      position: '',
      sortBy: 'dateOpen',
      sortDesc: null,
    };
  },
  computed: {
    getFiltered() {
      return this.vacancies.filter(f => {
        return this.position == null || f.position.text.toUpperCase().includes(this.position.toUpperCase())
      }).filter(f => {
        return this.city == null || f.Address.city.toUpperCase().includes(this.city.toUpperCase())
      }).filter(f => {
        return this.salaryFrom == null || f.salaryFrom >= this.salaryFrom
      })
    }
  },
  methods: {
    positionIndex(i) {
      return this.vacancies.map( (x) => {return x.ID}).indexOf(i.ID)+1
    }
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