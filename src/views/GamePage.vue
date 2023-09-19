<template>
  <ion-page>
    <ion-header :translucent="true">
      <HeaderComponent :username="username" @levelChanged="onLevelChanged" />
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="additional-info">
        <h3>Tiempo: {{ timeLeft }}</h3>
        <h3>Puntos: {{ points }}</h3>
      </div>
      <div id="container">
        <div class="game-content">
          <h3>{{ timeLeft > 0 ? 'Memorice las posiciones' : '¿Donde está el ' + askNumber + '?' }}</h3>
          <matrix :show="timeLeft > 0" :selected="userSelection" :matrix="matrixValues"
            :correct="userSelection === askNumber" @select="handleSelection" />
          <button @click="restart()" class="play-button">Reiniciar</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonHeader } from '@ionic/vue';
import { ref } from "vue";
import Matrix from "@/components/MatrixComponent.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';
import levels from '@/assets/levels.json';
import { Level } from '@/interfaces/interfaces.ts';


const router = useRouter();
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
}

let timeLeft = ref(levels[0].time);
let points = ref(0);
let askNumber = ref(generateRandomNumber());
let userSelection = ref(-1);
let selectedLevel: Level = levels[0];
let death = ref(false);
let username = ref('');

const refreshRandomArray = () => {
  let resultArray: Array<number> = []
  while (resultArray.length < 9) {
    const number = generateRandomNumber();
    if (!resultArray.includes(number)) {
      resultArray.push(number);
    }
  }
  return resultArray;
}
let matrixValues: number[] = refreshRandomArray();

const restart = (addPoints: number = 0) => {
  death.value = false;
  timeLeft.value = selectedLevel.time;
  userSelection.value = -1;
  askNumber.value = generateRandomNumber();
  matrixValues = refreshRandomArray();
  points.value = addPoints > 0 ? points.value + addPoints : 0;
}

const handleSelection = (cell: number) => {
  if (!death.value && timeLeft.value === 0) {
    userSelection.value = cell;
    if (askNumber.value === userSelection.value) {
      setTimeout(() => {
        restart(selectedLevel.points);
      }, 2000);
    } else {
      death.value = true;
      navigator?.vibrate?.(500);
    }
  }
}

const onLevelChanged = (selectedEvent: Level) => {
  selectedLevel = selectedEvent;
  if (timeLeft.value > selectedLevel.time) {
    timeLeft.value = selectedLevel.time;
  }
}

const checkName = async () => {
  const userUrl = window.location.href.split("/").pop();
  const { value: userLogged } = await Preferences.get({ key: 'username' });
  if (userUrl !== userLogged) {
    router?.push({ name: 'Home' });
  } else {
    username.value = userLogged || '';
  }
}

checkName();
refreshRandomArray();

setInterval(() => {
  if (timeLeft.value > 0) {
    timeLeft.value--;
  }
}, 1000);

</script>
    
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-content {
  min-width: 250px;
}

.play-button {
  width: 100%;
  max-width: 250px;
  padding: 12px;
  background-color: #004481;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.additional-info {
  display: flex;
  justify-content: space-around;
  bottom: 0;
  position: absolute;
  width: 100%;
}
</style>