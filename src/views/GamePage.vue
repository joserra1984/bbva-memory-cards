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
        <h2 class="number-of-questions" v-if="timeLeft > 0">Complejidad:
          <select v-model="numbersToAsk" @change="calculateAskNumbers" id="numbersToAsk" class="numbersToAsk-select">
            <option v-for="eachLevel in [1,3]" :value="eachLevel">
              {{ eachLevel  }}
            </option>
          </select>
        </h2>
        <div class="game-content">
          <h3  v-if="timeLeft > 0">{{ timeLeft > 0 ? 'Memorice las posiciones' : '¿Donde está el ' + askNumbers + '?' }}</h3>
          <h3 v-else>{{'¿Donde está el ' +  askNumbers + '?'}}</h3>        
          <matrix :show="timeLeft > 0" :selected="userSelection" :matrix="matrixValues"
            :correct="userSelection.every((sel)=>askNumbers.includes(sel))" @select="handleSelection" />
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
let userSelection = ref([] as number[]);
let selectedLevel: Level = levels[0];
let death = ref(false);
let username = ref('');
let numbersToAsk = 1;

const generateRandomArray = (length:number) => {
  let resultArray: Array<number> = []
  while (resultArray.length < length) {
    const number = generateRandomNumber();
    if (!resultArray.includes(number)) {
      resultArray.push(number);
    }
  }
  return resultArray;
}
let askNumbers = ref(generateRandomArray(numbersToAsk));

const calculateAskNumbers = () => {
  askNumbers.value = generateRandomArray(numbersToAsk);
}

let matrixValues: number[] = generateRandomArray(9);

const restart = (addPoints: number = 0) => {
  death.value = false;
  timeLeft.value = selectedLevel.time;
  userSelection.value = [];
  calculateAskNumbers();
  matrixValues = generateRandomArray(9);
  points.value = addPoints > 0 ? points.value + addPoints : 0;
}

const handleSelection = (cell:number) => {
  if (!death.value && timeLeft.value === 0 && userSelection.value.length < numbersToAsk) {
    userSelection.value.push(cell);
    if (askNumbers.value.includes(cell)) {
      if(userSelection.value.length == numbersToAsk){
        setTimeout(() => {
        restart(selectedLevel.points);
      }, 1000);
      }
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

setTimeout(() => {
  checkName();  
}, 1000);

generateRandomArray(9);
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

@media screen and (max-height: 320px) {
  #container {
    top: 50px;
    transform: none;
  }
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

select {
  padding: 6px;
  border: none;
  background-color: #fff;
  color: #004481;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}
.number-of-questions {
  position: absolute;
  bottom: -50px;
  line-height: 20px;;
}
</style>