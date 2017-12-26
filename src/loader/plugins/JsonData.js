var json_data = {
  getInfo: function () {
    return {
      callback: this.handler,
      types: ['json_data']
    }
  },
  handler: function (response) {
    return response;
  }
}
module.exports = json_data
