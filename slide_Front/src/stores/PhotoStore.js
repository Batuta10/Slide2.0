import { observable, action } from 'mobx';
import superagent from 'superagent';

class PhotoStore {
    @observable img = [];

    @action
    getPhoto() {
        return new Promise((resolve, reject) => {
            superagent.get('http://10.17.2.16:3002/listFoto').end((err, res) => {
                if (err) reject(err);
                this.img = JSON.parse(res.text);
                resolve(this.img);
            });
        });
    }
}

export default new PhotoStore();
