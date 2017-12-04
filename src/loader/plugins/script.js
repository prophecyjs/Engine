var script = {
    getInfo: function () {
        return {
            callback: this.handler,
            types: ["image"],
        }
    },
    handler: function (data) {
        console.log('halder');
       // console.log(data);
    }
}
module.exports = script;