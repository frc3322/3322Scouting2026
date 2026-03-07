# Data Tag Developer Guide

This file explains how to write code against the current data-tag system in this repo.

## Purpose

The data-tag flow has 3 parts:

1. Save a completed scouting record
2. Build a CSV string from saved records
3. Pass that CSV string into the popup renderer

The popup renderer itself only takes one argument:

```js
showDataTagPopup(csvText)
```

## Main pieces

- [scripts/data/scoutedMatches.js](/Users/darkeden/3322Scouting2026/scripts/data/scoutedMatches.js): storage, normalization, CSV building, schema bytes
- [scripts/dataTagPopup.js](/Users/darkeden/3322Scouting2026/scripts/dataTagPopup.js): popup creation and image rendering
- [scripts/main.js](/Users/darkeden/3322Scouting2026/scripts/main.js): example UI wiring from a button
- [scripts/match-scouting/endgame.js](/Users/darkeden/3322Scouting2026/scripts/match-scouting/endgame.js): example save point on submit
- [scripts/vendor/scouting_data_compression_wasm.js](/Users/darkeden/3322Scouting2026/scripts/vendor/scouting_data_compression_wasm.js): encoder wrapper
- [scripts/vendor/scouting_data_compression_wasm_bg.wasm](/Users/darkeden/3322Scouting2026/scripts/vendor/scouting_data_compression_wasm_bg.wasm): encoder binary

## Required data shape

`saveScoutedMatch()` accepts a `DataContainer`-like object and normalizes these fields:

```js
{
  matchNumber,
  teamNumber,
  scouterInitials,
  autoScored,
  autoAccuracy,
  autoClimb,
  mobility,
  teleScored,
  telePassed,
  teleAccuracy,
  defAZone,
  defABump,
  defATrench,
  defNZone,
  defOZone,
  defOBump,
  defOTrench,
  defRating,
  endClimb,
  downTime,
  rating,
  comment
}
```

Notes:

- Numeric fields are parsed as non-negative integers.
- `scouterInitials` is converted into first/last initial enum values for the schema.
- `comment` is stored with the record, but it is not part of the exported CSV schema.

## Saving a record

When a scouting record is complete, save it like this:

```js
import { saveScoutedMatch } from "../data/scoutedMatches.js";

document.getElementById("submit").addEventListener("click", () => {
  dataHandler.setScouterInitials(document.getElementById("initials").value.toLowerCase());
  dataHandler.setTeamNumber(document.getElementById("teamNumber").value);
  dataHandler.setMatchNumber(document.getElementById("matchNumber").value);
  dataHandler.setComment(document.getElementById("comments").value);

  saveScoutedMatch(dataContainer);
});
```

Current example: [scripts/match-scouting/endgame.js](/Users/darkeden/3322Scouting2026/scripts/match-scouting/endgame.js)

Behavior:

- Records are stored in browser `localStorage`
- Storage key: `scoutedMatches`
- Records are deduplicated by `matchNumber` + `teamNumber`

## Building the CSV

To get the export string:

```js
import { buildScoutedMatchesCsv } from "./data/scoutedMatches.js";

const csvText = buildScoutedMatchesCsv();
```

Behavior:

- If there are no saved matches, it returns `""`
- Otherwise it returns a header row plus one row per saved record

Example output:

```csv
matchNumber,teamNumber,scouterFirstInitial,scouterLastInitial,autoScored,...
14,3322,d,g,3,2,...
15,67,a,b,1,1,...
```

## Showing the popup

To render the tag popup:

```js
import { showDataTagPopup } from "./dataTagPopup.js";

await showDataTagPopup(csvText);
```

Behavior in [scripts/dataTagPopup.js](/Users/darkeden/3322Scouting2026/scripts/dataTagPopup.js):

- Lazily creates the modal DOM
- Loads the WASM encoder once
- Converts the CSV to a PNG image
- Displays the image in a full-screen popup
- Supports closing with `Escape`
- Supports closing with the `Close` button
- Ignores stale async renders if the popup is reopened quickly

## Typical wiring example

This is the current home-page pattern:

```js
import { buildScoutedMatchesCsv } from "./data/scoutedMatches.js";
import { showDataTagPopup } from "./dataTagPopup.js";

document.getElementById("show-data-tag").addEventListener("click", () => {
  showDataTagPopup(buildScoutedMatchesCsv());
});
```

Current example: [scripts/main.js](/Users/darkeden/3322Scouting2026/scripts/main.js)

## Adding this to another page

If you want another page to trigger the same export flow:

1. Add a button to the page HTML.
2. Import `buildScoutedMatchesCsv`.
3. Import `showDataTagPopup`.
4. Call `showDataTagPopup(buildScoutedMatchesCsv())` in the click handler.

Example:

```js
import { buildScoutedMatchesCsv } from "../data/scoutedMatches.js";
import { showDataTagPopup } from "../dataTagPopup.js";

document.getElementById("open-export").addEventListener("click", () => {
  showDataTagPopup(buildScoutedMatchesCsv());
});
```

## If you already have CSV from somewhere else

You do not need to use local storage or `saveScoutedMatch()` if you already have a valid CSV string.

You can call:

```js
import { showDataTagPopup } from "./dataTagPopup.js";

const csvText = [
  "matchNumber,teamNumber,scouterFirstInitial,scouterLastInitial,autoScored,autoAccuracy,autoClimb,mobility,teleScored,telePassed,teleAccuracy,defAZone,defABump,defATrench,defNZone,defOZone,defOBump,defOTrench,defRating,endClimb,downTime,rating",
  "14,3322,d,g,3,2,0,1,9,4,7,0,1,0,0,2,0,0,4,2,0,5"
].join("\\n");

showDataTagPopup(csvText);
```

The CSV columns must match the schema order in [scripts/data/scoutedMatches.js](/Users/darkeden/3322Scouting2026/scripts/data/scoutedMatches.js).

## Schema rules

The schema is defined in `SCOUTING_SCHEMA`.

If you add, remove, rename, or reorder exported fields:

1. Update `SCOUTING_SCHEMA`
2. Update the saved data population code
3. Make sure `buildScoutedMatchesCsv()` emits matching columns

Do not change just one of those pieces.

## Error and empty-state behavior

`showDataTagPopup(csvText)` currently behaves like this:

- `csvText === ""` or blank: popup opens and shows `No scouted data is available yet.`
- encoder failure: popup opens and shows `Unable to generate the data tag.`
- success: popup shows the generated PNG

## Implementation details worth knowing

- The encoder is initialized once and reused.
- The popup revokes old object URLs when rerendering or closing.
- The modal is built with JS, not static HTML.
- The renderer currently depends on `getScoutingSchemaBytes()` from the storage module.

## Current integration caveat

There is still an older QR/export path elsewhere in the project that does not use this same storage flow. That split makes the codebase harder to follow. If you extend this feature, prefer wiring new code to:

- `saveScoutedMatch()`
- `buildScoutedMatchesCsv()`
- `showDataTagPopup()`

instead of adding another export path.
