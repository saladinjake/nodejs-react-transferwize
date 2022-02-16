import Utils from './common';
class ResponseApi {
  constructor() {
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  sendSuccess(res, statusCode, data, message) {
    this.status = statusCode;
    this.data = data;
    this.message = message;
    this.type = 'success';
    return this.send(res);
  }
  sendError(res, statusCode, message) {
    this.status = statusCode;
    this.message = message;
    this.type = 'error';
    return this.send(res);
  }
  send(res) {
    const filteredResponse =Utils.removeNullValues(
    {
      status: this.status,
      message: this.message,
      data: this.data,
    }
    );
    if (this.type === 'success') {
      return res.status(this.status).json(filteredResponse);
    }
    return res.status(this.status).json({
      status: this.status,
      error: this.message,
    });
  }
}

export default ResponseApi;
