export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  runQuality(a: Item) {
    if (a.name.includes('Sulfuras') && a.quality !== 80) {
      a.quality === 80; // All Sulfuras;
    }
    if (!a.name.includes('Aged Brie') && !a.name.includes('Backstage passes') && a.quality > -1 && !a.name.includes('Sulfuras')) {
      a.quality = a.quality > 1 ? a.quality - 1 : 0;
    } else {
      if (a.quality < 50) {
        a.quality = a.quality === 50 ? 50 : a.quality + 1; // Guarding for quality of 50;
        if (a.name.includes('Backstage passes')) {
          if (a.sellIn < 11) {
            if (a.quality < 50) {
              a.quality = a.quality === 50 ? 50 : a.quality + 1; // Guarding for quality of 50;
            }
          }
          if (a.sellIn < 6) {
            if (a.quality < 50) {
              a.quality = a.quality === 50 ? 50 : a.quality + 1; // Guarding for quality of 50;
            }
          }
        }
      }
    }
    return a;
  }

  runSellin(a: Item) {
    if (!a.name.includes('Sulfuras')) {
      a.sellIn = a.sellIn - 1; // Updating sellIn value; 
    }
    if (a.sellIn < 0) {
      if (!a.name.includes('Aged Brie')) {
        if (!a.name.includes('Backstage passes')) {
          if (a.quality > 0 && !a.name.includes('Sulfuras')) {
            a.quality = a.quality > 1 ? a.quality - 1 : 0; // Guarding for quality of 0;
          }
        } else {
          a.quality = 0;
        }
      } else {
        if (a.quality < 50) {
          a.quality = a.quality === 50 ? 50 : a.quality + 1; // Guarding for quality of 50;
        }
      }
    }
    return a;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = this.runQuality(this.items[i]);
      this.items[i] = this.runSellin(this.items[i]);
    }
    return this.items;
  }
}
