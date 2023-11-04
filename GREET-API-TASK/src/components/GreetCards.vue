<template>
    <div class="top-container flex">
        <h1>greet api task</h1>
        <div class="greet-cards-filters flex">
            <base-select 
                v-model="filterByCategory" 
                :dataList="categoriesList"
                ariaLabel="Изберете категория"
                :showAll='true'
            ></base-select>

            <base-select 
                v-model="sortBy"
                :data="sortBy"
                :dataList="sortByList"
                ariaLabel="Сортирай"
            ></base-select>
        </div>
    </div>

    <infinite-scroller @infinite="loadMoreData" class="greet-cards">
        <greet-card v-for="greetItem in filteredData" :key="greetItem.id" class="greet-card" :greetItem="greetItem" ></greet-card>
    </infinite-scroller>

    <loading v-if="loading" :class="{'firstLoad': firstLoad}"></loading>

</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';

// COMPONENTS
import GreetCard from './Greetcard.vue';
import BaseSelect from './UI/BaseSelect.vue';
import InfiniteScroller from "./InfiniteScroller.vue";
import Loading from "./Loading.vue";

const apiEndpoint = ref('greet.bg/wp-json/wc/store/products');
let greetListPage = ref(1),
    endGreetListPage = ref(false),
    greetList = reactive([]),
    categoriesList = reactive([]),
    filterByCategory = ref(null),
    sortBy = ref(null),
    sortByList = reactive(['Име', 'Цена']),
    loading = ref(false),
    firstLoad = ref(true);

const filteredData = computed(function() {
    let result;

    if(!filterByCategory.value || filterByCategory.value === null) {
        result = reactive(greetList)
    } else {
        if(filterByCategory.value && filterByCategory.value != null) {
            result = greetList.filter((element) =>
            element.categories.some((el) => el.name === filterByCategory.value))
        }
    }

    if(sortBy.value != null) {
        switch(sortBy.value.toLowerCase()) {
        case 'име':
            result = result.sort(sortDataByName)
            break;
        case 'цена':
            result = result.sort(sortDataByPrice)
            break;
        default:
            // code block
        }
    }
    return result

})

function sortDataByName(item, nextItem) {
    if (item.name.toLowerCase() < nextItem.name.toLowerCase()) {
        return -1;
    }
    if (item.name.toLowerCase() > nextItem.name.toLowerCase()) {
        return 1;
    }
    return 0;
}

function sortDataByPrice(item, nextItem) {
    if (item.prices.price < nextItem.prices.price) {
        return -1;
    }
    if (item.prices.price > nextItem.prices.price) {
        return 1;
    }
    return 0;
}

function loadMoreData() {
    if (!endGreetListPage.value) {
        greetListPage.value++
        fetchData()
    }
}

function fetchData() {
    loading.value=true;
    fetch(`https://${apiEndpoint.value}?page=${greetListPage.value}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        if (data.length === 0) {
            greetListPage.value = 1;
            endGreetListPage.value = true;
        }
        // ADDING DATA TO greetList
        data.forEach(element => {
            const item = {
                'id': element.id,
                'images': element.images,
                'name': element.name,
                'description': element.description,
                'short_description': element.short_description,
                'categories': element.categories,
                'prices': element.prices
            }
            greetList.push(item);

            // RESET LOADING SPINNER
            loading.value=false;
            firstLoad.value=false;

            // ADDING DATA TO SELECT MENU - CATEGORIES
            const category = item.categories;
            category.forEach((item) => {
                const index = categoriesList.indexOf((item.name))
                if (index < 0) {
                    categoriesList.push(item.name)
                }
            })
        });
    })
    .catch((err) => {
        console.log(err)
    })
}

onMounted(() => fetchData());

</script>

<style scoped lang="scss">
.top-container {
    justify-content: space-between;
    padding: 1.8rem;
    background: #fff;

    @media screen and (max-width: 991px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    @media screen and (min-width: 992px) {
        flex-direction: row;
    }

    .greet-cards-filters {
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;

        @media screen and (max-width: 991px) {
            margin-top: 2rem;
        }

        @media screen and (max-width: 500px) {
            flex-direction: column;
        }

        @media screen and (min-width: 500px) {
            flex-direction: row;
        }

        & select {
            border-radius: 20px;
            color: $base-color-dark;
            font-size: 1.3rem;
            padding: 1rem;

            @media screen and (max-width: 500px) {
                margin: 1rem;
            }

            @media screen and (min-width: 500px) {
                &:not(:last-child) {
                    margin-right: 2rem;
                }
            } 
        }
    }
}

.greet-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 1rem;
    margin-top: 2rem;

    @media screen and (max-width: 500px) {
        justify-content: center;
    }
}
</style>