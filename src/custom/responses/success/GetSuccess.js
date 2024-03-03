class GetSuccess {
  constructor(message, data, query = {}) {
    const currentDate = new Date().toISOString();
    this.response = {
      message,
      success: 'Member',
      statusCode: 200,
      createdDate: currentDate,
      data,
    };
    this.status = 200;
    this.options = {
      query,
    };
    this.message = message;
    this.name = 'GetSuccess';
  }
}
exports.GetSuccess = GetSuccess;
