document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const fileList = document.querySelector('.file-list');
  const maxFileSize = parseInt(fileInput.getAttribute('data-max-size'));

  fileInput.addEventListener('change', function (e) {
    if (fileInput.files.length === 0) return;

    Array.from(fileInput.files).forEach((file) => {
      if (file.size > maxFileSize) {
        displayError(file, `Die Dateigröße von ${file.name} darf 20 MB nicht überschreiten`, true);
        return;
      }

      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');

      const fileNameContainer = document.createElement('div');
      fileNameContainer.classList.add('file-name');
      fileItem.appendChild(fileNameContainer);

      const fileName = document.createElement('span');
      fileName.textContent = file.name;
      fileNameContainer.appendChild(fileName);

      const removeFileButton = document.createElement('button');
      removeFileButton.classList.add('remove-file');
      removeFileButton.textContent = 'X';
      fileNameContainer.appendChild(removeFileButton);

      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      fileItem.appendChild(progressBar);

      fileList.appendChild(fileItem);

      removeFileButton.addEventListener('click', function () {
        fileItem.remove();
        removeErrorItems(file);
      });

      // Simulate file upload progress
      let progress = 0;
      const progressInterval = setInterval(function () {
        progress += 10;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
          clearInterval(progressInterval);
          progressBar.style.display = 'none';

          uploadToCloudinary(file)
            .then((imageUrl) => {
              const uploadedImagesField = document.querySelector(
                'input[name="uploaded_images"]'
              );
              uploadedImagesField.value += imageUrl + ';';
            })
            .catch((error) => {
              displayError(file, `Fehler beim Hochladen von ${file.name}: ${error.message}`);
            });
        }
      }, 100);
    });

    fileInput.value = '';
  });

  function displayError(file, message, autoDisappear = false) {
    const errorItem = document.createElement('div');
    errorItem.classList.add('file-item');
    errorItem.classList.add('error');
    errorItem.setAttribute('data-file-name', file.name);
    errorItem.textContent = message;

    fileList.appendChild(errorItem);

    if (autoDisappear) {
      setTimeout(function () {
        removeErrorItems(file);
      }, 5000);
    }
  }

  function removeErrorItems(file) {
    const errorItems = document.querySelectorAll(`.file-item.error[data-file-name="${file.name}"]`);
    if (errorItems) {
      errorItems.forEach(function (errorItem) {
        errorItem.remove();
      });
    }
  }
});

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.secure_url);
        }
      } else if (xhr.readyState === 4) {
        reject(new Error('Upload-Fehler'));
      }
    };
    xhr.send(formData);
  });
}



  document.addEventListener('DOMContentLoaded', function () {
  const beamLengthInput = document.querySelector('#beam-length');

  beamLengthInput.addEventListener('input', function () {
    const value = parseInt(beamLengthInput.value, 10);

    if (value > 12000) {
      beamLengthInput.value = 12000;
    }
  });
});


  $(document).ready(function() {
    // Find the addtocartbutton and its parent form
    const $addtocartbutton = $('[data-cart-trigger]');
    const $form = $addtocartbutton.closest('.configurator-form');

    // Click event handler for the addtocartbutton
    $addtocartbutton.on('click', function(event) {
      // Prevent the default behavior
      event.preventDefault();

      // Check form validity
      if ($form[0].checkValidity()) {
        // Handle form data and add to cart
        console.log('Form is valid.');

        // Extract form data
        const formData = new FormData($form[0]);

        const kopfplatteCheckbox = document.querySelector('#kopfplatte-checkbox');

      if (kopfplatteCheckbox && kopfplatteCheckbox.checked) {
        const kopfplatteLangeInput = document.querySelector('select[name="kopfplatte-lange"]');
        const kopfplatteBreiteInput = document.querySelector('select[name="kopfplatte-breite"]');
        const kopfplatteDickeInput = document.querySelector('select[name="kopfplatte-dicke"]');
        const kopfplatteAnschweisenInput = document.querySelector('select[name="kopfplatte-anschweisen"]');
        const kopfplatteBohrungenInput = document.querySelector('select[name="kopfplatte-bohrungen"]');
        const kopfplatteBohrungenDurchmesserInput = document.querySelector('select[name="kopfplatte-bohrungen-durchmesser"]');
        const kopfplatteKehlnahtstarkeInput = document.querySelector('select[name="kopfplatte-kehlnahtstarke"]');
        const kopfplatteDorneInput = document.querySelector('select[name="kopfplatte-dorne"]');

        if (kopfplatteLangeInput) {
          formData.set('kopfplatte-lange', kopfplatteLangeInput.value);
        }
        if (kopfplatteBreiteInput) {
          formData.set('kopfplatte-breite', kopfplatteBreiteInput.value);
        }
        if (kopfplatteDickeInput) {
          formData.set('kopfplatte-dicke', kopfplatteDickeInput.value);
        }
        if (kopfplatteAnschweisenInput) {
          formData.set('kopfplatte-anschweisen', kopfplatteAnschweisenInput.value);
        }
        if (kopfplatteBohrungenInput) {
          formData.set('kopfplatte-bohrungen', kopfplatteBohrungenInput.value);
        }
        if (kopfplatteBohrungenDurchmesserInput) {
          formData.set('kopfplatte-bohrungen-durchmesser', kopfplatteBohrungenDurchmesserInput.value);
        }
        if (kopfplatteKehlnahtstarkeInput) {
          formData.set('kopfplatte-kehlnahtstarke', kopfplatteKehlnahtstarkeInput.value);
        }
        if (kopfplatteDorneInput) {
          formData.set('kopfplatte-dorne', kopfplatteDorneInput.value);
        }
      } else {
        formData.delete('kopfplatte-lange');
        formData.delete('kopfplatte-breite');
        formData.delete('kopfplatte-dicke');
        formData.delete('kopfplatte-anschweisen');
        formData.delete('kopfplatte-bohrungen');
        formData.delete('kopfplatte-bohrungen-durchmesser');
        formData.delete('kopfplatte-kehlnahtstarke');
        formData.delete('kopfplatte-dorne');
      }

      const fusplatteCheckbox = document.querySelector('#fusplatte-checkbox');

      if (fusplatteCheckbox && fusplatteCheckbox.checked) {
        const fusplatteLangeInput = document.querySelector('select[name="fusplatte-lange"]');
        const fusplatteBreiteInput = document.querySelector('select[name="fusplatte-breite"]');
        const fusplatteDickeInput = document.querySelector('select[name="fusplatte-dicke"]');
        const fusplatteAnschweisenInput = document.querySelector('select[name="fusplatte-anschweisen"]');
        const fusplatteBohrungenInput = document.querySelector('select[name="fusplatte-bohrungen"]');
        const fusplatteBohrungenDurchmesserInput = document.querySelector('select[name="fusplatte-bohrungen-durchmesser"]');
        const fusplatteKehlnahtstarkeInput = document.querySelector('select[name="fusplatte-kehlnahtstarke"]');

        if (fusplatteLangeInput) {
          formData.set('fusplatte-lange', fusplatteLangeInput.value);
        }
        if (fusplatteBreiteInput) {
          formData.set('fusplatte-breite', fusplatteBreiteInput.value);
        }
        if (fusplatteDickeInput) {
          formData.set('fusplatte-dicke', fusplatteDickeInput.value);
        }
        if (fusplatteAnschweisenInput) {
          formData.set('fusplatte-anschweisen', fusplatteAnschweisenInput.value);
        }
        if (fusplatteBohrungenInput) {
          formData.set('fusplatte-bohrungen', fusplatteBohrungenInput.value);
        }
        if (fusplatteBohrungenDurchmesserInput) {
          formData.set('fusplatte-bohrungen-durchmesser', fusplatteBohrungenDurchmesserInput.value);
        }
        if (fusplatteKehlnahtstarkeInput) {
          formData.set('fusplatte-kehlnahtstarke', fusplatteKehlnahtstarkeInput.value);
        }
      } else {
        formData.delete('fusplatte-lange');
        formData.delete('fusplatte-breite');
        formData.delete('fusplatte-dicke');
        formData.delete('fusplatte-anschweisen');
        formData.delete('fusplatte-bohrungen');
        formData.delete('fusplatte-bohrungen-durchmesser');
        formData.delete('fusplatte-kehlnahtstarke');
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

    } else {
      console.log('Form is not valid.');
      $('<input type="submit"/>').hide().appendTo($form).click().remove();
    }
  });
});




  const VAT_RATE = 0.19;

async function fetchPrices() {
  // Fetch prices from Airtable
  // Replace with your API key and Airtable URL
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/HEA?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    prices[record.fields["HEA Size"]] = record.fields;
  });

  return prices;
}

