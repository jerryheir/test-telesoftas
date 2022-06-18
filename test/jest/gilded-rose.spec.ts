import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Sulfuras Test', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });
  it('Aged Brie and Backstage passes', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 30, 14), new Item('Backstage passes', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(15);
    expect(items[0].sellIn).toBe(29);
    expect(items[1].quality).toBe(13);
    expect(items[1].sellIn).toBe(4);
  });
  // Test Requirements
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Coca-cola', 0, 2), new Item('Coca-cola', -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
    expect(items[1].sellIn).toBe(-2);
    expect(items[1].quality).toBe(3);
  });
  it('The Quality of an item is never negative', () => {
    const gildedRose = new GildedRose([new Item('Coca-cola', 1, 1), new Item('Coca-cola', 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });
  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(11);
  });
  it('The Quality of an item is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50), new Item('Backstage passes', 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(50);
    expect(items[1].sellIn).toBe(0);
    expect(items[1].quality).toBe(50);
  });
  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });
  it(`"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert`, () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 0, 40), new Item('Backstage passes', 10, 10), new Item('Backstage passes', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
    expect(items[1].sellIn).toBe(9);
    expect(items[1].quality).toBe(12);
    expect(items[2].sellIn).toBe(4);
    expect(items[2].quality).toBe(11);
  });
});
