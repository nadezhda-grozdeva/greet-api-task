<template>
    <base-button v-if="scrollToTopVisible" @click="scrollToTop" class='scrollToTop' title="Върни се в началото" name="Върни се в началото">
    </base-button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// COMPONENTS
import BaseButton from './UI/BaseButton.vue';

let scrollToTopVisible = ref(false);

function checkScrollToTopVisible() {
    if (window.scrollY > window.innerHeight) {
        scrollToTopVisible.value = true
    } else {
        scrollToTopVisible.value = false
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    window.addEventListener('scroll', checkScrollToTopVisible);
})

</script>

<style scoped lang="scss">
.scrollToTop {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border: 2px solid $base-color-dark;
    background: #fff;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    transition: all .5s ease-in;

    &:after {
        display: inline-block;
        content: url('../assets/images/up-long-solid-dark.svg');
        width: 1.5rem;
        height: 1.5rem;
    }

    &:hover:after {
        animation: puls .5s;
    }
}

</style>