module.exports.convertTimeZone = (date, timeZoneString) =>
  new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: timeZoneString,
    }),
  );

module.exports.formatDate = (date) => {
  const dateObject = date.constructor.name !== 'Date' ? new Date(date) : date;
  let dd = dateObject.getDate();
  let mm = dateObject.getMonth() + 1;
  const yyyy = dateObject.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${dd}-${mm}-${yyyy}`;
};
