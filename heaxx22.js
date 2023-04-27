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
    const productCode = "hbhea"; // Replace with the CMS code for the product
    const productName = "HEA Stahlträger"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/640b1549e240298094f4ece2/641878d601c9aed8812112d2_Hea.png"; // Replace with the CMS image URL for the product
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
      price: parseFloat(document.getElementById("foxyprice").value),
      Optionen: optionsPlainString,
      URL: window.location.href, // Add the current product URL as a separate attribute
      Länge: parseFloat(document.getElementById("laenge").value),
      image: productData.imageUrl,
      category: productData.category,
      weight: parseFloat(document.getElementById("final-weight").value),
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
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/HEA?api_key=keyLAGDgC4VT8YzLb");
  const data = await response.json();
  const records = data.records;
  const prices = {};

  records.forEach((record) => {
    prices[record.fields["traeger format"]] = record.fields;
  });

  return prices;
}

function getSelectedValues() {
  const traegerFormat = document.getElementById("traeger-format").value;
  const laenge = parseFloat(document.getElementById("laenge").value);
  const heaStegbleche = parseInt(document.getElementById("hea-stegbleche").value, 10);
  const heaAusklinkungen = parseInt(document.getElementById("hea-ausklinkungen").value, 10);
  const heaBugel = parseInt(document.getElementById("hea-bugel").value, 10);
  const heaBohrungen = parseInt(document.getElementById("hea-bohrungen").value, 10);
  const heaBohrungenDurchmesser = parseInt(document.getElementById("hea-bohrungen-durchmesser").value, 10);
  const heaWeiteres = document.getElementById("hea-weiteres").value;
  const beamMenge = parseInt(document.getElementById("beam-menge").value, 10);


  return {
    traegerFormat,
    laenge,
    heaStegbleche,
    heaAusklinkungen,
    heaBugel,
    heaBohrungen,
    heaBohrungenDurchmesser,
    heaWeiteres,
    beamMenge,
  };
}

function calculateLaengePrice(traegerFormat, laenge, pricesData) {
  if (!pricesData.hasOwnProperty(traegerFormat)) {
    console.error("HEA size not found in prices data:", traegerFormat);
    return 0;
  }

  const kgPerMeter = parseFloat(pricesData[traegerFormat]["kg/m"]);
  const laengeInMeters = laenge / 1000;
  const weight = kgPerMeter * beamLaengeInMeters;
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
  console.log('Beam Llaenge:', laengeh);
  console.log('kg/m:', kgPerMeter);
  console.log('Beam Length in Meters:', laengeInMeters);
  console.log('Weight:', weight);
  
  return weight;
}

