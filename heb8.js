const productForm = document.querySelector(".heb-form");

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
if (key === "kopfplatte-checkbox" || key === "fusplatte-checkbox") {
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
 console.log("setDefaultValues function called");
  const queryParams = getQueryParameters();

  if (!queryParams.optionen) {
    const laengeInput = document.querySelector("laenge");
    if (laengeInput && !queryParams["laenge"]) {
      laengeInput.value = 1000;
    }

    const traegerMengeInput = document.querySelector("traeger-menge");
    if (traegerMengeInput && !queryParams["traeger-menge"]) {
      traegerMengeInput.value = 1;
    }
  }
}

function init() {
console.log("init function called");
  setDefaultValues();
  initAutoFill();

  const laengeInput = document.querySelector("laenge");
  const traegerMengeInput = document.querySelector("traeger-menge");

  if (laengeInput) {
    laengeInput.addEventListener("input", () => {
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
    traegerMengeInput.addEventListener("input", () => {
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

function onDocumentReady(callback) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    callback();
  } else {
    window.addEventListener('DOMContentLoaded', callback);
  }
}

onDocumentReady(init);
  });
   

document.addEventListener('DOMContentLoaded', function () {
  const laengeInput = document.querySelector('#laenge');

  laengeInput.addEventListener('input', function () {
    const value = parseInt(laengeInput.value, 10);

    if (value > 12000) {
      laengeInput.value = 12000;
    }
  });
});

  function removeItemFromCart(itemId) {
  return new Promise((resolve, reject) => {
    if (!itemId) {
      reject('Invalid item ID');
      return;
    }

    $.ajax({
      type: 'POST',
      url: `https://hbmetallbau.foxycart.com/cart?output=json&cart=update&quantity=0&id=${encodeURIComponent(itemId)}&nocache=${Date.now()}`,
      dataType: 'jsonp',
      success: function (response) {
        console.log('Item removed from cart:', itemId);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error('Error removing item from cart:', error);
        reject(error);
      },
    });
  });
}

  $(document).ready(function() {
    // Find the addtocartbutton and its parent form
    const $addtocartbutton = $('[data-cart-trigger]');
    const $form = $addtocartbutton.closest('.configurator-form');

    // Click event handler for the addtocartbutton
    $addtocartbutton.on('click', async function (event) {
      // Prevent the default behavior
      event.preventDefault();

      // Check form validity
      if ($form[0].checkValidity()) {
        // Handle form data and add to cart
        console.log('Form is valid.');

        // Extract form data
        const formData = new FormData($form[0]);
        const productData = getProductData();

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
        const formDataEntries = Object.fromEntries(formData.entries());
        console.log("Form Data Entries:", formDataEntries);
        
      // Get item ID from the URL parameters (if available)
      const urlParams = new URLSearchParams(window.location.search);
      const itemId = urlParams.get('item_id');

      // Remove the item from the cart before adding the updated version
  if (itemId) {
    try {
      await removeItemFromCart(itemId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
        
     addToCart(formData, productData);
    } else {
      console.log("Form is not valid.");
      $('<input type="submit"/>').hide().appendTo($form).click().remove();
    }
  });

  function getProductData() {
    // Get product information from the CMS
    const productCode = "hbheb"; // Replace with the CMS code for the product
    const productName = "HEB Stahlträger"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/640b1549e240298094f4ece2/64216214e6ce555ffa1a3092_Heb.png"; // Replace with the CMS image URL for the product
    const category = "Produkte"; // Replace with the CMS category for the product

    return {
      productCode,
      productName,
      imageUrl,
      category,
    };
  }
  
  function jsonToPlainString(jsonString) {
  return jsonString
    .replace(/["{}]/g, '') // Remove quotes and curly braces
    .replace(/,/g, ', ')   // Add a space after each comma
    .replace(/:/g, ': ');  // Add a space after each colon
} 
   
  function addToCart(formData, productData) {
    const optionsJsonString = JSON.stringify(Object.fromEntries(formData.entries()));
    const optionsPlainString = jsonToPlainString(optionsJsonString);
    const foxyData = {
      code: productData.productCode,
      name: productData.productName,
      price: parseFloat(productForm.querySelector("foxyprice").value),
      Optionen: optionsPlainString,
      URL: window.location.href, // Add the current product URL as a separate attribute
      Länge: parseFloat(productForm.querySelector("laenge").value),
      image: productData.imageUrl,
      category: productData.category,
      weight: parseFloat(productForm.querySelector("final-weight").value),
    };
    console.log("Options:", foxyData.Optionen);
    
    console.log("FoxyData:", foxyData);
    
  const foxyLink = createFoxyCartLink(foxyData);
  $('body').append(foxyLink);
  foxyLink.click();
  foxyLink.remove();
}

function createFoxyCartLink(foxyData) {
  const link = $('<a></a>', {
    href: 'https://hbmetallbau.foxycart.com/cart?'+$.param(foxyData),
    'class': 'foxy-add-to-cart'
  });

  link.css({
    display: 'none'
  });

  return link;
   }
 });



  const VAT_RATE = 0.19;

async function fetchPrices() {
  // Fetch prices from Airtable
  // Replace with your API key and Airtable URL
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/HEB?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    prices[record.fields["traeger format"]] = record.fields;
  });

  return prices;
}

function getSelectedValues() {
  const traegerFormat = productForm.querySelector("#traeger-format").value;
  const laenge = parseFloat(productForm.querySelector("#laenge").value);
  const stegbleche = parseInt(productForm.querySelector("#stegbleche").value, 10);
  const ausklinkungen = parseInt(productForm.querySelector("#ausklinkungen").value, 10);
  const buegel = parseInt(productForm.querySelector("#buegel").value, 10);
  const bohrungen = parseInt(productForm.querySelector("#bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(productForm.querySelector("#bohrungen-durchmesser").value, 10);
  const weiteres = productForm.querySelector("#weiteres").value;
  const traegerMenge = parseInt(productForm.querySelector("#traeger-menge").value, 10);


  return {
    traegerFormat,
    laenge,
    stegbleche,
    ausklinkungen,
    buegel,
    bohrungen,
    bohrungenDurchmesser,
    weiteres,
    traegerMenge,
  };
}

function calculateLaengePrice(traegerFormat, laenge, pricesData) {
  if (!pricesData.hasOwnProperty(traegerFormat)) {
    console.error("HEA size not found in prices data:", traegerFormat);
    return 0;
  }

  const kgPerMeter = parseFloat(pricesData[traegerFormat]["kg/m"]);
  const laengeInMeters = laenge / 1000;
  const weight = kgPerMeter * laengeInMeters;
  const pricePerKg = parseFloat(pricesData[traegerFormat]["kg"]);
  const laengePrice = weight * pricePerKg;

  return laengePrice;
}

function calculateBeamTotalWeight(selectedValues, pricesData) {
  const traegerFormat = selectedValues.traegerFormat;
  const laenge = selectedValues.laenge;
  const kgPerMeter = parseFloat(pricesData[traegerFormat]["kg/m"]);
  const laengeInMeters = laenge / 1000;
  const weight = kgPerMeter * laengeInMeters;
  
  console.log('Selected Values:', selectedValues);
  console.log('Prices Data:', pricesData);
  console.log('HEA Size:', traegerFormat);
  console.log('Beam Llaenge:', laenge);
  console.log('kg/m:', kgPerMeter);
  console.log('Beam Length in Meters:', laengeInMeters);
  console.log('Weight:', weight);
  
  return weight;
}

function calculateOptionsPrice(selectedValues, pricesData) {
  const {
    traegerFormat,
    stegbleche,
    ausklinkungen,
    buegel,
    weiteres,
    bohrungen,
    bohrungenDurchmesser,
    traegerMenge,
  } = selectedValues;

  const stegblechePrice = parseFloat(pricesData[traegerFormat]["stegbleche"]) * stegbleche;
  const ausklinkungenPrice = parseFloat(pricesData[traegerFormat]["ausklinkungen"]) * ausklinkungen;
  const buegelPrice = parseFloat(pricesData[traegerFormat]["buegel"]) * buegel;

  // Extract the price for the selected "weiteres" option from the respective column in the table
  const weiteresOption = productForm.querySelector("#weiteres").value;
  const weiteresPrice = parseFloat(pricesData[traegerFormat][weiteresOption]);

    let diameterCategory = "";
const diameter = parseInt(bohrungenDurchmesser);

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
const bohrungenPricePerHole = parseFloat(pricesData[traegerFormat][diameterCategory]);
const bohrungenPrice = bohrungenPricePerHole * bohrungen;

console.log("Bohrungen price:", bohrungenPrice);

  console.log("Stegbleche price:", stegblechePrice);
  console.log("Ausklinkungen price:", ausklinkungenPrice);
  console.log("Buegel price:", buegelPrice);
  console.log("Weiteres price:", weiteresPrice);

  const optionsPrice = stegblechePrice + ausklinkungenPrice + buegelPrice + weiteresPrice + bohrungenPrice;
  return optionsPrice;
}

//kopfplatte

async function fetchKopfplattePrices() {
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/Kopfplatte?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    if (!prices.hasOwnProperty(record.fields["Option"])) {
      prices[record.fields["Option"]] = {};
    }
    const value = record.fields["Value"] || 'default';
    prices[record.fields["Option"]][record.fields["Value"]] = record.fields["Price"];
  });
  return prices;
}

function calculateKopfplattePrice(kopfplattePricesData) {
  // Check if the kopfplatte checkbox is checked
  const kopfplatteCheckbox = productForm.querySelector("#kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }

  const lange = parseInt(productForm.querySelector("#kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(productForm.querySelector("#kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(productForm.querySelector("#kopfplatte-dicke").value, 10) || 0;
  const anschweisen = productForm.querySelector("#kopfplatte-anschweisen").value;
  const bohrungen = parseInt(productForm.querySelector("#kopfplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(productForm.querySelector("#kopfplatte-bohrungen-durchmesser").value, 10);
  const kehlnahtstarke = productForm.querySelector("#kopfplatte-kehlnahtstarke").value;
  const dorne = parseInt(productForm.querySelector("#kopfplatte-dorne").value, 10);

  const steelDensity = 7850; // in kg/m3

  // Calculate size price
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  const sizePrice = weight * parseFloat(kopfplattePricesData["kg"]["default"]);
  
  const baseCuttingPriceKopfplatte = parseFloat(kopfplattePricesData["schneiden"]["default"]);

  // Calculate bohrungen price
  let bohrungenCategory = "";

  if (bohrungenDurchmesser >= 10 && bohrungenDurchmesser <= 13) {
    bohrungenCategory = "10-13";
  } else if (bohrungenDurchmesser >= 14 && bohrungenDurchmesser <= 18) {
  bohrungenCategory = "14-18";
  } else if (bohrungenDurchmesser >= 19 && bohrungenDurchmesser <= 22) {
    bohrungenCategory = "19-22";
  } else {
  }

  const bohrungenPrice = parseFloat(kopfplattePricesData[bohrungenCategory][bohrungenCategory]) * bohrungen;

  // Calculate other option prices
  const anschweisenPrice = parseFloat(kopfplattePricesData["anschweiben"][anschweisen]);
  const kehlnahtstarkePrice = parseFloat(kopfplattePricesData["kehlnahtstarke"][kehlnahtstarke]);
  const dornePrice = parseFloat(kopfplattePricesData["dorne"][dorne.toString()]);

  const kopfplattePrice = sizePrice + bohrungenPrice + anschweisenPrice + kehlnahtstarkePrice + dornePrice + baseCuttingPriceKopfplatte;
  return kopfplattePrice;
  
}

function calculateKopfplatteWeight(selectedValues, steelDensity) {
    const kopfplatteCheckbox = productForm.querySelector("#kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(productForm.querySelector("#kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(productForm.querySelector("#kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(productForm.querySelector("#kopfplatte-dicke").value, 10) || 0;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  console.log('Selected Values:', selectedValues);
  console.log('Steel Density:', steelDensity);
  console.log('Lange:', lange);
  console.log('Breite:', breite);
  console.log('Dicke:', dicke);
  console.log('Volume:', volume);
  console.log('Weight:', weight);
  
  return weight;
}  

  //Fusplatte

  async function fetchFusplattePrices() {
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/Fusplatte?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    if (!prices.hasOwnProperty(record.fields["Option"])) {
      prices[record.fields["Option"]] = {};
    }
    const value = record.fields["Value"] || 'default';
    prices[record.fields["Option"]][record.fields["Value"]] = record.fields["Price"];
  });

  return prices;
}

function calculateFusplattePrice(fusplattePricesData) {
  // Check if the fusplatte checkbox is checked
  const fusplatteCheckbox = productForm.querySelector("#fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  
  const lange = parseInt(productForm.querySelector("#fusplatte-lange").value, 10) || 0;
  const breite = parseInt(productForm.querySelector("#fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(productForm.querySelector("#fusplatte-dicke").value, 10) || 0;
  const anschweisen = productForm.querySelector("#fusplatte-anschweisen").value;
  const bohrungen = parseInt(productForm.querySelector("#fusplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(productForm.querySelector("#fusplatte-bohrungen-durchmesser").value, 10);
  const kehlnahtstarke = productForm.querySelector("#fusplatte-kehlnahtstarke").value;

  const steelDensity = 7850; // in kg/m3
  

  // Calculate size price
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  console.log("Weight:", weight);
  console.log("fusplattePricesData kg price:", parseFloat(fusplattePricesData["kg"]["default"]));

  const sizePrice = weight * parseFloat(fusplattePricesData["kg"]["default"]);
  console.log("Size price:", sizePrice);
  
  const baseCuttingPriceFusplatte = parseFloat(fusplattePricesData["schneiden"]["default"]);
  console.log("fusplatte schneiden Price:", baseCuttingPriceFusplatte);

  // Calculate bohrungen price
  let bohrungenCategory = "";

  if (bohrungenDurchmesser >= 10 && bohrungenDurchmesser <= 13) {
    bohrungenCategory = "10-13";
  } else if (bohrungenDurchmesser >= 14 && bohrungenDurchmesser <= 18) {
  bohrungenCategory = "14-18";
  } else if (bohrungenDurchmesser >= 19 && bohrungenDurchmesser <= 22) {
    bohrungenCategory = "19-22";
  } else {
    console.error("Invalid bohrungenDurchmesser value:", bohrungenDurchmesser);
  }

  const bohrungenPrice = parseFloat(fusplattePricesData[bohrungenCategory][bohrungenCategory]) * bohrungen;
  console.log("Bohrungen price:", bohrungenPrice);
  console.log("fusplattePricesData bohrungenCategory price:", parseFloat(fusplattePricesData[bohrungenCategory][bohrungenCategory]));

  // Calculate other option prices
  const anschweisenPrice = parseFloat(fusplattePricesData["anschweiben"][anschweisen]);
  const kehlnahtstarkePrice = parseFloat(fusplattePricesData["kehlnahtstarke"][kehlnahtstarke]);
  console.log("anschweisen Price:", anschweisenPrice);
  console.log("kehlnahtstarke Price:", kehlnahtstarkePrice);

  const fusplattePrice = sizePrice + bohrungenPrice + anschweisenPrice + kehlnahtstarkePrice + baseCuttingPriceFusplatte;
  console.log("fusplatte Price:", fusplattePrice);
  return fusplattePrice;
  console.log("fusplattePricesData:", fusplattePricesData);

}

function calculatefusplatteWeight(selectedValues, steelDensity) {
    const fusplatteCheckbox = productForm.querySelector("#fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(productForm.querySelector("#fusplatte-lange").value, 10) || 0;
  const breite = parseInt(productForm.querySelector("#fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(productForm.querySelector("#fusplatte-dicke").value, 10) || 0;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  console.log('Selected Values:', selectedValues);
  console.log('Steel Density:', steelDensity);
  console.log('Lange:', lange);
  console.log('Breite:', breite);
  console.log('Dicke:', dicke);
  console.log('Volume:', volume);
  console.log('Weight:', weight);
  
  return weight;
}

function calculateTotalPrice(selectedValues, pricesData, traegerMenge, kopfplattePrice, fusplattePrice) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const laengePrice = calculateLaengePrice(selectedValues.traegerFormat, parseInt(selectedValues.laenge), pricesData);
    console.log("Length price:", laengePrice);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
    console.log("Options price:", optionsPrice);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.traegerFormat]["schneiden"]);
    console.log("Base cutting price:", baseCuttingPrice);
  const totalPrice = (laengePrice + optionsPrice + baseCuttingPrice + kopfplattePrice + fusplattePrice) * traegerMenge;
    console.log("Total price:", totalPrice);
  return totalPrice;
}

function calculateFinalWeight(selectedValues, pricesData, traegerMenge, steelDensity) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);
  const kopfplatteWeight = calculateKopfplatteWeight(selectedValues, steelDensity);
  const fusplatteWeight = calculatefusplatteWeight(selectedValues, steelDensity);

  const finalWeight = (beamTotalWeight + kopfplatteWeight + fusplatteWeight) * traegerMenge;
  console.log("Final weight:", finalWeight);
  
  productForm.querySelector("#final-weight").value = finalWeight;
}


function updateWarningMessage(laenge, traegerMenge) {
  const warningMessage = productForm.querySelector("#warning-message");

  if (laenge <= 0 || traegerMenge <= 0) {
    warningMessage.style.display = "block";
  } else {
    warningMessage.style.display = "none";
  }
}


function updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice) {
  const priceWithoutVAT = totalPrice;
  const priceWithVAT = totalPrice * (1 + VAT_RATE);
  productForm.querySelector("#foxyprice").value = priceWithVAT.toFixed(2);

  const priceWithVATElem = productForm.querySelector("#price-vat-2");
  const priceWithoutVATElem = productForm.querySelector("#price-novat-2");

  if (priceWithVATElem) {
    animateValue(priceWithVATElem, oldPriceWithVAT, priceWithVAT, 500);
  }
  if (priceWithoutVATElem) {
    animateValue(priceWithoutVATElem, oldPriceWithoutVAT, priceWithoutVAT, 500);
  }
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
  const kopfplattePricesDataPromise = fetchKopfplattePrices();
  const fusplattePricesDataPromise = fetchFusplattePrices();

  const kopfplattePricesData = await kopfplattePricesDataPromise;
  const fusplattePricesData = await fusplattePricesDataPromise;

  const totalPriceKopfplatte = calculateKopfplattePrice(kopfplattePricesData);
  const totalPriceFusplatte = calculateFusplattePrice(fusplattePricesData);

  const selectedValues = getSelectedValues();
  const totalPriceHEA = calculateTotalPrice(selectedValues, pricesData, selectedValues.traegerMenge, totalPriceKopfplatte, totalPriceFusplatte);
  
  const steelDensity = 7850; // Assuming the steel density is 7850 kg/m³. You can replace it with the appropriate value.
  calculateFinalWeight(selectedValues, pricesData, selectedValues.traegerMenge, steelDensity);
  
  const totalPrice = totalPriceHEA;

  const priceWithoutVATElem = productForm.querySelector("#price-novat-2");
  const priceWithVATElem = productForm.querySelector("#price-vat-2");

  const oldPriceWithoutVAT = parseFloat(priceWithoutVATElem.textContent.substr(1));
  const oldPriceWithVAT = parseFloat(priceWithVATElem.textContent.substr(1));

  updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice);
}



async function main() {
  const kopfplattePricesData = await fetchKopfplattePrices();
  const kopfplattePrices = calculateKopfplattePrice(kopfplattePricesData);
  const fusplattePricesData = await fetchFusplattePrices();
  const fusplattePrices = calculateFusplattePrice(fusplattePricesData);
  const pricesData = await fetchPrices();

  productForm.querySelector("#traeger-format").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#laenge").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#stegbleche").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#ausklinkungen").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#buegel").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#weiteres").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#bohrungen").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData));
  productForm.querySelector("#traeger-menge").addEventListener("input", () => updatePrice(pricesData));
  productForm.querySelector("#kopfplatte-checkbox").addEventListener("change", () => updatePrice(pricesData, fetchKopfplattePrices(), fetchFusplattePrices()));
  productForm.querySelector("#kopfplatte-lange").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-breite").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-dicke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-anschweisen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-bohrungen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-kehlnahtstarke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#kopfplatte-dorne").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  productForm.querySelector("#fusplatte-checkbox").addEventListener("change", () => updatePrice(pricesData, fetchKopfplattePrices(), fetchFusplattePrices()));
  productForm.querySelector("#fusplatte-lange").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-breite").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-dicke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-anschweisen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-bohrungen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  productForm.querySelector("#fusplatte-kehlnahtstarke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));

  

  // Add event listeners for other form elements as needed

  updatePrice(pricesData, kopfplattePricesData, fusplattePricesData); // Call once to initialize the price
}

main();
