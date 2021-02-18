<template>
  <v-container class="vacancies">
    <div v-if="!error">
      <v-item-group>
        <v-container>
          <v-col>
            <v-row dense>
              <v-col>
                <v-text-field
                  v-model="position"
                  prepend-icon="mdi-briefcase-account-outline"
                  label="Должность"
                  hide-details
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="city"
                  prepend-icon="mdi-city-variant-outline"
                  label="Город"
                  hide-details
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="getLocaleDate(dateOpen)"
                      label="Размещено от"
                      prepend-icon="mdi-calendar"
                      clearable
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateOpen"
                    @input="menu1 = false"
                    first-day-of-week="1"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="salaryFrom"
                  prepend-icon="mdi-currency-rub"
                  label="Зарплата от"
                  hide-details
                  type="number"
                  step="500"
                  min="0"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="headers"
                  v-model="sortBy"
                  label="Сортировать по"
                  :prepend-icon="sortDesc?'mdi-sort-variant':'mdi-sort-reverse-variant'"
                  @click:prepend="sortDesc = !sortDesc"
                  clearable
                />
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
        :header-props="{ sortIcon: null }"
        :footer-props="footerProps"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:item.ID="{ item }">
          <span>{{ positionIndex( item ) }}</span>
        </template>
        <template v-slot:item.dateOpen="{ item }">
          <span>{{ getLocaleDate(item.dateOpen) }}</span>
        </template>
      </v-data-table>
    </div>
    <v-alert
      v-if="error"
      type="error"
      text
    >{{ error }}</v-alert>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import Moment from 'moment'
import 'moment/locale/ru'

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
  }`

export default {
  name: 'Vacancies',
  data: () => ({
    headers: [
      { text: '№', value: 'ID' },
      { text: 'Работодатель', value: 'employer.text' },
      { text: 'Должность', value: 'position.text' },
      { text: 'Занятость', value: 'typeEmployment.text' },
      { text: 'Город', value: 'Address.city' },
      { text: 'Зарплата от', value: 'salaryFrom' },
      { text: 'Дата размещения', value: 'dateOpen' },
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
    menu1: false,
    error: null,
    position: '',
    sortBy: '',
    sortDesc: false,
  }),
  computed: {
    getFiltered() {
      return this.vacancies.filter(f => {
        return this.position == null || f.position.text.toUpperCase().includes(this.position.toUpperCase())
      }).filter(f => {
        return this.city == null || f.Address.city.toUpperCase().includes(this.city.toUpperCase())
      }).filter(f => {
        return this.salaryFrom == null || f.salaryFrom >= (parseInt(this.salaryFrom) >= 0?parseInt(this.salaryFrom):0)
      }).filter(f => {
        return this.dateOpen == null || f.dateOpen >= this.dateOpen
      })
    }
  },
  methods: {
    positionIndex(i) {
      return this.vacancies.map( (x) => {return x.ID}).indexOf(i.ID)+1
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    getLocaleDate(date) {
      if (date) {
        let dt = String(date).split(' ')[0]
        return Moment(dt).format('DD.MM.YYYY')
      }
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
}
</script>

<style scoped>
</style>