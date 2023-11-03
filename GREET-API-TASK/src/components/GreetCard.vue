<template>
  <div :class="{'show': showBackCard}">
    <div class="card-content" >
      <div class="card-front">
        <div class="card-front-header flex">
          <h3  class="text-center">{{ parseTextToHtml(greetItem.name) }}</h3>
        </div>
        <div class="card-front-img">
          <img 
          :srcset="greetItem.images[0].srcset"
          :sizes="greetItem.images[0].sizes"
          :src="greetItem.images[0].src"
          :alt="greetItem.name" 
          class="img" />
        </div>
        <div class="card-front-content"> 
          <p class="categories text-center"><strong>Категории:</strong>
            <span v-for="category in greetItem.categories" :key="category">{{ category.name }}</span>
          </p>
          <p class="text-center">{{ greetItem.prices.price }} {{ greetItem.prices.currency_symbol }}</p>
        </div> 
      </div>
      <div class="card-back"> 
        <div class="card-back-content">
          <p class="short-descr">
            {{ parseTextToHtml(greetItem.short_description) }}
          </p>
        </div>
      </div>
      <div class="card-footer">
        <base-button 
        #base-button
        class="toggleBtn button" 
        @click="flipCard"  
        :title="showBackCard ? 'Затвори' : 'Виж повече'"
        :name="showBackCard ? 'Затвори' : 'Виж повече'">
        {{ showBackCard ? 'Затвори' : 'Виж повече' }}</base-button>
        <base-button @click="addToCart" class="addCartLink" name="Добави в количката" title="Добави в количката"></base-button>
        <!-- IF DYNAMIC URL -->
        <!-- <base-button @click="addToCart(greetItem.id)" class="addCartLink" name="Добави в количката" title="Добави в количката"></base-button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// FILTERS
import { parseTextToHtml } from '../filters/parseHtmlToText';

// COMPONENTS
import BaseButton from './UI/BaseButton.vue';

const baseUrl = 'https://greet.bg/?add-to-cart=5589';
      // IF DYNAMIC URL
      // baseUrl = 'https://greet.bg/?add-to-cart=';

let showBackCard = ref(false);

const props = defineProps([
  'greetItem'
])

function addToCart(id) {
  window.open(baseUrl, '_blank');

// IF DYNAMIC URL
// window.open(baseUrl + id, '_blank');
}

function flipCard() {
  showBackCard.value = !showBackCard.value
}
</script>

<style scoped lang="scss">
.greet-card {
  background-color: #fff;
  margin: 1.5rem 1rem 3rem;
  padding-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.26);
  flex: 0 0 16%;
  max-width: 90%;
  perspective: 1000px;
  transition: transform 0.8s;
  transform-style: preserve-3d;

    @media screen and (min-width: 992px) and (max-width: 1223px) {
      flex: 0 0 20%;
    }

    @media screen and (min-width: 768px) and (max-width: 992px) {
      flex: 0 0 25%;
    }

    @media screen and (min-width: 500px) and (max-width: 768px) {
      flex: 0 0 40%;
    }

    @media screen and (max-width: 550px) {
      flex: 0 0 60%;
    }

    @media screen and (max-width: 400px) {
      flex: 0 0 90%;
    }

  &.show,
  &.show .card-footer {
    transform: rotateY(180deg);
  }

  &.show .card-footer {
    background: #fff;
  }
 
  .card-content {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;

    .card-front {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .card-front-header {
        justify-content: center;
        min-height: 65px;

        h3 {
          align-self: center;
          padding: .5rem;
        }
      }

      .img {
        display: block;
      }

      .card-front-content {
        padding: 3rem 1rem 4rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background: linear-gradient(to top, 
                        rgba(255, 255, 255, 1) 0, 
                        rgba(255, 255, 255, 0.9) 20%, 
                        rgba(255, 255, 255, 0.8) 40%, 
                        rgba(255, 255, 255, 0.7) 60%, 
                        rgba(255, 255, 255, 0.4) 80%, 
                        rgba(255, 255, 255, 0.2) 90%, 
                        rgba(255, 255, 255, 0) 100%);
        transition: all .5s ease-in-out;

        .categories {
          margin: 1rem auto .5rem;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;

          & strong {
            display: block;
            text-transform: uppercase;
          }

          & span {
            display: inline-block;

            &:not(:first-child) {
              padding-right: .5rem;

            }
            &:not(:last-child):after {
              content: ',';
              display: inline-block;
            }
          }
        }
      }
    }

    .card-back {
      padding: 2rem 1rem 4rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform: rotateY(180deg);
      transition: all .5s ease-in-out;
      overflow: auto; 
    }

    .card-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .addCartLink {
        width: 4rem;
        height: 4rem;
        border: 2px solid $base-color-dark;
        border-radius: 50%;
        background: #fff;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        &:after {
          display: inline-block;
          content: url('../assets/images/cart-dark.svg');
          width: 2rem;
          height: 2rem;
          transition: all .5s ease-in-out;
        }

        &:hover:after {
          animation: .5s shake;
        }
      }
    } 
  }
}
</style>