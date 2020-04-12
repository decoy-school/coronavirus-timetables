import { writable, derived } from "svelte/store";

export const User = writable(null);
export const IsInvalidUser = writable(false);
export const Docs = writable([]);
export const Mode = writable("kw");

export const ParsedDays = derived(Docs, ($Docs) => {
  // DATA CLEANING AND PARSING
  let parsedDays = {};

  // filter out rows that aren't children's resposonses
  const filtered = $Docs.filter((doc) => doc.hasOwnProperty("first-name"));
  filtered.forEach((doc) => {
    // format name and year group
    const yearRegex = /^year/;
    doc["year-group"] = doc["year-group"].replace(yearRegex, "");
    let name = `${doc["first-name"]} ${doc.surname} (${doc["year-group"]})`;

    // get the dates requested in that doc
    const dateRegex = /^2020/;
    const keys = Object.keys(doc);
    const requestedDates = keys.filter((key) => key.match(dateRegex));

    // for each date requested, add the date to the parsedDays array
    requestedDates.forEach((day) => {
      // for this day, pull out the AM, PM, etc choice
      let choices = doc[day].split(",").map((s) => s.trim(s));

      let blankDay = {
        "Breakfast Club": {
          names: [],
          Nursery: 0,
          Reception: 0,
          "Year 1": 0,
          "Year 2": 0,
          "Year 3": 0,
          "Year 4": 0,
          "Year 5": 0,
          "Year 6": 0,
        },
        AM: {
          names: [],
          Nursery: 0,
          Reception: 0,
          "Year 1": 0,
          "Year 2": 0,
          "Year 3": 0,
          "Year 4": 0,
          "Year 5": 0,
          "Year 6": 0,
        },
        PM: {
          names: [],
          Nursery: 0,
          Reception: 0,
          "Year 1": 0,
          "Year 2": 0,
          "Year 3": 0,
          "Year 4": 0,
          "Year 5": 0,
          "Year 6": 0,
        },
        "After School Club": {
          names: [],
          Nursery: 0,
          Reception: 0,
          "Year 1": 0,
          "Year 2": 0,
          "Year 3": 0,
          "Year 4": 0,
          "Year 5": 0,
          "Year 6": 0,
        },
        "school-meals": 0,
      };
      // add the child's name to the AM, PM etc keys for this day
      // and increment the year group totals
      choices.forEach((choice) => {
        // if this day already exists in the data structure
        if (parsedDays.hasOwnProperty(day)) {
          parsedDays[day][choice].names = [
            ...parsedDays[day][choice].names,
            name,
          ];
        } else {
          // if this day doesn't exist yet
          parsedDays[day] = blankDay;
          parsedDays[day][choice].names = [name];
        }
        // increment year group total
        parsedDays[day][choice][doc["year-group"]] =
          parsedDays[day][choice][doc["year-group"]] + 1;
      });
      // increment school meals
      if (doc["school-meal"] != "No") {
        parsedDays[day]["school-meals"] = parsedDays[day]["school-meals"] + 1;
      }
    });
  });
  return parsedDays;
});

export const Dates = derived(
  ParsedDays,
  ($ParsedDays) => Object.keys($ParsedDays).sort() || null
);
