<template>
    <div class="matrix">
        <div :class="{
            'card': true,
            'loss': props.correct === false && props.selected?.includes(cell),
            'win': props.correct === true && props.selected?.includes(cell),
        }" @click="$emit('select', cell)" v-for="(cell) in props.matrix">
            {{ props.show || props.selected?.includes(cell) ? cell : '?' }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    show: Boolean,
    selected: Array<number>,
    matrix: Array<number>,
    correct: Boolean
});      
</script>

<style scoped>
.matrix {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 100%;
    gap: 10px;
    margin: 0 auto 1em;
}

.card {
    padding: 25px;
    background-color: #004481;
    color: #fff;
    font-size: 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.card.loss {
    background-color: #ff0000;
}

.card.win {
    background-color: #00ff00;
}

@media screen and (max-height: 520px) {
    .matrix {
        display: flex;
        width: 100vw;
        flex-wrap: wrap;
        justify-content: space-evenly;    
    }

    .card {
        padding: 15px;
        min-width: 8%;
    }
}
</style>