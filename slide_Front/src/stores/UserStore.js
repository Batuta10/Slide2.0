import { observable } from 'mobx';

class UserStore {
    @observable
    user = [
        { userName: 'Batuta', userid: 1, idImgs: [ 'CwbNrm', 'YKhsMs', 'OTRk9L' ] },
        { userName: 'Rafael', userid: 2, idImgs: [ 'LnLbLE', 'XLcbLe' ] }
    ];

    getUserId(id) {
        return this.user.filter((x) => x.userid === parseInt(id, 10));
    }
}

export default new UserStore();