function getSelectedValues() {
  const heaSize = document.getElementById("hea-size").value;
  const beamLength = parseFloat(document.getElementById("beam-length").value);
  const heaStegbleche = parseInt(document.getElementById("hea-stegbleche").value, 10);
  const heaAusklinkungen = parseInt(document.getElementById("hea-ausklinkungen").value, 10);
  const heaBugel = parseInt(document.getElementById("hea-bugel").value, 10);
  const heaBohrungen = parseInt(document.getElementById("hea-bohrungen").value, 10);
  const heaBohrungenDurchmesser = parseInt(document.getElementById("hea-bohrungen-durchmesser").value, 10);
  const heaWeiteres = document.getElementById("hea-weiteres").value;
  const beamMenge = parseInt(document.getElementById("beam-menge").value, 10);

  return {
    heaSize,
    beamLength,
    heaStegbleche,
    heaAusklinkungen,
    heaBugel,
    heaBohrungen,
    heaBohrungenDurchmesser,
    heaWeiteres,
    beamMenge,
  };
}

function calculateLengthPrice(heaSize, beamLength, pricesData) {
  if (!pricesData.hasOwnProperty(heaSize)) {
    console.error("HEA size not found in prices data:", heaSize);
    return 0;
  }

  const kgPerMeter = parseFloat(pricesData[heaSize]["kg/m"]);
  const beamLengthInMeters = beamLength / 1000;
  const totalWeight = kgPerMeter * beamLengthInMeters;
  const pricePerKg = parseFloat(pricesData[heaSize]["kg"]);
  const lengthPrice = totalWeight * pricePerKg;

  return lengthPrice;
}