function calculateOptionsPrice(selectedValues, pricesData) {
  const {
    traegerFormat,
    heaStegbleche,
    heaAusklinkungen,
    heaBugel,
    heaWeiteres,
    heaBohrungen,
    heaBohrungenDurchmesser,
    beamMenge,
  } = selectedValues;

  const stegblechePrice = parseFloat(pricesData[traegerFormat]["stegbleche"]) * heaStegbleche;
  const ausklinkungenPrice = parseFloat(pricesData[traegerFormat]["ausklinkungen"]) * heaAusklinkungen;
  const bugelPrice = parseFloat(pricesData[traegerFormat]["bugel"]) * heaBugel;

  // Extract the price for the selected "hea-weiteres" option from the respective column in the table
  const weiteresOption = document.getElementById("hea-weiteres").value;
  const weiteresPrice = parseFloat(pricesData[traegerFormat][weiteresOption]);

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
const bohrungenPricePerHole = parseFloat(pricesData[traegerFormat][diameterCategory]);
const bohrungenPrice = bohrungenPricePerHole * heaBohrungen;

console.log("Bohrungen price:", bohrungenPrice);

  console.log("Stegbleche price:", stegblechePrice);
  console.log("Ausklinkungen price:", ausklinkungenPrice);
  console.log("Bugel price:", bugelPrice);
  console.log("Weiteres price:", weiteresPrice);

  const optionsPrice = stegblechePrice + ausklinkungenPrice + bugelPrice + weiteresPrice + bohrungenPrice;
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
    const kopfplatteCheckbox = document.getElementById("kopfplatte-checkbox");
  if (!kopfplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;
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
    const fusplatteCheckbox = document.getElementById("fusplatte-checkbox");
  if (!fusplatteCheckbox.checked) {
    return 0;
  }
  const lange = parseInt(document.getElementById("fusplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("fusplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("fusplatte-dicke").value, 10) || 0;
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

function calculateTotalPrice(selectedValues, pricesData, beamMenge, kopfplattePrice, fusplattePrice) {
  if (selectedValues.laenge <= 0 || selectedValues.beamMenge <= 0) {
    return 0;
  }
  const laengePrice = calculateLaengePrice(selectedValues.traegerFormat, parseInt(selectedValues.laenge), pricesData);
    console.log("Length price:", laengePrice);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
    console.log("Options price:", optionsPrice);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.traegerFormat]["schneiden"]);
    console.log("Base cutting price:", baseCuttingPrice);
  const totalPrice = (laengePrice + optionsPrice + baseCuttingPrice + kopfplattePrice + fusplattePrice) * beamMenge;
    console.log("Total price:", totalPrice);
  return totalPrice;
}

function calculateFinalWeight(selectedValues, pricesData, beamMenge, steelDensity) {
  if (selectedValues.laenge <= 0 || selectedValues.beamMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);
  const kopfplatteWeight = calculateKopfplatteWeight(selectedValues, steelDensity);
  const fusplatteWeight = calculatefusplatteWeight(selectedValues, steelDensity);

  const finalWeight = (beamTotalWeight + kopfplatteWeight + fusplatteWeight) * beamMenge;
  console.log("Final weight:", finalWeight);
  
  document.getElementById("final-weight").value = finalWeight;
}


function updateWarningMessage(laenge, beamMenge) {
  const warningMessage = document.getElementById("warning-message");

  if (laenge <= 0 || beamMenge <= 0) {
    warningMessage.style.display = "block";
  } else {
    warningMessage.style.display = "none";
  }
}


function updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice) {
  const priceWithoutVAT = totalPrice;
  const priceWithVAT = totalPrice * (1 + VAT_RATE);
  document.getElementById("foxyprice").value = priceWithVAT.toFixed(2);

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


async function updatePrice(pricesData) {
  const kopfplattePricesDataPromise = fetchKopfplattePrices();
  const fusplattePricesDataPromise = fetchFusplattePrices();

  const kopfplattePricesData = await kopfplattePricesDataPromise;
  const fusplattePricesData = await fusplattePricesDataPromise;

  const totalPriceKopfplatte = calculateKopfplattePrice(kopfplattePricesData);
  const totalPriceFusplatte = calculateFusplattePrice(fusplattePricesData);

  const selectedValues = getSelectedValues();
  const totalPriceHEA = calculateTotalPrice(selectedValues, pricesData, selectedValues.beamMenge, totalPriceKopfplatte, totalPriceFusplatte);
  
  const steelDensity = 7850; // Assuming the steel density is 7850 kg/m³. You can replace it with the appropriate value.
  calculateFinalWeight(selectedValues, pricesData, selectedValues.beamMenge, steelDensity);
  
  const totalPrice = totalPriceHEA;

  const priceWithoutVATElem = document.getElementById("price-novat");
  const priceWithVATElem = document.getElementById("price-vat");

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

  document.getElementById("traeger-format").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("laenge").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-stegbleche").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-ausklinkungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bugel").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-weiteres").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bohrungen").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("hea-bohrungen-durchmesser").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("beam-menge").addEventListener("input", () => updatePrice(pricesData));
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

  

  // Add event listeners for other form elements as needed

  updatePrice(pricesData, kopfplattePricesData, fusplattePricesData); // Call once to initialize the price
}

main();
