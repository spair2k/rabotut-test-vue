import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App.vue";
import VueApollo from "vue-apollo";
import vuetify from './plugins/vuetify';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.rabotut.com/query"
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.config.productionTip = false;

Vue.use(VueApollo);
new Vue({
  provide: new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: "loading"
    }
  }).provide(),
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
