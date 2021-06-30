## Overview

This project was developed with the objective of fulfilling a development challenge.

## How to run

- `npm i` to get the packages
- `npm start` to run the application
- It will open a new tab in browser with the calendar


## The Challenge

Create a demo calendar application using React, Vue or Angular. <br />
It should start by rendering a single month view of a calendar for the current month – along with the lines of the below illustration:

![Illustration](https://github.com/gabrieltobi/jobsity-test/blob/master/illustration.jpg?raw=true)

### Mandatory Features

- Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city. [✔]
- Display reminders on the calendar view in the correct time order. [✔]
- Allow the user to select color when creating a reminder and display it appropriately. [✔]
- Ability to edit reminders – including changing text, city, day, time and color. [✔]
- Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city. [✔]*
- Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city. [✔]

_* In Open Weather Map just today's weather is free, so it was made with today's weather and not the weather on the reminder date._

### Bonus (Optional)

- Expand the calendar to support more than the current month.
- Properly handle overflow when multiple reminders appear on the same date. [✔]
- Functionality to delete one or ALL the reminders for a specific day.

### Considerations

- Redux (or any other state manager) structure of the calendar. *
- The project is totally focused on the front-end; please ignore the back-end.
- Keep your code versioned with Git.
- Feel free to use small helper libraries for:
- UI Elements.
- Date/Time handling.
- You must create the calendar component yourself. Do not use calendar libraries like FullCalendar or Bootstrap Calendar.
- If you use an external API, make sure to provide working API keys.

_* I managed to build the app using local states only, that's why there's no redux on application. But it could be converted to work with redux too._
