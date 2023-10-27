<template>
    <div ref="scroller" class="scroller">
        <slot></slot>
        <div ref="endOfScroller"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['infinite'])

    let scroller = ref(null);
    let endOfScroller = ref(null);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting) {
                emit('infinite');
            }
        },
    );

    onMounted(() => {
        observer.observe(endOfScroller.value);
    })
</script>

<style scoped lang="scss">
.scroller {
    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>