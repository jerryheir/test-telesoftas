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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name.includes('Sulfuras') && this.items[i].quality !== 80) {
        this.items[i].quality === 80;
      }
      if (!this.items[i].name.includes('Aged Brie') && !this.items[i].name.includes('Backstage passes') && this.items[i].quality > -1 && !this.items[i].name.includes('Sulfuras')) {
        this.items[i].quality = this.items[i].quality > 1 ? this.items[i].quality - 1 : 0;
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality === 50 ? 50 : this.items[i].quality + 1
          if (this.items[i].name.includes('Backstage passes')) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality === 50 ? 50 : this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality === 50 ? 50 : this.items[i].quality + 1
              }
            }
          }
        }
      }

      if (!this.items[i].name.includes('Sulfuras')) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (!this.items[i].name.includes('Aged Brie')) {
          if (!this.items[i].name.includes('Backstage passes')) {
            if (this.items[i].quality > 0 && !this.items[i].name.includes('Sulfuras')) {
              this.items[i].quality = this.items[i].quality > 1 ? this.items[i].quality - 1 : 0;
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality === 50 ? 50 : this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
