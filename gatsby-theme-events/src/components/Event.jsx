import React from "react";

const getDate = (date, { day = true, month = true, year = true } = {}) =>
  date.toLocaleDateString('en-US', {
    day: day ? 'numeric' : undefined,
    month: month ? 'long' : undefined,
    year: year ? 'numeric' : undefined
  });

const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const isOneDay = start.toDateString() === end.toDateString();

  // June 21-23 2020 || June 21-July 2 2020 || June 2 2020
  return (
    <>
      <time dateTime={start.toISOString()}>
        {getDate(start, { year: isOneDay })}
      </time>
      {!isOneDay && (
        <>
          –
          <time dateTime={end.toISOString()}>
            {getDate(end, { month: start.getMonth() !== end.getMonth() })}
          </time>
        </>
      )}
    </>
  );
};

const Event = ({ name, location, url, startDate, endDate }) => {
  return (
    <div>
      <h1>
        {name} ({location})
      </h1>
      <p>
        <EventDate startDate={startDate} endDate={endDate} />
      </p>
      <p>
        Website: <a href={url}>{url}</a>
      </p>
    </div>
  );
};

export default Event;
