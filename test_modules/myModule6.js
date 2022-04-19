/***** 分派一個類別(以方法寫成，類似建構子)給exports *****/

module.exports = function(account, password) {
    this.account = account;
    this.password = password;
    this.infomation = function() {
        return ('account: ' + account + '\n' + 'password: ' + password);
    };
}