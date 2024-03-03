class ListSuccess {
  constructor(message = '', data = [], query = {}, limit = 25, page = 0, totalCount = 0) {
    const currentDate = new Date().toISOString();
    this.response = {
      message,
      success: 'Collection',
      statusCode: 200,
      createdDate: currentDate,
      data,
    };
    this.status = 200;
    this.options = {
      totalCount: totalCount <= 25 ? data?.length : totalCount,
      query,
      limit,
      page,
    };
    this.message = message;
    this.name = 'ListSuccess';
  }
}
exports.ListSuccess = ListSuccess;
