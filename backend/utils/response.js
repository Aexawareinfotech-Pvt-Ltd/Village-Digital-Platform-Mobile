export const sendSuccess = (res, message = "Success", data = null, statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

export const sendError = (res, message = "Something went wrong", statusCode = 500) =>
  res.status(statusCode).json({ success: false, message });

export const sendPaginated = (res, data, total, page, limit) =>
  res.json({
    success: true, data,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
  });
