<template>
   <select :value="modelValue" @change="emit('update:modelValue', $event.target.value)" :name="ariaLabel" :id="ariaLabel" :aria-label="ariaLabel">
        <option disabled value="">{{ ariaLabel }}</option>
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
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    dataList: Object,
    ariaLabel: String, 
    showAll: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String
    }
});
</script>