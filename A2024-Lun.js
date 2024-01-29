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
    const productCode = "hbl-un"; // Replace with the CMS code for the product
    const productName = "L-Profil Ungleichseitig"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/6401aa505499a5c8687df64f/64fae16387be531003a95626_L-U-watermark.png"; // Replace with the CMS image URL for the product
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
  const url = 'https://api.airtable.com/v0/appIIKEo5ExPVPr9I/L-UN';

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
  
  return weight;
}

function calculateBeamSurface(selectedValues, pricesData) {
  const traegerFormat = selectedValues.traegerFormat;
  const laenge = selectedValues.laenge;
  const surfacePerMeter = parseFloat(pricesData[traegerFormat]["m²/m"]);
  const laengeInMeters = laenge / 1000;
  const surface = surfacePerMeter * laengeInMeters;
  
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

  const optionsPrice = bohrungenPrice;
  return optionsPrice;
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

function calculateTotalPrice(selectedValues, pricesData, traegerMenge, finalWeight, finalSurface) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return { totalPrice: 0, feuerverzinkungPrice: 0, vorgrundierungRotPrice: 0, vorgrundierungGrauPrice: 0 };
  }
  const laengePrice = calculateLaengePrice(selectedValues.traegerFormat, parseInt(selectedValues.laenge), pricesData);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
  const feuerverzinkungPrice = calculateFeuerverzinkungPrice(selectedValues, pricesData, finalWeight);
  const vorgrundierungRotPrice = calculateVorgrundierungRotPrice(selectedValues, pricesData, finalSurface);
  const vorgrundierungGrauPrice = calculateVorgrundierungGrauPrice(selectedValues, pricesData, finalSurface);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.traegerFormat]["schneiden"]);
  const totalPrice = Math.round((laengePrice + optionsPrice + baseCuttingPrice) + feuerverzinkungPrice + vorgrundierungRotPrice + vorgrundierungGrauPrice);
  
  return { totalPrice, feuerverzinkungPrice, vorgrundierungRotPrice, vorgrundierungGrauPrice };
}


function calculateFinalWeight(selectedValues, pricesData, traegerMenge, steelDensity) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);

  const finalWeight = beamTotalWeight.toFixed(2);
  
  document.getElementById("final-weight").value = finalWeight;
}

function calculateFinalSurface(selectedValues, traegerMenge, pricesData) {
  if (selectedValues.laenge <= 0 || selectedValues.traegerMenge <= 0) {
    return 0;
  }
  const beamSurface = calculateBeamSurface(selectedValues, pricesData);

  const finalSurface = beamSurface.toFixed(2);
  
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
