class UpdationSuccess {
  constructor(message, data) {
    const currentDate = new Date().toISOString();
    this.response = {
      message,
      success: 'Updated',
      statusCode: 201,
      createdDate: currentDate,
      data,
    };
    this.status = 201;
    this.options = {};
    this.message = message;
    this.name = 'UpdationSuccess';
  }
}
exports.UpdationSuccess = UpdationSuccess;
