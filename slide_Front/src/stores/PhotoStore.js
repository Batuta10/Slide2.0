import { observable } from 'mobx';

class PhotoStore {
    @observable img = [];
}

export default new PhotoStore();
