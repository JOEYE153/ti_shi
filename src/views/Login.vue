<template>
  <v-app>
    <body>
      <v-card
        class="main"
        rounded
      >
        <v-row class="main_size">
          <v-col
            cols="12"
            md="4"
            class="form"
          >
            <v-card-text>
              <h3 class="_title">
                题士
              </h3>
              <v-form class="form">
                <v-text-field
                  v-model="email"
                  label="邮箱"
                  name="email"
                  prepend-icon="email"
                  type="text"
                  color="teal accent-3"
                  class="_label"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  label="密码"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  color="teal accent-3"
                  class="_label"
                />
              </v-form>
            </v-card-text>
            <v-btn
              rounded
              class="submit"
              dark
              @click="login"
            >
              登录
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="8"
            class="sub-cont"
          >
            <div class="img" />
          </v-col>
        </v-row>
      </v-card>
    </body>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login () {
        this.$store.dispatch('LOGIN', {
          email: this.email,
          password: this.password,
        }).then((response) => {
          if (response === 'success') {
            this.$router.push('/user/count')
          } else {
            alert(response)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // vue resource test
      // login () {
      //   const url = 'https://buaatishi.com:3000/login/email'
      //   this.$http.post(url, {
      //     email: this.email,
      //     password: this.password,
      //   }).then(({ data }) => {
      //     if (data.code === 1) {
      //       this.$router.push('/user/tipass')
      //     } else {
      //       alert('done')
      //     }
      //   })
      // },
      // login () {
      //   sessionStorage.setItem('role', 'admin')
      //   sessionStorage.setItem('loginStatus', 'success')
      //   this.$router.push('/user/count')
      // },
    },
  }
</script>

<style scoped>
*, *:before, *:after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}

body{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(left, #7579ff, #b224ef);
  font-family: 'Nunito', sans-serif;
}

.main{
  overflow: hidden;
  position: relative;
  width: 960px;
  height: 600px;
  background: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.main_size{
  width: 960px;
  height: 600px;
}

.form{
  position: relative;
  width: 320px;
  height: 100%;
  padding: 60px 30px;
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
}

._title{
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 50px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  color: #7579ff;
}

._label{
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

.submit{
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 120px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  background: -webkit-linear-gradient(left, #7579ff, #b224ef);
}

.submit:hover{
  background: -webkit-linear-gradient(left, #b224ef, #7579ff);
}

.sub-cont{
  overflow: hidden;
  position: absolute;
  left: 320px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 10px;
  background: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
}

.img{
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 0;
  width: 640px;
  height: 100%;
  padding-top: 360px;
}

.img:before{
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 600px;
  height: 100%;
  background-image: url(../assets/login.png);
  background-size: contain;
}

.img:after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

}

</style>
