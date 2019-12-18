const messageFormat = () => {
  let mformat = {
    isError: true,
    message: "Error occured!",
    data: null
  };

  return { ...mformat };
};

module.exports = messageFormat;