function calculateOptionsPrice(selectedValues, pricesData) {
  const {
    heaSize,
    heaStegbleche,
    heaAusklinkungen,
    heaBugel,
    heaWeiteres,
    heaBohrungen,
    heaBohrungenDurchmesser,
    beamMenge,
  } = selectedValues;

  const stegblechePrice = parseFloat(pricesData[heaSize]["stegbleche"]) * heaStegbleche;
  const ausklinkungenPrice = parseFloat(pricesData[heaSize]["ausklinkungen"]) * heaAusklinkungen;
  const bugelPrice = parseFloat(pricesData[heaSize]["bugel"]) * heaBugel;

  // Extract the price for the selected "hea-weiteres" option from the respective column in the table
  const weiteresOption = document.getElementById("hea-weiteres").value;
  const weiteresPrice = parseFloat(pricesData[heaSize][weiteresOption]);

    let diameterCategory = "";
const diameter = parseInt(heaBohrungenDurchmesser);

if (diameter >= 6 && diameter <= 13) {
  diameterCategory = "6-13";
} else if (diameter >= 14 && diameter <= 18) {
  diameterCategory = "14-18";
} else if (diameter >= 19 && diameter <= 22) {
  diameterCategory = "19-22";
} else {
  console.error("Invalid diameter value:", diameter);
}

// Calculate the bohrungen price
const bohrungenPricePerHole = parseFloat(pricesData[heaSize][diameterCategory]);
const bohrungenPrice = bohrungenPricePerHole * heaBohrungen;

console.log("Bohrungen price:", bohrungenPrice);

  console.log("Stegbleche price:", stegblechePrice);
  console.log("Ausklinkungen price:", ausklinkungenPrice);
  console.log("Bugel price:", bugelPrice);
  console.log("Weiteres price:", weiteresPrice);

  const optionsPrice = stegblechePrice + ausklinkungenPrice + bugelPrice + weiteresPrice + bohrungenPrice;
  return optionsPrice;
}


function calculateTotalPrice(selectedValues, pricesData, kopfplattePricesData, beamMenge) {
  const lengthPrice = calculateLengthPrice(selectedValues.heaSize, parseInt(selectedValues.beamLength), pricesData);
  console.log("Length price:", lengthPrice);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
  console.log("Options price:", optionsPrice);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.heaSize]["schneiden"]);
  console.log("Base cutting price:", baseCuttingPrice);

  const isKopfplatteChecked = document.getElementById("kopfplatte-checkbox").checked;

  let kopfplattePrice = 0;

  if (isKopfplatteChecked) {
    kopfplattePrice = calculateKopfplattePrice(getKopfplatteSelectedValues(), kopfplattePricesData);
  }

  const totalPrice = ((lengthPrice + optionsPrice + baseCuttingPrice) * beamMenge) + kopfplattePrice;
  console.log("Total price:", totalPrice);
  return totalPrice;
}



function setDefaultValues() {
  const beamLengthInput = document.getElementById("beam-length");
  if (beamLengthInput) {
    beamLengthInput.value = 1000;
  }
  const beamMengeInput = document.getElementById("beam-menge");
  if (beamMengeInput) {
    beamMengeInput.value = 1;
  }
}

function updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice) {
  const priceWithoutVAT = totalPrice;
  const priceWithVAT = totalPrice * (1 + VAT_RATE);

  const priceWithVATElem = document.getElementById("price-vat");
  const priceWithoutVATElem = document.getElementById("price-novat");

  if (priceWithVATElem) {
    animateValue(priceWithVATElem, oldPriceWithVAT, priceWithVAT, 500);
  }
  if (priceWithoutVATElem) {
    animateValue(priceWithoutVATElem, oldPriceWithoutVAT, priceWithoutVAT, 500);
  }
}

//kopfplatte

function isKopfplatteChecked() {
  return document.getElementById("kopfplatte-checkbox").checked;
}

