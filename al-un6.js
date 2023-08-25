  document.addEventListener('DOMContentLoaded', function () {
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
    const productCode = "hbl-un"; // Replace with the CMS code for the product
    const productName = "L-Profil Ungleichseitig"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/6401aa505499a5c8687df64f/645aa5a0a712e91aa35932c1_L%20Unequal.png"; // Replace with the CMS image URL for the product
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
  const response = await fetch("https://api.airtable.com/v0/appIIKEo5ExPVPr9I/L-UN?api_key=keyLAGDgC4VT8YzLb");
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
  const bohrungenA = parseInt(document.getElementById("bohrungen-a").value, 10);
  const bohrungenDurchmesserA = parseInt(document.getElementById("bohrungen-durchmesser-a").value, 10);
  const bohrungenB = parseInt(document.getElementById("bohrungen-b").value, 10);
  const bohrungenDurchmesserB = parseInt(document.getElementById("bohrungen-durchmesser-b").value, 10);
  const traegerMenge = parseInt(document.getElementById("traeger-menge").value, 10);


  return {
    traegerFormat,
    laenge,
    bohrungenA,
    bohrungenDurchmesserA,
    bohrungenB,
    bohrungenDurchmesserB,
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

function calculateBeamSurface(selectedValues, pricesData) {
  const traegerFormat = selectedValues.traegerFormat;
  const laenge = selectedValues.laenge;
  const surfacePerMeter = parseFloat(pricesData[traegerFormat]["m²/m"]);
  const laengeInMeters = laenge / 1000;
  const surface = surfacePerMeter * laengeInMeters;
  
  console.log("beam surface:", surface);
  
  return surface;
}

function calculateOptionsPrice(selectedValues, pricesData) {
  const {
    traegerFormat,
    laenge,
    bohrungenA,
    bohrungenDurchmesserA,
    bohrungenB,
    bohrungenDurchmesserB,
    traegerMenge,
  } = selectedValues;

    // Calculate bohrungen price
 
  function getBohrungenCategory(diameter) {
    if (diameter >= 6 && diameter <= 18) {
        return "6-18";
    } else if (diameter >= 19 && diameter <= 24) {
        return "19-24";
    } else if (diameter >= 25 && diameter <= 28) {
        return "25-28";
    } else {
        console.error("Invalid bohrungenDurchmesser value:", diameter);
        return null;
    }
}

const bohrungenCategoryA = getBohrungenCategory(bohrungenDurchmesserA);
const bohrungenCategoryB = getBohrungenCategory(bohrungenDurchmesserB);

// Calculate the bohrungen price
const bohrungenPricePerHoleA = parseFloat(pricesData[traegerFormat][bohrungenCategoryA]);
const bohrungenPriceA = bohrungenPricePerHoleA * bohrungenA;

const bohrungenPricePerHoleB = parseFloat(pricesData[traegerFormat][bohrungenCategoryB]);
const bohrungenPriceB = bohrungenPricePerHoleB * bohrungenB;

const bohrungenPrice = bohrungenPriceA + bohrungenPriceB;

console.log("Bohrungen price:", bohrungenPrice);

  const optionsPrice = bohrungenPrice;
  return optionsPrice;
}

function calculateFeuerverzinkungPrice(selectedValues, pricesData) {
  console.log('Function called');
  const feuerverzinkungCheckbox = document.getElementById("feuerverzinkung-checkbox");
  if (!feuerverzinkungCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const pricePerKg = parseFloat(pricesData[traegerFormat]["Feuerverzinkung"]);
  console.log("pricePerKg:", pricePerKg);
  const finalWeightInput = document.getElementById("final-weight");
  const finalWeight = parseFloat(finalWeightInput.value);
  console.log("finalWeightqq:", finalWeight);
  const feuerverzinkungPrice = finalWeight * pricePerKg;
  console.log("feuerverzinkungPrice:", feuerverzinkungPrice);

  return feuerverzinkungPrice;
}

function calculateVorgrundierungRotPrice(selectedValues, pricesData) {
  const vorgrundierungRotCheckbox = document.getElementById("vorgrundierung-rot-checkbox");
  if (!vorgrundierungRotCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  console.log("final-surface-rot:", finalSurface);
  const vorgrundierungRotPricePerSquareMeter = parseFloat(pricesData[traegerFormat]["Vorgrundierung Rot"]);
  console.log("vorgrundierungRotPricePerSquareMeter:", vorgrundierungRotPricePerSquareMeter);
  const vorgrundierungRotPrice = finalSurface * vorgrundierungRotPricePerSquareMeter;
  console.log("vorgrundierungRotPrice:", vorgrundierungRotPrice);

  return vorgrundierungRotPrice;
}

function calculateVorgrundierungGrauPrice(selectedValues, pricesData) {
  const vorgrundierungGrauCheckbox = document.getElementById("vorgrundierung-grau-checkbox");
  if (!vorgrundierungGrauCheckbox.checked) {
    return 0;
  }

  const traegerFormat = selectedValues.traegerFormat;
  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  console.log("final-surface-rot:", finalSurface);
  const vorgrundierungGrauPricePerSquareMeter = parseFloat(pricesData[traegerFormat]["Vorgrundierung Grau"]);
  console.log("vorgrundierungRotPricePerSquareMeter:", vorgrundierungGrauPricePerSquareMeter);
  const vorgrundierungGrauPrice = finalSurface * vorgrundierungGrauPricePerSquareMeter;
  console.log("vorgrundierungGrauPrice:", vorgrundierungGrauPrice);

  return vorgrundierungGrauPrice;
}

function calculateTotalPrice(selectedValues, pricesData, traegerMenge, finalWeight, finalSurface) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return { totalPrice: 0, feuerverzinkungPrice: 0, vorgrundierungRotPrice: 0, vorgrundierungGrauPrice: 0 };
  }
  const laengePrice = calculateLaengePrice(selectedValues.traegerFormat, parseInt(selectedValues.laenge), pricesData);
    console.log("Length price:", laengePrice);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
    console.log("Options price:", optionsPrice);
  const feuerverzinkungPrice = calculateFeuerverzinkungPrice(selectedValues, pricesData, finalWeight);
    console.log("FeuerverzinkungPrice:", feuerverzinkungPrice);
  const vorgrundierungRotPrice = calculateVorgrundierungRotPrice(selectedValues, pricesData, finalSurface);
    console.log("VorgrundierungRot:", vorgrundierungRotPrice);
  const vorgrundierungGrauPrice = calculateVorgrundierungGrauPrice(selectedValues, pricesData, finalSurface);
    console.log("VorgrundierungGrau:", vorgrundierungGrauPrice);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.traegerFormat]["schneiden"]);
    console.log("Base cutting price:", baseCuttingPrice);
  const totalPrice = (laengePrice + optionsPrice + baseCuttingPrice) * traegerMenge + feuerverzinkungPrice + vorgrundierungRotPrice + vorgrundierungGrauPrice;
    console.log("Total price:", totalPrice);
  
  return { totalPrice, feuerverzinkungPrice, vorgrundierungRotPrice, vorgrundierungGrauPrice };
}


function calculateFinalWeight(selectedValues, pricesData, traegerMenge, steelDensity) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);

  const finalWeight = beamTotalWeight * traegerMenge;
  console.log("Final weight:", finalWeight);
  
  document.getElementById("final-weight").value = finalWeight;
}

