const useDate = () => {
  const options= {
    hour12: false,
  }
  let today = new Date();
  let fullDate = today.toLocaleString("en-US", options);
  let date = today.toLocaleDateString("en-US", options);
  let time = today.toLocaleTimeString("en-US", options);
  // let options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   hour12: false, // время в AM-PM формате
  //   minute: "numeric",
  // };
  return [fullDate, date, time] as const;
};

export default useDate;
