class CreationSuccess {
  constructor(message, data) {
    const currentDate = new Date().toISOString();
    this.response = {
      message,
      success: 'Created',
      statusCode: 201,
      createdDate: currentDate,
      data,
    };
    this.status = 201;
    this.options = {};
    this.message = message;
    this.name = 'CreationSuccess';
  }
}
exports.CreationSuccess = CreationSuccess;
