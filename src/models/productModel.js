
export class Rating {
    constructor(rate, count) {
      this.rate = rate;
      this.count = count;
    }
  }
  
  export class Product {
    constructor(id, title, price, description, category, image, rating) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.category = category;
      this.image = image;
      this.rating = new Rating(rating.rate, rating.count); 
    }
  }
  