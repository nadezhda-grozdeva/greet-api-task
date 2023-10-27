<template>
    <button name="button" title="button">
        <slot name="base-button"></slot>
    </button>
</template>

<style scoped lang="scss">
.button {
    display: block;
    width: 200px;
    max-width: 90%;
    border: 2px solid $base-color-dark;
    border-radius: 1rem;
    background: $base-color-dark;
    color: #fff;
    padding: .5rem;
    margin: 1rem auto;
    text-transform: uppercase;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    transition: all .2s ease-in;

    &:hover,
    &:active {
        cursor: pointer;
        background: #fff;
        color: $base-color-dark;
    }
}

</style>