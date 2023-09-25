const getDate = () => {
  const options= {
    hour12: false,
  }
  let today = new Date();
  let fullDate = today.toLocaleString("en-US", options);
  let currentDate = today.toLocaleDateString("en-US", options);
  let time = today.toLocaleTimeString("en-US", options);
  return {fullDate, currentDate, time} as const;
};

export default getDate;
