<template>
  <v-app id="inspire">
    <v-card 
      class="mx-auto owerflow-hidden" 
      width="100%"
      min-height="500" 
      :dark="dark"
      tile
    >
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Список ваканский</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list nav>
          <v-list-item-group
            v-model="group"
          >
            <v-list-group
              :value="true"
              prepend-icon="mdi-tune-variant"
            >
              <template v-slot:activator>
                <v-list-item-title>Настройки</v-list-item-title>
              </template>
              <!-- items -->
              <v-switch v-model="dark" label="Темная тема"/>
              <!-- /items -->
            </v-list-group>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      
      <v-main>
        <Vocancies/>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import Vocancies from './components/Vocancies';

export default {
  name: 'App',

  components: {
    Vocancies
  },

  data: () => ({
    drawer: false,
    dark: false,
    color: "blue",
    group: null
  }),
};
</script>
