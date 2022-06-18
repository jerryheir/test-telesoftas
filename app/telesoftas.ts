import * as fs from 'fs';
import axios from 'axios';

class TeleSoftas {
    instance_amount: number;
    positive_instance: number;
    count: number;

    constructor(instance_amount: number, positive_instance: number) {
        this.instance_amount = instance_amount;
        this.positive_instance = positive_instance;
        this.count = 0;
    }

    execute (): any {
        if (this.instance_amount > 0) {
            this.instance_amount = this.instance_amount - 1;
            const array_of_positive_instance = new Array(this.positive_instance);
            array_of_positive_instance.map(async () => {
                const res = await axios.get("https://yesno.wtf/api");
                if (res.data && res.data.answer && res.data.answer.toLowerCase() === "yes") {
                    fs.writeFile('log.txt', JSON.stringify(res.data), (_error) => {
                        if (_error) throw _error;
                    });
                    this.count++;
                }
            })
        } else {
            return "Completed";
        }
    }
}

export default TeleSoftas;