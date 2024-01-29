  document.addEventListener('DOMContentLoaded', function () {
  const kopfplatteBohrungenSelect = document.getElementById('kopfplatte-bohrungen');
    const kopfplatteBohrungenPositionContainer = document.getElementById('kopfplatte-bohrungen-position-container');

    kopfplatteBohrungenSelect.addEventListener('change', () => {
        if (kopfplatteBohrungenSelect.value === '2') {
            kopfplatteBohrungenPositionContainer.style.display = 'block';
        } else {
            kopfplatteBohrungenPositionContainer.style.display = 'none';
        }
    });

    const fusplatteBohrungenSelect = document.getElementById('fusplatte-bohrungen');
    const fusplatteBohrungenPositionContainer = document.getElementById('fusplatte-bohrungen-position-container');

    fusplatteBohrungenSelect.addEventListener('change', () => {
        if (fusplatteBohrungenSelect.value === '2') {
            fusplatteBohrungenPositionContainer.style.display = 'block';
        } else {
            fusplatteBohrungenPositionContainer.style.display = 'none';
        }
    });
  const laengeInput = document.querySelector('#laenge');

  laengeInput.addEventListener('change', function () {
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
      }
        const formDataEntries = Object.fromEntries(formData.entries());
        
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
      $('<input type="submit"/>').hide().appendTo($form).click().remove();
    }
  });

  function getProductData() {
    // Get product information from the CMS
    const productCode = "hbunp"; // Replace with the CMS code for the product
    const productName = "UNP Stahlträger"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/6401aa505499a5c8687df64f/64fae1b7dff263338bcf4717_UNP-watermark.png"; // Replace with the CMS image URL for the product
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
    const quantity = parseFloat(document.getElementById("traeger-menge").value);
    const optionsJsonString = JSON.stringify(Object.fromEntries(formData.entries()));
    const optionsPlainString = jsonToPlainString(optionsJsonString);
    const finalWeight = parseFloat(document.getElementById("final-weight").value);
    const foxyWeight = Math.round(finalWeight);
    const foxyData = {
      code: productData.productCode,
      name: productData.productName,
      price: parseFloat(document.getElementById("foxyprice").value),
      Optionen: optionsPlainString,
      URL: window.location.href, // Add the current product URL as a separate attribute
      Länge: parseFloat(document.getElementById("laenge").value),
      image: productData.imageUrl,
      category: productData.category,
      weight: foxyWeight,
      quantity: quantity
    };
    
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
  // Fetch prices from Airtable using Personal Access Token
  // Replace with your Personal Access Token and Airtable URL
  const personalAccessToken = 'patBxEFMXqAnjBTHi.90152106ab2c7a037160f1c83ad6e263b34ac12dc4aa0a622c4f64c0b71812a8';
  const url = 'https://api.airtable.com/v0/appIIKEo5ExPVPr9I/UNP';

  // Setting up the request headers with the Personal Access Token
  const headers = {
    'Authorization': `Bearer ${personalAccessToken}`
  };

  const response = await fetch(url, { headers: headers });
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    prices[record.fields['traeger format']] = record.fields;
  });

  return prices;
}

