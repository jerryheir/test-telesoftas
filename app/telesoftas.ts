import * as fs from 'fs';
import axios from 'axios';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { Item } from './gilded-rose';

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

    async execute (): Promise<any> {
        if (this.instance_amount > 0) {
            const array_of_positive_instance = [...Array(this.positive_instance).keys()];
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
                this.positive_instance = this.count;
                console.log("POSITIVES", this.positive_instance);
                this.count = 0;
                this.execute();
            } else {
                // If there are no more positive responses, then update items
                this.instance_amount = this.instance_amount - 1;
                console.log("NO_POSITIVES", this.instance_amount);
                this.shop_items = [...this.shop_items, new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
                this.count = 0;
                this.execute();
            }
        } else {
            figlet('Completed', (_err, data) => {
                console.log('\n\n');
                console.log(gradient.pastel.multiline(data));
            });
            return { success: "success", shop_items: this.shop_items };
        }
    }
}

export default TeleSoftas;