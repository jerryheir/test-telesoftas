import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Sulfuras Test', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });
});
