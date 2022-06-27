import { expect } from 'chai';
import { Item, GildedRose } from '../../app/gilded-rose';
import TeleSoftas from '../../app/telesoftas';

describe('Gilded Rose', () => {
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Coca-cola', 0, 2), new Item('Coca-cola', -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
    expect(items[1].sellIn).to.equal(-2);
    expect(items[1].quality).to.equal(3);
  });
  it('The Quality of an item is never negative', () => {
    const gildedRose = new GildedRose([new Item('Coca-cola', 1, 1), new Item('Coca-cola', 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });
  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(11);
  });
  it('The Quality of an item is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50), new Item('Backstage passes', 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(50);
    expect(items[1].sellIn).to.equal(0);
    expect(items[1].quality).to.equal(50);
  });
  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });
  it(`"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  Quality drops to 0 after the concert`, () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 0, 40), new Item('Backstage passes', 10, 10), new Item('Backstage passes', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
    expect(items[1].sellIn).to.equal(9);
    expect(items[1].quality).to.equal(12);
    expect(items[2].sellIn).to.equal(4);
    expect(items[2].quality).to.equal(11);
  });
});

describe('Telesoftas Functionality Test', () => {
  it('Functionality', () => {
    const telesoftas = new TeleSoftas(2, 3);
    telesoftas.execute().then((result) => {
      expect(result.status).to.equal("success");
      expect(result.shop_items.length).to.equal(2);
    });
  });
});