function calculateFinalSurface(selectedValues, traegerMenge, pricesData) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  console.log("Selected values in calculateFinalSurface:", selectedValues);
  console.log("Prices data in calculateFinalSurface:", pricesData);
  const beamSurface = calculateBeamSurface(selectedValues, pricesData);

  const finalSurface = beamSurface * traegerMenge;
  console.log("Final surface:", finalSurface);
  
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


async function updatePrice(pricesData, checkboxChanged = false) {

  const selectedValues = getSelectedValues();
  const steelDensity = 7850; // Assuming the steel density is 7850 kg/m³. You can replace it with the appropriate value.
  calculateFinalWeight(selectedValues, pricesData, selectedValues.traegerMenge, steelDensity);
  calculateFinalSurface(selectedValues, selectedValues.traegerMenge, pricesData);
  const totalPriceData = calculateTotalPrice(selectedValues, pricesData, selectedValues.traegerMenge);
  const totalPriceHEA = totalPriceData.totalPrice;
  const feuerverzinkungPrice = totalPriceData.feuerverzinkungPrice;
  const vorgrundierungRotPrice = totalPriceData.vorgrundierungRotPrice;
  const vorgrundierungGrauPrice = totalPriceData.vorgrundierungGrauPrice;
  
  const totalPrice = totalPriceHEA;

  const priceWithoutVATElem = document.getElementById("price-novat");
  const priceWithVATElem = document.getElementById("price-vat");

  const oldPriceWithoutVAT = parseFloat(priceWithoutVATElem.textContent.substr(1));
  const oldPriceWithVAT = parseFloat(priceWithVATElem.textContent.substr(1));

  updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice);
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

  document.getElementById("traeger-format").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("laenge").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("traeger-menge").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("feuerverzinkung-checkbox").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-a").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-durchmesser-a").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-b").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("bohrungen-durchmesser-b").addEventListener("change", () => updatePrice(pricesData));
  document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});



  

  // Add event listeners for other form elements as needed

  updatePrice(pricesData); // Call once to initialize the price
}

main();
