
<template>
  <div class="header-container">   
    <div class="username"><p>{{props.username}}</p></div>  
    <select v-model="level" id="level" @change="$emit('levelChanged', level)" class="level-select">
      <option v-for="eachLevel in levels" :value="eachLevel">
        {{ eachLevel.label  }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

import levels from '@/assets/levels.json';
import { Level } from '@/interfaces/interfaces.ts';

const props = defineProps( {   
  username: String,
  timeLeft: Number,
  initialLevel: Number
});  

let level = levels?.[props.initialLevel || 0];

</script>

<style scoped>

.header-container {
  width: 100%;
  position: absolute;
  background-color: #004481;
  opacity: 0.8;
  color: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}  

.username {
  font-size: 20px; 
}

.level-select {
  padding: 6px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #004481;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}
</style>