function getKopfplatteSelectedValues() {
  const fusplatteLange = parseFloat(document.getElementById("fusplatte-lange").value);
  const fusplatteBreite = parseFloat(document.getElementById("fusplatte-breite").value);
  const fusplatteDicke = parseFloat(document.getElementById("fusplatte-dicke").value);
  const anschweisen = document.getElementById("kopfplatte-anschweisen").value;
  const kehlnahtstarke = document.getElementById("kopfplatte-kehlnahtstarke").value;
  const dorne = document.getElementById("kopfplatte-dorne").value;
  const bohrungen = parseInt(document.getElementById("kopfplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(document.getElementById("kopfplatte-bohrungen-durchmesser").value, 10);

  return {
    fusplatteLange,
    fusplatteBreite,
    fusplatteDicke,
    anschweisen,
    kehlnahtstarke,
    dorne,
    bohrungen,
    bohrungenDurchmesser,
  };
}

async function fetchKopfplattePrices() {
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/Kopfplatte?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    prices[record.fields["Option"]] = record.fields;
  });

  console.log("Fetched prices data:", prices);
  
  return prices;
}

function calculateKopfplattePrice(selectedValues, kopfplattePricesData) {
  const {
    fusplatteLange,
    fusplatteBreite,
    fusplatteDicke,
    anschweisen,
    kehlnahtstarke,
    dorne,
    bohrungen,
    bohrungenDurchmesser,
  } = selectedValues;

  // Find the price per kg in the data
  const pricePerKgRecord = kopfplattePricesData.find(record => record.Option === "kg");
  const pricePerKg = parseFloat(pricePerKgRecord.Price);

  // Calculate the price of the platte using steel density and volume
  const STEEL_DENSITY = 7850; // kg/m³
  const volume = (fusplatteLange / 1000) * (fusplatteBreite / 1000) * (fusplatteDicke / 1000); // m³
  const weight = volume * STEEL_DENSITY; // kg
  const plattePrice = weight * pricePerKg;

  // Helper function to find the price for a specific option and value
  const findPrice = (option, value) => {
    const record = kopfplattePricesData.find(row => row.Option === option && row.Value === value);
    return record ? parseFloat(record.Price) : 0;
  };

  // Calculate the price for other data
  const anschweisenPrice = findPrice("anschweisen", anschweisen);
  const kehlnahtstarkePrice = findPrice("kehlnahtstarke", kehlnahtstarke);
  const dornePrice = findPrice("dorne", dorne);

  // Calculate the bohrungen price
  let diameterCategory = "";
  const diameter = parseInt(bohrungenDurchmesser);

  if (diameter >= 10 && diameter <= 13) {
    diameterCategory = "10-13";
  } else if (diameter >= 14 && diameter <= 18) {
    diameterCategory = "14-18";
  } else if (diameter >= 19 && diameter <= 22) {
    diameterCategory = "19-22";
  } else {
    console.error("Invalid diameter value:", diameter);
  }

  const bohrungenPricePerHole = findPrice(diameterCategory, diameterCategory);
  const bohrungenPrice = bohrungenPricePerHole * bohrungen;

  return kopfplattePrice = plattePrice + anschweisenPrice + kehlnahtstarkePrice + dornePrice + bohrungenPrice;
}


function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  const change = end - start;

  function updateValue(timestamp) {
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = start + change * progress;

    element.textContent = `€${currentValue.toFixed(2)}`;

    if (elapsedTime < duration) {
      window.requestAnimationFrame(updateValue);
    }
  }

  window.requestAnimationFrame(updateValue);
}


async function updatePrice(pricesData) {
  const kopfplattePricesData = await fetchKopfplattePrices();
  console.log("Prices data in updatePrice:", pricesData);
  const selectedValues = getSelectedValues();
  const totalPrice = calculateTotalPrice(selectedValues, pricesData, kopfplattePricesData, selectedValues.beamMenge);

  const priceWithoutVATElem = document.getElementById("price-novat");
  const priceWithVATElem = document.getElementById("price-vat");

  const oldPriceWithoutVAT = parseFloat(priceWithoutVATElem.textContent.substr(1));
  const oldPriceWithVAT = parseFloat(priceWithVATElem.textContent.substr(1));

  updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice);
}

async function main() {
  const pricesData = await fetchPrices();
  const kopfplattePricesData = await fetchKopfplattePrices();

  document.getElementById("hea-size").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("beam-length").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-stegbleche").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-ausklinkungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bugel").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-weiteres").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bohrungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("beam-menge").addEventListener("input", () => updatePrice(pricesData));
  document.getElementById("kopfplatte-checkbox").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("fusplatte-lange").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("fusplatte-breite").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("fusplatte-dicke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-anschweisen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-kehlnahtstarke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-dorne").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-bohrungen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));

  // Add event listeners for other form elements as needed

  setDefaultValues();
  updatePrice(pricesData); // Call once to initialize the price
}

main();
