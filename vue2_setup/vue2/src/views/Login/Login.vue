<template >
  <div class="login-wrapper">
    <div class="login-content">
      <h4>Login Page</h4>
      <v-text-field
        label="UserName"
        @change="onFormDataChange($event, 'username')"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        @change="onFormDataChange($event, 'password')"
      ></v-text-field>
      <v-btn
        elevation="2"
        color="primary"
        large
        @click="onHandleSubmitLogin($event)"
        >LOGIN</v-btn
      >
    </div>
  </div>
</template>
<script>
import { AuthAction } from "../../vuex/actions";
import { TokenManager } from "../../tokenManager/token";
export default {
  data() {
    return {
      formDataInput: {},
      loginStatus: this.takeStatusLogin,
    };
  },
  computed: {
    takeStatusLogin() {
      return this.$store.state.AuthMutation.statusLogin;
    },
  },
  beforeCreate() {
    var token = TokenManager.getToken();
    if (token) {
      this.$router.push({ path: "/" });
    }
  },

  watch: {
    takeStatusLogin(statusLogin) {
      switch (statusLogin) {
        case true: {
          console.log("TRUE CALL ");
          this.$swal({
            title: "Login Success",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push({ path: "/" });
          });
          break;
        }
        case false: {
          console.log("FALSE CALL ");

          this.$swal({
            title: "Login Fail Please Check !!!",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          break;
        }
        default: {
          return null;
        }
      }
    },
  },
  created() {},
  // mounted() {},

  methods: {
    onFormDataChange(event, key) {
      this.formDataInput = {
        ...this.formDataInput,
        [key]: event,
      };
      console.log("THIS FORMDATA CHANGE", this.formDataInput);
    },
    onHandleSubmitLogin(event) {
      event.preventDefault();
      // this.$store.dispatch(AuthAction.login())
      if (!this.formDataInput.username) {
        window.alert("PLEASE FILL USERNAME");
      }
      if (!this.formDataInput.password) {
        window.alert("PLEASE FILL PASSWORD");
      } else {
        console.log("LOGIN !!!");
        // this.$store.dispatch(AuthAction.login(this.formDataInput));
        this.$store.dispatch(AuthAction.login(this.formDataInput));
      }
    },
  },
};
</script>
<style src = "./Login.css"></style>
