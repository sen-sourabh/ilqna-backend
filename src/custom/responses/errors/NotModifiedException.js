const { HttpException, HttpStatus } = require('@nestjs/common');

class NotModifiedException extends HttpException {
  constructor() {
    super('Not Modified', HttpStatus.NOT_MODIFIED);
  }
}
exports.NotModifiedException = NotModifiedException;
