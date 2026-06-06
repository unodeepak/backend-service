exports.return200 = (msg = "", data = null) => ({
  status: 200,
  success: true,
  msg: msg,
  data: data,
});

exports.return400 = (msg = "", data = null) => ({
  status: 400,
  success: false,
  data: data,
  msg: msg,
});

exports.return500 = (msg = "", data = null) => ({
  status: 500,
  success: false,
  msg: msg,
  data: data,
});

exports.return401 = (msg = "", data = null) => ({
  status: 401,
  msg: msg,
  data: data,
  success: false,
});
