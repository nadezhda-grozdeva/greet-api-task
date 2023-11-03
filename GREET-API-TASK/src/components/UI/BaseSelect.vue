<template>
   <select v-model="selectedValue" name="data" id="data" aria-label="ariaLabel">
        <option disabled value="null">{{ ariaLabel }}</option>
        <option v-if="showAll" value="">Покажи всички</option>
        <option
            v-for="item in dataList"
            :key="item"
            :value="item"
            :selected="item"
            >
            {{ item }}
        </option>
    </select>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps([
    'data', 
    'dataList',
    'ariaLabel', 
    'showAll'
]);

let selectedValue = ref(null);

</script>