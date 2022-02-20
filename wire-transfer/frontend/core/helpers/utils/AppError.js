class AppError extends Error {
  constructor(err) {
    super(err.response?.data.message || err.message);
    const isClientErr =
      err.response?.status >= 400 && err.response?.status < 500;
   const isUnexpectedErr = !isClientErr;
    if (isUnexpectedErr) {
      this.network = /network/i.test(err.message);
      this.statusCode = 500;
      this.message = this.network
        ? "please check your internet connection"
        : "an unexpected error occurred";
      this.status = "error";
      this.unexpected = true;
      
    }

    // This `error` is caused by the `client` and they should fix it :)
    if (isClientErr) {
      if (err.response.status === 401) {
        location.replace("/auth/signin");
      }

      if (err.response.data.message || err.response.data.err?.message) {
        let message =
          err.response.data.message || err.response.data.err?.message;
        // Checks if `message` is an `Array`
        const isMessageArr = Array.isArray(message);
        // Generate a Random `index` for `message` array
        const getRandIndex = () => Math.floor(Math.random() * message.length);
        // Change `message` to a single string msg is it was an `Array`
        if (isMessageArr) {
          message = message[getRandIndex()];
        }
        this.message = message;
      }
      // This Client Error is coming from an `unidentified server`(a RANDOM backend server)
      else {
        this.message = "Some error occured";
      }

      this.statusCode = err.response.status;
      this.status = "fail";
    }
  }
}

export default AppError;
