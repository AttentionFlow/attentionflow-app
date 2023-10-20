export const extractDomain = (url: string): string => {
  const domain = url.match(
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/im
  );
  return domain ? domain[1] : "";
};

export const convertTimestampToDate = (timestamp: number): string => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(timestamp * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();

  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  // const seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  const formattedTime = hours + "h" + minutes.substr(-2) + "min";

  // console.log({ formattedTime });
  return formattedTime;
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${hours ? hours + "h" : ""}${minutes ? minutes + "min" : ""}${
    seconds + "s"
  }`;
};
