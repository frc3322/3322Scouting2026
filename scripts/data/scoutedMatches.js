const ALPHABET_VALUES = Array.from(
    { length: 26 },
    (_, index) => String.fromCharCode(97 + index),
);

export const SCOUTED_MATCHES_STORAGE_KEY = "scoutedMatches";

export const SCOUTING_SCHEMA = [
    { name: "matchNumber", kind: "int", int_max: 255 },
    { name: "teamNumber", kind: "int", int_max: 16383 },
    { name: "scouterFirstInitial", kind: "enum", values: ALPHABET_VALUES },
    { name: "scouterLastInitial", kind: "enum", values: ALPHABET_VALUES },
    { name: "autoScored", kind: "int", int_max: 255 },
    { name: "autoAccuracy", kind: "int", int_max: 255 },
    { name: "autoClimb", kind: "int", int_max: 255 },
    { name: "mobility", kind: "int", int_max: 255 },
    { name: "teleScored", kind: "int", int_max: 255 },
    { name: "telePassed", kind: "int", int_max: 255 },
    { name: "teleAccuracy", kind: "int", int_max: 255 },
    { name: "defAZone", kind: "int", int_max: 255 },
    { name: "defABump", kind: "int", int_max: 255 },
    { name: "defATrench", kind: "int", int_max: 255 },
    { name: "defNZone", kind: "int", int_max: 255 },
    { name: "defOZone", kind: "int", int_max: 255 },
    { name: "defOBump", kind: "int", int_max: 255 },
    { name: "defOTrench", kind: "int", int_max: 255 },
    { name: "fuelStolen", kind: "int", int_max: 255 },
    { name: "defRating", kind: "int", int_max: 5 },
    { name: "endClimb", kind: "int", int_max: 3 },
    { name: "downTime", kind: "int", int_max: 255 },
];

const CSV_COLUMNS = SCOUTING_SCHEMA.map(({ name }) => name);

function parseNonNegativeInteger(value) {
    const parsedValue = Number.parseInt(value, 10);

    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
        return 0;
    }

    return parsedValue;
}

function splitScouterInitials(scouterInitials) {
    const normalizedInitials = String(scouterInitials ?? "")
        .toLowerCase()
        .replace(/[^a-z]/g, "");
    const firstInitial = normalizedInitials.at(0) ?? "a";
    const lastInitial = normalizedInitials.at(-1) ?? firstInitial;

    return {
        scouterFirstInitial: firstInitial,
        scouterLastInitial: lastInitial,
    };
}

function normalizeScoutedMatch(match) {
    const initials = splitScouterInitials(match?.scouterInitials);

    return {
        matchNumber: parseNonNegativeInteger(match?.matchNumber),
        teamNumber: parseNonNegativeInteger(match?.teamNumber),
        scouterFirstInitial: initials.scouterFirstInitial,
        scouterLastInitial: initials.scouterLastInitial,
        autoScored: parseNonNegativeInteger(match?.autoScored),
        autoAccuracy: parseNonNegativeInteger(match?.autoAccuracy),
        autoClimb: parseNonNegativeInteger(match?.autoClimb),
        mobility: parseNonNegativeInteger(match?.mobility),
        teleScored: parseNonNegativeInteger(match?.teleScored),
        telePassed: parseNonNegativeInteger(match?.telePassed),
        teleAccuracy: parseNonNegativeInteger(match?.teleAccuracy),
        defAZone: parseNonNegativeInteger(match?.defAZone),
        defABump: parseNonNegativeInteger(match?.defABump),
        defATrench: parseNonNegativeInteger(match?.defATrench),
        defNZone: parseNonNegativeInteger(match?.defNZone),
        defOZone: parseNonNegativeInteger(match?.defOZone),
        defOBump: parseNonNegativeInteger(match?.defOBump),
        defOTrench: parseNonNegativeInteger(match?.defOTrench),
        fuelStolen: parseNonNegativeInteger(match?.fuelStolen),
        defRating: parseNonNegativeInteger(match?.defRating),
        endClimb: parseNonNegativeInteger(match?.endClimb),
        downTime: parseNonNegativeInteger(match?.downTime),
        scouterInitials: String(match?.scouterInitials ?? "").toLowerCase(),
        comment: String(match?.comment ?? ""),
    };
}

export function getStoredScoutedMatches() {
    const rawMatches = localStorage.getItem(SCOUTED_MATCHES_STORAGE_KEY);

    if (rawMatches == null) {
        return [];
    }

    try {
        const parsedMatches = JSON.parse(rawMatches);

        if (!Array.isArray(parsedMatches)) {
            return [];
        }

        return parsedMatches.map(normalizeScoutedMatch);
    }
    catch {
        return [];
    }
}

export function saveScoutedMatch(dataContainer) {
    const nextMatch = normalizeScoutedMatch(dataContainer);
    const storedMatches = getStoredScoutedMatches();
    const existingMatchIndex = storedMatches.findIndex(
        (match) =>
            match.matchNumber === nextMatch.matchNumber &&
            match.teamNumber === nextMatch.teamNumber,
    );

    if (existingMatchIndex === -1) {
        storedMatches.push(nextMatch);
    }
    else {
        storedMatches[existingMatchIndex] = nextMatch;
    }

    localStorage.setItem(
        SCOUTED_MATCHES_STORAGE_KEY,
        JSON.stringify(storedMatches),
    );
}

export function buildScoutedMatchesCsv(matches = getStoredScoutedMatches()) {
    if (matches.length === 0) {
        return "";
    }

    const headerRow = CSV_COLUMNS.join(",");
    const dataRows = matches
        .map(normalizeScoutedMatch)
        .map((match) => CSV_COLUMNS.map((column) => match[column]).join(","));

    return [headerRow, ...dataRows].join("\n");
}

export function getScoutingSchemaBytes() {
    return new TextEncoder().encode(JSON.stringify(SCOUTING_SCHEMA));
}
