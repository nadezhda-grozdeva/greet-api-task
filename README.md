# greet-api-task
[Greet API Task - А simple SPA (single-page application)](https://greet-api-task-8f2d3.web.app/).

## Requirements:
- Consume the following API https://greet.bg/wp-json/wc/store/products?page=1 
- The response from this API should be presented as cards. 
- Every card should contain an image, name, description, category, and ‘Add To Cart’ button.
- The ‘Add To Cart’ button should be a reusable component.
- When you click the button it should lead you to this URL https://greet.bg/?add-to-cart=5589. 
- The pagination should be implemented with infinite scrolling.
- Add a dropdown that filters the results by category. Categories should be dynamically populated, based on the loaded results.
- Add a dropdown for ordering items by name and by price.
- The task should include read me, and example config if needed.


## Instructions:

### install dependencies
$ npm install

### serve with hot reload at localhost:5173
$ npm run dev

### build for production and launch server
$ npm run build
$ npm run preview

