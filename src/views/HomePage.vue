<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <h2 class="login-title">Bienvenido al juego Memory cards</h2>
        <form @submit.prevent="login">
          <input v-model="username" maxlength="16" class="login-input" type="text" placeholder="Usuario" />
          <p class="error">{{ messageError }}</p>
          <button type="submit" class="login-button">Entrar</button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';

const router = useRouter();
let username = ref('');
let messageError = ref('');

const login = () => {
  if (validateUsername(username.value)) {
    setUsername(username.value)
    router.push({ path: 'game/' + username.value })
  }
}

const setUsername = async (username: string) => {
  await Preferences.set({
    key: 'username',
    value: username,
  });
};

const validateUsername = (username: string) => {
  if (username.length < 3 || username.length > 16) {
    messageError.value = 'El usuario debe tener una longitud entre 3 y 16';
    return false;
  }
  if (!/^[A-Za-z]+$/.test(username)) {
    messageError.value = 'El usuario solo debe contener letras';
    return false;
  }
  return true;
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.login-title {
  font-size: 28px;
}

.login-input {
  width: 200px;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #666666;
  background-color: #e7f0fe;
  color: #000;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.login-input:focus {
  border-color: #058484;
}

.login-input:last-child {
  margin-bottom: 30px;

}

.login-button {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #058484;
}

.error {
  color: gray;
  font-size: 14px;
}
</style>
