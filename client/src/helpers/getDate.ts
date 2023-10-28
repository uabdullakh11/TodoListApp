const getDate = () => {
  const options= {
    hour12: false,
  }
  let today = new Date();
  let fullDate = today.toLocaleString("en-US", options);
  let currentDate = today.toLocaleDateString("en-US", options);

  let yesterday = Math.floor(new Date().getTime() / 1000) - 86400;
  let yesterdayTime = new Date(yesterday*1000).toLocaleDateString("en-US", options);;

  return {fullDate, currentDate, yesterdayTime} as const;
};

export default getDate;
