const paginate = (query, { page = 1, limit = 10 }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
  
    const skip = (page - 1) * limit;
    return { skip, limit };
  };
  
  module.exports = paginate;
  