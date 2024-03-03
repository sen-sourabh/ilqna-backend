class UpdationSuccess {
  constructor(message, data) {
    const currentDate = new Date().toISOString();
    this.response = {
      message,
      status: 'Updated',
      statusCode: 200,
      createdDate: currentDate,
      data,
    };
    this.status = 200;
    this.options = {};
    this.message = message;
    this.name = 'UpdationSuccess';
  }
}
exports.UpdationSuccess = UpdationSuccess;
