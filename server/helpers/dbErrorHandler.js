const getUniqueErrorMessage = (err) => {
  let output;
  try {
    const fieldName = err.message.substring(
      err.message.lastIndexOf('.$') + 2,
      err.message.lastIndexOf('_1'),
    );
    output = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`;
  } catch (ex) {
    output = 'Unique field already exists';
  }
  return output;
};

const getErrorMessage = (err) => {
  let message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Server side error';
    }
  } else {
    err.errors.forEach((error) => {
      console.log(error);
    });
  }
  return message;
};

export default getErrorMessage;
