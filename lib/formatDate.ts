export const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  
    // Get the day of the month
    const dayOfMonth = date.getDate();
    // Add the ordinal indicator based on the day of the month
    const ordinalIndicator =
      dayOfMonth % 10 === 1 && dayOfMonth !== 11
        ? "st"
        : dayOfMonth % 10 === 2 && dayOfMonth !== 12
        ? "nd"
        : dayOfMonth % 10 === 3 && dayOfMonth !== 13
        ? "rd"
        : "th";
  
    // Remove the ordinal indicator from the formatted date
    const formattedWithOrdinal = formattedDate.replace(
      / at /,
      " "
    ).replace(
      /\b(\d{1,2})\b/,
      `$1${ordinalIndicator}`
    );
  //   console.log(/\b(\d{1,2})\b/g,
  //   `$1${ordinalIndicator}`)
    return formattedWithOrdinal;
  };
  