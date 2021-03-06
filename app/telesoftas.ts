import * as fs from 'fs';
import axios from 'axios';
import { Item } from './gilded-rose.js';

class TeleSoftas {
    instance_amount: number;
    positive_instance: number;
    count: number;
    shop_items: Item[];

    constructor(instance_amount: number, positive_instance: number) {
        this.instance_amount = instance_amount;
        this.positive_instance = positive_instance;
        this.count = 0;
        this.shop_items = [];
    }

    // A recursive function that will keep iterating till this.instance_amount is 0 (Zero)
    async execute (): Promise<{ status: string; shop_items: Array<Item> }> {
        if (this.instance_amount > 0) {
            const array_of_positive_instance = [...Array(this.positive_instance).keys()];
            // Using promise.all to ensure the promises are resolved asynchronously.
            const array = await Promise.all(array_of_positive_instance.map(async () => {
                const res = await axios.get("https://yesno.wtf/api");
                if (res.data && res.data.answer && res.data.answer.toLowerCase() === "yes") {
                    fs.appendFile('log.txt', `${JSON.stringify(res.data)}\n\n`, (_error) => {
                        if (_error) throw _error;
                    });
                    this.count = this.count + 1;
                }
                return res.data;
            }));

            if (array && this.count > 0) {
                // When you still have positives
                this.positive_instance = this.count;
                // Resetting count and Using simple recursion to recall the function
                // this.count = 0;
                // await this.execute();
            } else {
                // If there are no more positive responses, then update items
                this.instance_amount = this.instance_amount - 1;
                // Simulating adding of dummy items into an existing items list
                this.shop_items = [...this.shop_items, new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
                // this.count = 0;
                // Resetting count and Using simple recursion to recall the function
                // await this.execute();
            }
            this.count = 0;
            await this.execute();
        }
        return { status: "success", shop_items: this.shop_items };
    }
}

export default TeleSoftas;