function getSelectedValues() {
  const traegerFormat = document.getElementById("traeger-format").value;
  const laenge = parseFloat(document.getElementById("laenge").value);
  const stegbleche = parseInt(document.getElementById("stegbleche").value, 10);
  const ausklinkungen = parseInt(document.getElementById("ausklinkungen").value, 10);
  const buegel = parseInt(document.getElementById("buegel").value, 10);
  const bohrungen = parseInt(document.getElementById("bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(document.getElementById("bohrungen-durchmesser").value, 10);
  const ankerpratzen = parseInt(document.getElementById("ankerpratzen").value, 10);
  const traegerMenge = parseInt(document.getElementById("traeger-menge").value, 10);
  let bohrungenOberflansch = parseInt(document.getElementById("bohrungen-oberflansch").value, 10);
  let bohrungenSteg = parseInt(document.getElementById("bohrungen-steg").value, 10);
  let bohrungenUnterflansch = parseInt(document.getElementById("bohrungen-unterflansch").value, 10);
  let buegelOberflansch = parseInt(document.getElementById("buegel-oberflansch").value, 10);
  let buegelSteg = parseInt(document.getElementById("buegel-steg").value, 10);
  let buegelUnterflansch = parseInt(document.getElementById("buegel-unterflansch").value, 10);

  return {
    traegerFormat,
    laenge,
    stegbleche,
    ausklinkungen,
    buegel,
    bohrungen,
    bohrungenDurchmesser,
    ankerpratzen,
    traegerMenge,
    bohrungenOberflansch,   
    bohrungenSteg,         
    bohrungenUnterflansch,
    buegelOberflansch,   
    buegelSteg,         
    buegelUnterflansch,
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
  let stegblecheKg = parseFloat(pricesData[traegerFormat]["stegbleche kg"]);
  const laengeInMeters = laenge / 1000;
  const stegblecheMultiplier = parseFloat(document.getElementById('stegbleche').value);
  if (!isNaN(stegblecheMultiplier)) {
    stegblecheKg *= stegblecheMultiplier;
  }
  const weight = kgPerMeter * laengeInMeters + stegblecheKg;
  
  return weight;
}

function calculateBeamSurface(selectedValues, pricesData) {
  const traegerFormat = selectedValues.traegerFormat;
  const laenge = selectedValues.laenge;
  const surfacePerMeter = parseFloat(pricesData[traegerFormat]["m²/m"]);
  let stegblecheSurface = parseFloat(pricesData[traegerFormat]["stegbleche suprafata"]);
  const laengeInMeters = laenge / 1000;
  const stegblecheMultiplier = parseFloat(document.getElementById('stegbleche').value);
  if (!isNaN(stegblecheMultiplier)) {
    stegblecheSurface *= stegblecheMultiplier;
  }
  const surface = surfacePerMeter * laengeInMeters + stegblecheSurface;
  
  return surface;
}

function calculateOptionsPrice(selectedValues, pricesData) {
  let {
    traegerFormat,
    stegbleche,
    ausklinkungen,
    buegel,
    bohrungen,
    bohrungenDurchmesser,
    ankerpratzen,
    traegerMenge,
    bohrungenOberflansch,   
    bohrungenSteg,         
    bohrungenUnterflansch,
    buegelOberflansch,   
    buegelSteg,         
    buegelUnterflansch,
  } = selectedValues;

  const stegblechePrice = parseFloat(pricesData[traegerFormat]["stegbleche"]) * stegbleche;
  const ausklinkungenPrice = parseFloat(pricesData[traegerFormat]["ausklinkungen"]) * ausklinkungen;
  const ankerpratzenPrice = parseFloat(pricesData[traegerFormat]["ankerpratzen"]) * ankerpratzen;
  
  const buegelPrice = parseFloat(pricesData[traegerFormat]["buegel"]) * buegel;

  // If buegel is 0, then all the positions should also be 0
if (buegel === 0) {
    buegelOberflansch = 0;
    buegelSteg = 0;
    buegelUnterflansch = 0;
}

  // Validate the bohrungen split
    const totalBuegelSplit = buegelOberflansch + buegelSteg + buegelUnterflansch;
    const buegelErrorMessageDiv = document.getElementById('buegel-error-message-div');

    if (totalBuegelSplit !== buegel) {
        buegelErrorMessageDiv.style.display = 'block';  // show the error message div
    } else {
        buegelErrorMessageDiv.style.display = 'none';   // hide the error message div
}

  // Function to update visibility of 'bohrungen-position-div'
    const buegelPositionDiv = document.getElementById("buegel-position-div");
    if (buegel !== 0) {
        buegelPositionDiv.style.display = 'block';
    } else {
        buegelPositionDiv.style.display = 'none';
    }

    let diameterCategory = "";
const diameter = parseInt(bohrungenDurchmesser);

if (diameter >= 6 && diameter <= 18) {
  diameterCategory = "6-18";
} else if (diameter >= 19 && diameter <= 24) {
  diameterCategory = "19-24";
} else if (diameter >= 25 && diameter <= 28) {
  diameterCategory = "25-28";
} else {
  console.error("Invalid diameter value:", diameter);
}

// Calculate the bohrungen price
const bohrungenPricePerHole = parseFloat(pricesData[traegerFormat][diameterCategory]);
const bohrungenPrice = bohrungenPricePerHole * bohrungen;

  // If bohrungen is 0, then all the positions should also be 0
if (bohrungen === 0) {
    bohrungenOberflansch = 0;
    bohrungenSteg = 0;
    bohrungenUnterflansch = 0;
}

  // Validate the bohrungen split
    const totalBohrungenSplit = bohrungenOberflansch + bohrungenSteg + bohrungenUnterflansch;
    const errorMessageDiv = document.getElementById('error-message-div');

    if (totalBohrungenSplit !== bohrungen) {
        errorMessageDiv.style.display = 'block';  // show the error message div
    } else {
        errorMessageDiv.style.display = 'none';   // hide the error message div
}

  // Function to update visibility of 'bohrungen-position-div'
    const bohrungenPositionDiv = document.getElementById("bohrungen-position-div");
    if (bohrungen !== 0) {
        bohrungenPositionDiv.style.display = 'block';
    } else {
        bohrungenPositionDiv.style.display = 'none';
    }
  
  const optionsPrice = stegblechePrice + ausklinkungenPrice + buegelPrice + bohrungenPrice + ankerpratzenPrice;
  
  return optionsPrice
}

function calculateFeuerverzinkungPrice(selectedValues, pricesData) {
  const feuerverzinkungCheckbox = document.getElementById("feuerverzinkung-checkbox");
  if (!feuerverzinkungCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const pricePerKg = parseFloat(pricesData[traegerFormat]["Feuerverzinkung"]);
  const finalWeightInput = document.getElementById("final-weight");
  const finalWeight = parseFloat(finalWeightInput.value);
  const feuerverzinkungPrice = finalWeight * pricePerKg;

  return feuerverzinkungPrice;
}

function calculateVorgrundierungRotPrice(selectedValues, pricesData) {
  const vorgrundierungRotCheckbox = document.getElementById("vorgrundierung-rot-checkbox");
  if (!vorgrundierungRotCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  const vorgrundierungRotPricePerSquareMeter = parseFloat(pricesData[traegerFormat]["Vorgrundierung Rot"]);
  const vorgrundierungRotPrice = finalSurface * vorgrundierungRotPricePerSquareMeter;

  return vorgrundierungRotPrice;
}

function calculateVorgrundierungGrauPrice(selectedValues, pricesData) {
  const vorgrundierungGrauCheckbox = document.getElementById("vorgrundierung-grau-checkbox");
  if (!vorgrundierungGrauCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  const vorgrundierungGrauPricePerSquareMeter = parseFloat(pricesData[traegerFormat]["Vorgrundierung Grau"]);
  const vorgrundierungGrauPrice = finalSurface * vorgrundierungGrauPricePerSquareMeter;

  return vorgrundierungGrauPrice;
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

function calculateKopfplattePrice(kopfplattePricesData, pricesData) {
  // Check if the kopfplatte checkbox is checked
  const kopfplatteCheckbox = document.getElementById("kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }

  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;
  const anschweisen = document.getElementById("kopfplatte-anschweisen").value;
  const bohrungen = parseInt(document.getElementById("kopfplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(document.getElementById("kopfplatte-bohrungen-durchmesser").value, 10);
  const kehlnahtstarke = document.getElementById("kopfplatte-kehlnahtstarke").value;
  const dorne = parseInt(document.getElementById("kopfplatte-dorne").value, 10);

  const steelDensity = 7850; // in kg/m3

  // Calculate size price
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  const sizePrice = weight * parseFloat(kopfplattePricesData["kg"]["default"]);
  
  const baseCuttingPriceKopfplatte = parseFloat(kopfplattePricesData["schneiden"]["default"]);

  // Calculate bohrungen price
  let bohrungenCategory = "";

  if (bohrungenDurchmesser >= 10 && bohrungenDurchmesser <= 18) {
    bohrungenCategory = "10-18";
  } else if (bohrungenDurchmesser >= 19 && bohrungenDurchmesser <= 24) {
  bohrungenCategory = "19-24";
  } else if (bohrungenDurchmesser >= 25 && bohrungenDurchmesser <= 28) {
    bohrungenCategory = "25-28";
  } else {
    console.error("Invalid bohrungenDurchmesser value:", bohrungenDurchmesser);
  }

  const bohrungenPrice = parseFloat(kopfplattePricesData[bohrungenCategory][bohrungenCategory]) * bohrungen;

  // Calculate other option prices
  const selectedValues = getSelectedValues();
  const traegerFormat = selectedValues.traegerFormat;
  const kehlnahtstarkeSelection = document.getElementById('kopfplatte-kehlnahtstarke');
const kehlnahtstarke3mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 3mm"]);
const kehlnahtstarke5mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 5mm"]);
const kehlnahtstarke7mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 7mm"]);

let kehlnahtstarkePrice;

// Update options based on traegerFormat
if (traegerFormat < 160) {
  // Remove the '7 mm' option if it exists
  const option7mm = kehlnahtstarkeSelection.querySelector('option[value="7 mm"]');
  if (option7mm) {
    option7mm.remove();
  }

  // Add '3 mm' and '5 mm' if not already present
  if (!kehlnahtstarkeSelection.querySelector('option[value="3 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('3 mm', '3 mm'));
  }
  if (!kehlnahtstarkeSelection.querySelector('option[value="5 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('5 mm', '5 mm'));
  }

  // Set default selection to '3 mm' if necessary
  if (!kehlnahtstarkeSelection.value) {
    kehlnahtstarkeSelection.value = '3 mm';
  }
} else {
  // Remove the '3 mm' option if it exists
  const option3mm = kehlnahtstarkeSelection.querySelector('option[value="3 mm"]');
  if (option3mm) {
    option3mm.remove();
  }

  // Add '7 mm' if not already present
  if (!kehlnahtstarkeSelection.querySelector('option[value="7 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('7 mm', '7 mm'));
  }

  // Set default selection to '5 mm' if necessary
  if (!kehlnahtstarkeSelection.value) {
    kehlnahtstarkeSelection.value = '5 mm';
  }
}

// Calculate the price based on the selected option
if (kehlnahtstarkeSelection.value === '3 mm') {
  kehlnahtstarkePrice = kehlnahtstarke3mm;
} else if (kehlnahtstarkeSelection.value === '5 mm') {
  kehlnahtstarkePrice = kehlnahtstarke5mm;
} else if (kehlnahtstarkeSelection.value === '7 mm') {
  kehlnahtstarkePrice = kehlnahtstarke7mm;
} else {
  kehlnahtstarkePrice = 0; // default value or handling for other cases
}
  
  const anschweisenPrice = parseFloat(kopfplattePricesData["anschweiben"][anschweisen]);
  const dornePrice = parseFloat(kopfplattePricesData["dorne"][dorne.toString()]);

  const kopfplattePrice = sizePrice + bohrungenPrice + anschweisenPrice + kehlnahtstarkePrice + dornePrice + baseCuttingPriceKopfplatte;
  return kopfplattePrice;
  
}

function calculateKopfplatteWeight(selectedValues, steelDensity) {
    const kopfplatteCheckbox = document.getElementById("kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  return weight;
}  

function calculateKopfplatteSurface(selectedValues) {
  const kopfplatteCheckbox = document.getElementById("kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;
  
  // Calculate total surface area of all sides in square meters
  const surface =
    2 * (lange * breite + lange * dicke + breite * dicke) / 1000000;
  
  return surface;
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

function calculateFusplattePrice(fusplattePricesData, pricesData) {
  // Check if the fusplatte checkbox is checked
  const fusplatteCheckbox = document.getElementById("fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  
  const lange = parseInt(document.getElementById("fusplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("fusplatte-dicke").value, 10) || 0;
  const anschweisen = document.getElementById("fusplatte-anschweisen").value;
  const bohrungen = parseInt(document.getElementById("fusplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(document.getElementById("fusplatte-bohrungen-durchmesser").value, 10);
  const kehlnahtstarke = document.getElementById("fusplatte-kehlnahtstarke").value;

  const steelDensity = 7850; // in kg/m3
  

  // Calculate size price
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg

  const sizePrice = weight * parseFloat(fusplattePricesData["kg"]["default"]);
  
  const baseCuttingPriceFusplatte = parseFloat(fusplattePricesData["schneiden"]["default"]);

  // Calculate bohrungen price
  let bohrungenCategory = "";

  if (bohrungenDurchmesser >= 10 && bohrungenDurchmesser <= 18) {
    bohrungenCategory = "10-18";
  } else if (bohrungenDurchmesser >= 19 && bohrungenDurchmesser <= 24) {
  bohrungenCategory = "19-24";
  } else if (bohrungenDurchmesser >= 25 && bohrungenDurchmesser <= 28) {
    bohrungenCategory = "25-28";
  } else {
    console.error("Invalid bohrungenDurchmesser value:", bohrungenDurchmesser);
  }

  const bohrungenPrice = parseFloat(fusplattePricesData[bohrungenCategory][bohrungenCategory]) * bohrungen;

  // Calculate other option prices
  const selectedValues = getSelectedValues();
  const traegerFormat = selectedValues.traegerFormat;
  const kehlnahtstarkeSelection = document.getElementById('fusplatte-kehlnahtstarke');
const kehlnahtstarke3mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 3mm"]);
const kehlnahtstarke5mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 5mm"]);
const kehlnahtstarke7mm = parseFloat(pricesData[traegerFormat]["Kehlnahtstarke 7mm"]);

let kehlnahtstarkePrice;

// Update options based on traegerFormat
if (traegerFormat < 160) {
  // Remove the '7 mm' option if it exists
  const option7mm = kehlnahtstarkeSelection.querySelector('option[value="7 mm"]');
  if (option7mm) {
    option7mm.remove();
  }

  // Add '3 mm' and '5 mm' if not already present
  if (!kehlnahtstarkeSelection.querySelector('option[value="3 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('3 mm', '3 mm'));
  }
  if (!kehlnahtstarkeSelection.querySelector('option[value="5 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('5 mm', '5 mm'));
  }

  // Set default selection to '3 mm' if necessary
  if (!kehlnahtstarkeSelection.value) {
    kehlnahtstarkeSelection.value = '3 mm';
  }
} else {
  // Remove the '3 mm' option if it exists
  const option3mm = kehlnahtstarkeSelection.querySelector('option[value="3 mm"]');
  if (option3mm) {
    option3mm.remove();
  }

  // Add '7 mm' if not already present
  if (!kehlnahtstarkeSelection.querySelector('option[value="7 mm"]')) {
    kehlnahtstarkeSelection.add(new Option('7 mm', '7 mm'));
  }

  // Set default selection to '5 mm' if necessary
  if (!kehlnahtstarkeSelection.value) {
    kehlnahtstarkeSelection.value = '5 mm';
  }
}

// Calculate the price based on the selected option
if (kehlnahtstarkeSelection.value === '3 mm') {
  kehlnahtstarkePrice = kehlnahtstarke3mm;
} else if (kehlnahtstarkeSelection.value === '5 mm') {
  kehlnahtstarkePrice = kehlnahtstarke5mm;
} else if (kehlnahtstarkeSelection.value === '7 mm') {
  kehlnahtstarkePrice = kehlnahtstarke7mm;
} else {
  kehlnahtstarkePrice = 0; // default value or handling for other cases
}
  
  const anschweisenPrice = parseFloat(fusplattePricesData["anschweiben"][anschweisen]);

  const fusplattePrice = sizePrice + bohrungenPrice + anschweisenPrice + kehlnahtstarkePrice + baseCuttingPriceFusplatte;
  return fusplattePrice;
  
}


function calculatefusplatteWeight(selectedValues, steelDensity) {
    const fusplatteCheckbox = document.getElementById("fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("fusplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("fusplatte-dicke").value, 10) || 0;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  
  return weight;
}

function calculateFusplatteSurface(selectedValues) {
  const fusplatteCheckbox = document.getElementById("fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("fusplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("fusplatte-dicke").value, 10) || 0;

  // Calculate total surface area of all sides in square meters
  const surface = 2 * (lange * breite + lange * dicke + breite * dicke) / 1000000;

  return surface;
}

function calculateTotalPrice(selectedValues, pricesData, traegerMenge, kopfplattePrice, fusplattePrice, finalWeight, finalSurface) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return { totalPrice: 0, feuerverzinkungPrice: 0, vorgrundierungRotPrice: 0, vorgrundierungGrauPrice: 0 };
  }
  const laengePrice = calculateLaengePrice(selectedValues.traegerFormat, parseInt(selectedValues.laenge), pricesData);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
  const feuerverzinkungPrice = calculateFeuerverzinkungPrice(selectedValues, pricesData, finalWeight);
  const vorgrundierungRotPrice = calculateVorgrundierungRotPrice(selectedValues, pricesData, finalSurface);
  const vorgrundierungGrauPrice = calculateVorgrundierungGrauPrice(selectedValues, pricesData, finalSurface);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.traegerFormat]["schneiden"]);
  const totalPrice = Math.round((laengePrice + optionsPrice + baseCuttingPrice + kopfplattePrice + fusplattePrice) + feuerverzinkungPrice + vorgrundierungRotPrice + vorgrundierungGrauPrice);
  
  return { totalPrice, feuerverzinkungPrice, vorgrundierungRotPrice, vorgrundierungGrauPrice };
}


function calculateFinalWeight(selectedValues, pricesData, traegerMenge, steelDensity) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);
  const kopfplatteWeight = calculateKopfplatteWeight(selectedValues, steelDensity);
  const fusplatteWeight = calculatefusplatteWeight(selectedValues, steelDensity);

  const finalWeight = (beamTotalWeight + kopfplatteWeight + fusplatteWeight).toFixed(2);
  
  document.getElementById("final-weight").value = finalWeight;
}

function calculateFinalSurface(selectedValues, traegerMenge, pricesData) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamSurface = calculateBeamSurface(selectedValues, pricesData);
  const kopfplatteSurface = calculateKopfplatteSurface(selectedValues);
  const fusplatteSurface = calculateFusplatteSurface(selectedValues);

  const finalSurface = (beamSurface + kopfplatteSurface + fusplatteSurface).toFixed(2);
  
  document.getElementById("final-surface").value = finalSurface;
}

function updateWarningMessage(laenge, traegerMenge) {
  const warningMessage = document.getElementById("warning-message");

  if (laenge <= 0 || traegerMenge <= 0) {
    warningMessage.style.display = "block";
  } else {
    warningMessage.style.display = "none";
  }
}


function updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice, traegerMenge) {
  const priceWithoutVAT = totalPrice * traegerMenge;
  const priceWithVAT = priceWithoutVAT + (priceWithoutVAT * VAT_RATE);
  const foxyPrice = totalPrice;
  document.getElementById("foxyprice").value = foxyPrice;

  const priceWithVATElem = document.getElementById("price-vat");
  const priceWithoutVATElem = document.getElementById("price-novat");

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


async function updatePrice(pricesData, checkboxChanged = false) {
  const kopfplattePricesDataPromise = fetchKopfplattePrices();
  const fusplattePricesDataPromise = fetchFusplattePrices();

  const kopfplattePricesData = await kopfplattePricesDataPromise;
  const fusplattePricesData = await fusplattePricesDataPromise;

  const totalPriceKopfplatte = calculateKopfplattePrice(kopfplattePricesData, pricesData);
  const totalPriceFusplatte = calculateFusplattePrice(fusplattePricesData, pricesData);

  const selectedValues = getSelectedValues();
  const steelDensity = 7850; // Assuming the steel density is 7850 kg/m³. You can replace it with the appropriate value.
  calculateFinalWeight(selectedValues, pricesData, selectedValues.traegerMenge, steelDensity);
  calculateFinalSurface(selectedValues, selectedValues.traegerMenge, pricesData);
  const totalPriceData = calculateTotalPrice(selectedValues, pricesData, selectedValues.traegerMenge, totalPriceKopfplatte, totalPriceFusplatte);
  const totalPriceHEA = totalPriceData.totalPrice;
  const feuerverzinkungPrice = totalPriceData.feuerverzinkungPrice;
  const vorgrundierungRotPrice = totalPriceData.vorgrundierungRotPrice;
  const vorgrundierungGrauPrice = totalPriceData.vorgrundierungGrauPrice;
  
  const totalPrice = totalPriceHEA;

  const priceWithoutVATElem = document.getElementById("price-novat");
  const priceWithVATElem = document.getElementById("price-vat");

  const oldPriceWithoutVAT = parseFloat(priceWithoutVATElem.textContent.substr(1));
  const oldPriceWithVAT = parseFloat(priceWithVATElem.textContent.substr(1));

  updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice, selectedValues.traegerMenge);
}

function initializePage(pricesData) {
  updatePrice(pricesData);

  document.addEventListener("checkboxChanged", () => {
    updatePrice(pricesData, true);
  });
}

(async () => {
  const pricesData = await fetchPrices();
  initializePage(pricesData);
})();

async function main() {
  const pricesData = await fetchPrices();
  const kopfplattePricesData = await fetchKopfplattePrices();
  const kopfplattePrices = calculateKopfplattePrice(kopfplattePricesData, pricesData);
  const fusplattePricesData = await fetchFusplattePrices();
  const fusplattePrices = calculateFusplattePrice(fusplattePricesData, pricesData);

  document.getElementById("traeger-format").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("laenge").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("stegbleche").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("ausklinkungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("buegel").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("buegel-oberflansch").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("buegel-steg").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("buegel-unterflansch").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-oberflansch").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-steg").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-unterflansch").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("ankerpratzen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("traeger-menge").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("kopfplatte-checkbox").addEventListener("change", () => updatePrice(pricesData, fetchKopfplattePrices(), fetchFusplattePrices()));
  document.getElementById("kopfplatte-lange").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-breite").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-dicke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-anschweisen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-bohrungen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-kehlnahtstarke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("kopfplatte-dorne").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData));
  document.getElementById("fusplatte-checkbox").addEventListener("change", () => updatePrice(pricesData, fetchKopfplattePrices(), fetchFusplattePrices()));
  document.getElementById("fusplatte-lange").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-breite").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-dicke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-anschweisen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-bohrungen").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("fusplatte-kehlnahtstarke").addEventListener("change", () => updatePrice(pricesData, kopfplattePricesData, fusplattePricesData));
  document.getElementById("feuerverzinkung-checkbox").addEventListener("change", () => updatePrice(pricesData));
  document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});



  

  // Add event listeners for other form elements as needed

  updatePrice(pricesData, kopfplattePricesData, fusplattePricesData); // Call once to initialize the price
}

main();
