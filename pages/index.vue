<template>
<div class="section">

    <div class="columns is-multiline is-centered">
    <div class="column is-one-third"></div>
    <div class="column is-one-third centered is-full">
    <nav class="panel" >
      <p class="panel-heading ">ORC ADMIN</p>
      <label class="panel-block" v-if="this.formError" >
        <div class="notification is-danger" >
          <button class="delete"></button>
          {{this.formError}}
        </div>
      </label>
      <div class="panel-block" >
                
      <!--button class="button" @click="activeTab = 1">Set Music</button-->
      <b-tabs v-model="activeTab" expanded>
        <b-tab-item label="Sign-In">
          <section>
            <b-field label="User Email">
              <b-input type="email"
                  maxlength="50" v-model="email">
              </b-input>
            </b-field>
            <b-field label="Password">
            <b-input type="password" maxlength="30" v-model="password"></b-input>
        </b-field>
        <b-field ><!-- Label left empty for spacing -->
            <p class="control">
                <button class="button is-primary" @click="login()">
                  submit
                </button>
            </p>
        </b-field>
          </section>
        </b-tab-item>

        <b-tab-item label="Sign-Up">
       
        </b-tab-item>
    </b-tabs>
      </div>
  <!--
  <label class="panel-block">
    <input type="checkbox">
    remember me
  </label>
  <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">
      reset all filters
    </button>
  </div>
  -->
  </nav>  
    </div>  
    <div class="column is-one-third"></div>  
  </div> 
</div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      formError: null,
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.email = "";
        this.password = "";
        this.formError = null;
      } catch (e) {
        debugger
        this.formError = e.message;
        this.$dialog.alert({
                title: 'Error',
                message: '<h1>' + this.formError + '</h1>',
                confirmText: 'ok'
        })
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style scoped>

</style>