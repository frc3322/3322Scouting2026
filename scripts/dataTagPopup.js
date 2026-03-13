import initDataTagEncoder, {
    encode_csv_to_image,
} from "./vendor/scouting_data_compression_wasm.js";
import { getScoutingSchemaBytes } from "./data/scoutedMatches.js";

let encoderInitializationPromise;
let popupElements;
let dataTagUrl;
let renderToken = 0;

function initializeEncoder() {
    if (encoderInitializationPromise == null) {
        encoderInitializationPromise = initDataTagEncoder();
    }

    return encoderInitializationPromise;
}

function closeDataTagPopup() {
    if (popupElements == null) {
        return;
    }

    renderToken += 1;
    popupElements.modal.style.display = "none";
    popupElements.status.textContent = "";
    popupElements.image.removeAttribute("src");
    popupElements.image.style.display = "none";

    if (dataTagUrl != null) {
        URL.revokeObjectURL(dataTagUrl);
        dataTagUrl = undefined;
    }
}

function ensurePopup() {
    if (popupElements != null) {
        return popupElements;
    }

    const modal = document.createElement("div");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");
    modal.style.alignItems = "center";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.78)";
    modal.style.display = "none";
    modal.style.inset = "0";
    modal.style.justifyContent = "center";
    modal.style.padding = "12px";
    modal.style.position = "fixed";
    modal.style.zIndex = "1000";

    const panel = document.createElement("div");
    panel.style.backgroundColor = "#101010";
    panel.style.border = "4px solid #e9fbff";
    panel.style.borderRadius = "24px";
    panel.style.boxSizing = "border-box";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.gap = "12px";
    panel.style.height = "calc(100vh - 24px)";
    panel.style.overflow = "hidden";
    panel.style.padding = "24px";
    panel.style.width = "calc(100vw - 24px)";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.style.alignSelf = "flex-end";
    closeButton.style.backgroundColor = "rgb(0, 98, 255)";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "12px";
    closeButton.style.color = "white";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "18px";
    closeButton.style.padding = "12px 18px";
    closeButton.addEventListener("click", closeDataTagPopup);

    const title = document.createElement("h2");
    title.textContent = "Scouted Data Tag";

    const status = document.createElement("p");

    const image = document.createElement("img");
    image.alt = "Encoded scouting data tag";
    image.style.backgroundColor = "white";
    image.style.borderRadius = "16px";
    image.style.display = "none";
    image.style.flex = "1";
    image.style.height = "100%";
    image.style.imageRendering = "pixelated";
    image.style.margin = "0 auto";
    image.style.maxHeight = "100%";
    image.style.maxWidth = "100%";
    image.style.minHeight = "0";
    image.style.objectFit = "contain";

    panel.append(closeButton, title, status, image);
    modal.append(panel);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeDataTagPopup();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display !== "none") {
            closeDataTagPopup();
        }
    });

    document.body.append(modal);

    popupElements = {
        image,
        modal,
        status,
    };

    return popupElements;
}

export async function showDataTagPopup(csvText) {
    const { image, modal, status } = ensurePopup();
    const currentRenderToken = renderToken + 1;

    renderToken = currentRenderToken;
    modal.style.display = "flex";
    status.textContent = "Generating data tag...";
    image.removeAttribute("src");
    image.style.display = "none";

    if (dataTagUrl != null) {
        URL.revokeObjectURL(dataTagUrl);
        dataTagUrl = undefined;
    }

    if (csvText.trim() === "") {
        status.textContent = "No scouted data is available yet.";
        return;
    }

    try {
        await initializeEncoder();

        if (currentRenderToken !== renderToken) {
            return;
        }

        const imageBytes = encode_csv_to_image(
            new TextEncoder().encode(csvText),
            getScoutingSchemaBytes(),
            null,
        );

        if (currentRenderToken !== renderToken) {
            return;
        }

        dataTagUrl = URL.createObjectURL(
            new Blob([imageBytes], { type: "image/png" }),
        );
        image.src = dataTagUrl;
        image.style.display = "block";
        status.textContent = "";
    }
    catch (error) {
        console.error(error);

        if (currentRenderToken !== renderToken) {
            return;
        }

        status.textContent = "Unable to generate the data tag.";
    }
}
