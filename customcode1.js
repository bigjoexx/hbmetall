 Webflow.push(function () {
  function getQueryParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Object.fromEntries(urlParams.entries());
  }

  function setCustomCheckboxValue(name, value) {
  const inputElement = document.querySelector(`#${name}`);
  const customCheckboxDiv = document.querySelector(`[data-name="${name}"]`).parentNode.querySelector(".w-checkbox-input");

  console.log(`Setting custom checkbox value for ${name} to ${value}`);

  // Trigger click event to show or hide the hidden sections
    customCheckboxDiv.dispatchEvent(new Event('click', { bubbles: true }));

  if (inputElement && customCheckboxDiv) {
    const shouldBeChecked = value.toLowerCase() === 'true' || value === '1' || value === 1 || value.toLowerCase() === 'on';

    if (shouldBeChecked) {
      inputElement.checked = true;
      customCheckboxDiv.classList.add('w--redirected-checked');
      customCheckboxDiv.setAttribute('aria-checked', 'true');
    } else {
      inputElement.checked = false;
      customCheckboxDiv.classList.remove('w--redirected-checked');
      customCheckboxDiv.setAttribute('aria-checked', 'false');
    }

    // Add touch event listener to customCheckboxDiv
    customCheckboxDiv.addEventListener('touchstart', function (event) {
      event.preventDefault();
      customCheckboxDiv.click();
    });

    // Force a reflow on the customCheckboxDiv
    customCheckboxDiv.offsetHeight;

  } else {
    console.log(`Could not find inputElement or customCheckboxDiv for ${name}`);
  }
}
  
  function setFormFieldValue(selector, value) {
  const field = document.querySelector(selector);

  if (field) {
    if (field.tagName === 'INPUT' && (field.type === 'text' || field.type === 'number' || field.type === 'hidden')) {
      field.value = value;
    } else if (field.tagName === 'SELECT') {
      field.value = value;
    } else if (field.tagName === 'INPUT' && field.type === 'checkbox') {
      field.checked = value.toLowerCase() === 'true' || value === '1' || value === 1;
    } else if (field.tagName === 'TEXTAREA') {
      field.value = value;
    } else if (field.tagName === 'INPUT' && field.type === 'file') {
      console.warn(`The input field with type "file" and name "${selector}" cannot be pre-filled due to browser security restrictions.`);
    }
  }
}

function displayUploadedFileName(imageUrls) {
  const fileList = document.querySelector('.file-list');
  const imageUrlArray = imageUrls.split(';');
  const uniqueImageUrls = Array.from(new Set(imageUrlArray));

  uniqueImageUrls.forEach((imageUrl) => {
    if (!imageUrl || !imageUrl.startsWith('http')) {
      return;
    }

    const regex = /\/([a-zA-Z0-9_-]+)\.\w+$/;
    const match = imageUrl.match(regex);

    if (match && match[1]) {
      const fileName = match[1];

      // Check if the file name already exists in the file list
      const existingFileNameElement = fileList.querySelector(`.file-name span[data-filename="${fileName}"]`);
      if (existingFileNameElement) {
        console.log(`File name "${fileName}" already exists in the file list, skipping.`);
        return;
      }

      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');

      const fileNameContainer = document.createElement('div');
      fileNameContainer.classList.add('file-name');
      fileItem.appendChild(fileNameContainer);

      const fileNameElement = document.createElement('span');
      fileNameElement.setAttribute('data-filename', fileName);
      fileNameElement.textContent = fileName;
      fileNameContainer.appendChild(fileNameElement);

      const removeFileButton = document.createElement('button');
      removeFileButton.classList.add('remove-file');
      removeFileButton.textContent = 'X';
      fileNameContainer.appendChild(removeFileButton);

      fileList.appendChild(fileItem);

      removeFileButton.addEventListener('click', function () {
        fileItem.remove();
        const uploadedImagesField = document.querySelector('input[name="uploaded_images"]');
        const currentImageUrls = uploadedImagesField.value.split(';');
        const updatedImageUrls = currentImageUrls.filter((url) => url !== imageUrl);
        uploadedImagesField.value = updatedImageUrls.join(';');
      });
    }
  });
}

  function autoFillForm(data) {
  console.log('Running autoFillForm with data:', data);
  Object.entries(data).forEach(([key, value]) => {
if (key === "kopfplatte-checkbox" || key === "fusplatte-checkbox" || key === "vorgrundierung-rot-checkbox" || key === "vorgrundierung-grau-checkbox" || key === "feuerverzinkung-checkbox") {
  setCustomCheckboxValue(key, value);
} else {
      const selector = `input[name="${key}"], select[name="${key}"], textarea[name="${key}"]`;
      setFormFieldValue(selector, value);
    }

    if (key === 'uploaded_images') {
      displayUploadedFileName(value);
    }
  });
}

  function initAutoFill() {
  console.log('Running initAutoFill');
  const queryParams = getQueryParameters();
  console.log('Query params:', queryParams);
  if (queryParams.optionen) {
    const optionenData = decodeURIComponent(queryParams.optionen).replace(/:\s/g, ':');
    const optionenPairs = optionenData.split(', ');
    const optionenObj = {};

    optionenPairs.forEach((pair) => {
      const index = pair.indexOf(':');
      const key = pair.substring(0, index).trim();
      const value = pair.substring(index + 1).trim();
      optionenObj[key] = value;
    });

    console.log('optionenObj:', optionenObj);

    setTimeout(() => {
      autoFillForm(optionenObj);
    }, 1); // Adjust the delay as needed (currently set to 1000 milliseconds)
  }
}
  
 function setDefaultValues() {
  const queryParams = getQueryParameters();

  if (!queryParams.optionen) {
    const laengeInput = document.getElementById("laenge");
    if (laengeInput && !queryParams["laenge"]) {
      laengeInput.value = 1000;
    }

    const traegerMengeInput = document.getElementById("traeger-menge");
    if (traegerMengeInput && !queryParams["traeger-menge"]) {
      traegerMengeInput.value = 1;
    }
  }
}
function init() {
  setDefaultValues();
  initAutoFill();

  const laengeInput = document.getElementById("laenge");
  const traegerMengeInput = document.getElementById("traeger-menge");

  if (laengeInput) {
    laengeInput.addEventListener("change", () => {
      if (laengeInput.value === "" || parseFloat(laengeInput.value) < 0) {
        laenge.value = 0;
      }
      updateWarningMessage(parseFloat(laengeInput.value), parseFloat(traegerMengeInput.value));
    });

    laengeInput.addEventListener("blur", () => {
      if (laengeInput.value === "") {
        laengeInput.value = 0;
      }
    });
  }

  if (traegerMengeInput) {
    traegerMengeInput.addEventListener("change", () => {
      if (traegerMengeInput.value === "" || parseFloat(traegerMengeInput.value) < 0) {
        traegerMengeInput.value = 0;
      }
      updateWarningMessage(parseFloat(laengeInput.value), parseFloat(traegerMengeInput.value));
    });

    traegerMengeInput.addEventListener("blur", () => {
      if (traegerMengeInput.value === "") {
        traegerMengeInput.value = 0;
      }
    });
  }
}
  init();
});

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('input[data-checkbox-group="my-group"]');

function handleCheckboxChange(e) {
  const targetCheckbox = e.target;

  if (targetCheckbox.checked) {
    checkboxes.forEach(checkbox => {
      if (checkbox !== targetCheckbox) {
        const otherCustomCheckbox = checkbox.parentElement.querySelector('div');
        otherCustomCheckbox.classList.remove('w--redirected-checked');
        checkbox.checked = false;
      }
    });
  }

  // Create and dispatch the custom event
  const checkboxChangedEvent = new CustomEvent("checkboxChanged");
  document.dispatchEvent(checkboxChangedEvent);
}

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
});
