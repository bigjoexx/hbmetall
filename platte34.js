document.addEventListener('DOMContentLoaded', function () {
  // Removed laengeInput related code
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
    const productCode = "hbplatte"; // Replace with the CMS code for the product
    const productName = "‍Montageplatte"; // Replace with the CMS name for the product
    const imageUrl = "https://uploads-ssl.webflow.com/6401aa505499a5c8687df64f/645aa59f5e5a7082cf58f3a2_placa.png"; // Replace with the CMS image URL for the product
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

function calculateKopfplattePrice(kopfplattePricesData, steelDensity) {
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;
  const bohrungen = parseInt(document.getElementById("kopfplatte-bohrungen").value, 10);
  const bohrungenDurchmesser = parseInt(document.getElementById("kopfplatte-bohrungen-durchmesser").value, 10);

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

  const kopfplattePrice = sizePrice + bohrungenPrice + baseCuttingPriceKopfplatte;
  return kopfplattePrice;
  console.log("kopfplattePrice:", kopfplattePrice);
  
}

function calculateFinalWeight(kopfplattePricesData, traegerMenge, steelDensity) {
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;

  if (lange <= 0 || traegerMenge <= 0) {
    return 0;
  }

  const kopfplatteWeight = calculateKopfplatteWeight(lange, breite, dicke, steelDensity);

  const finalWeight = kopfplatteWeight * traegerMenge;
  console.log("Final weight:", finalWeight);

  document.getElementById("final-weight").value = finalWeight;
}

function calculateKopfplatteWeight(lange, breite, dicke, steelDensity) {
  console.log('Function called');
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  console.log("volume:", volume);
  console.log("lange:", lange);
  console.log("breite:", breite);
  console.log("dicke:", dicke);
  
  console.log("kopfplatteWeight:", weight);

  return weight;
}

function calculateFinalSurface(traegerMenge, kopfplattePricesData) {
  const lange = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0;
  const breite = parseInt(document.getElementById("kopfplatte-breite").value, 10) || 0;
  const dicke = parseInt(document.getElementById("kopfplatte-dicke").value, 10) || 0;

  if (lange <= 0 || traegerMenge <= 0) {
    return 0;
  }

  const kopfplatteSurface = calculateKopfplatteSurface(lange, breite, dicke);

  const finalSurface = kopfplatteSurface * traegerMenge;
  console.log("Final surface:", finalSurface);

  document.getElementById("final-surface").value = finalSurface;
}

function calculateKopfplatteSurface(lange, breite, dicke) {
  const surface = lange * breite / 1000000; // Convert to m2
  return surface;
}

function calculateFeuerverzinkungPrice(kopfplattePricesData, steelDensity) {
  console.log('Function called');
  const feuerverzinkungCheckbox = document.getElementById("feuerverzinkung-checkbox");
  if (!feuerverzinkungCheckbox.checked) {
    return 0;
  }
  
  const pricePerKg = parseFloat(kopfplattePricesData["Feuerverzinkung"]["default"]);
  console.log("pricePerKg:", pricePerKg);
  const finalWeightInput = document.getElementById("final-weight");
  const finalWeight = parseFloat(finalWeightInput.value);
  console.log("finalWeightqq:", finalWeight);
  const feuerverzinkungPrice = finalWeight * pricePerKg;
  console.log("feuerverzinkungPrice:", feuerverzinkungPrice);

  return feuerverzinkungPrice;
}

function calculateVorgrundierungRotPrice(kopfplattePricesData, steelDensity) {
  const vorgrundierungRotCheckbox = document.getElementById("vorgrundierung-rot-checkbox");
  if (!vorgrundierungRotCheckbox.checked) {
    return 0;
  }

  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  console.log("final-surface-rot:", finalSurface);
  const vorgrundierungRotPricePerSquareMeter = parseFloat(kopfplattePricesData["Vorgrundierung Rot"]["default"]);
  console.log("vorgrundierungRotPricePerSquareMeter:", vorgrundierungRotPricePerSquareMeter);
  const vorgrundierungRotPrice = finalSurface * vorgrundierungRotPricePerSquareMeter;
  console.log("vorgrundierungRotPrice:", vorgrundierungRotPrice);

  return vorgrundierungRotPrice;
}

function calculateVorgrundierungGrauPrice(kopfplattePricesData, steelDensity) {
  const vorgrundierungGrauCheckbox = document.getElementById("vorgrundierung-grau-checkbox");
  if (!vorgrundierungGrauCheckbox.checked) {
    return 0;
  }
  
  const finalSurface = parseFloat(document.getElementById("final-surface").value);
  console.log("final-surface-rot:", finalSurface);
  const vorgrundierungGrauPricePerSquareMeter = parseFloat(kopfplattePricesData["Vorgrundierung Grau"]["default"]);
  console.log("vorgrundierungRotPricePerSquareMeter:", vorgrundierungGrauPricePerSquareMeter);
  const vorgrundierungGrauPrice = finalSurface * vorgrundierungGrauPricePerSquareMeter;
  console.log("vorgrundierungGrauPrice:", vorgrundierungGrauPrice);

  return vorgrundierungGrauPrice;
}

function calculateTotalPrice(kopfplattePricesData, traegerMenge, laenge, steelDensity, finalWeight, finalSurface) {
    if (laenge <= 0 || traegerMenge <= 0) {
    return { totalPrice: 0, feuerverzinkungPrice: 0, vorgrundierungRotPrice: 0, vorgrundierungGrauPrice: 0 };
  }
  const kopfplattePrice = calculateKopfplattePrice(kopfplattePricesData, steelDensity); // Include steelDensity
  console.log("kopfplattePrice:", kopfplattePrice);
  const feuerverzinkungPrice = calculateFeuerverzinkungPrice(kopfplattePricesData, finalWeight);
  console.log("feuerverzinkungPrice:", feuerverzinkungPrice);
  const vorgrundierungRotPrice = calculateVorgrundierungRotPrice(kopfplattePricesData, finalSurface);
  console.log("vorgrundierungRotPrice:", vorgrundierungRotPrice);
  const vorgrundierungGrauPrice = calculateVorgrundierungGrauPrice(kopfplattePricesData, finalSurface);
  console.log("vorgrundierungGrauPrice:", vorgrundierungGrauPrice);

  const totalPrice = kopfplattePrice * traegerMenge + feuerverzinkungPrice + vorgrundierungRotPrice + vorgrundierungGrauPrice;
  console.log("traegerMenge:", traegerMenge);
  console.log("Total price:", totalPrice);

  return {
    totalPrice,
    feuerverzinkungPrice,
    vorgrundierungRotPrice,
    vorgrundierungGrauPrice
  };
}

function updateRequiredFields() {
  const numHoles = document.getElementById("kopfplatte-bohrungen").value;
  const distanceField = document.getElementById("platte-abstand");

  if ([1, 2, 3, 4].includes(parseInt(numHoles))) {
    distanceField.required = true;
  } else {
    distanceField.required = false;
  }
}

function updateWarningMessageAbstand(abstand) {
  const warningMessage = document.getElementById("warning-message-2");

  if (abstand <= 0) {
    warningMessage.style.display = "block";
  } else {
    warningMessage.style.display = "none";
  }
}



function updateWarningMessage(lange, traegerMenge) {
  const warningMessage = document.getElementById("warning-message");

  if (lange <= 0 || traegerMenge <= 0) {
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
                            
async function updatePrice(steelDensity, checkboxChanged = false) {
  const kopfplattePricesDataPromise = fetchKopfplattePrices();

  const kopfplattePricesData = await kopfplattePricesDataPromise;

  const traegerMenge = parseInt(document.getElementById("traeger-menge").value, 10) || 0;
  const laenge = parseInt(document.getElementById("kopfplatte-lange").value, 10) || 0; // Add this line to get the value of laenge
  const totalPriceKopfplatte = calculateKopfplattePrice(kopfplattePricesData, steelDensity);

  calculateFinalWeight(kopfplattePricesData, traegerMenge, steelDensity);
  calculateFinalSurface(traegerMenge, kopfplattePricesData);

  const totalPriceData = calculateTotalPrice(kopfplattePricesData, traegerMenge, laenge, steelDensity); // Pass laenge to the function
  const totalPrice = totalPriceData.totalPrice;
  const feuerverzinkungPrice = totalPriceData.feuerverzinkungPrice;
  const vorgrundierungRotPrice = totalPriceData.vorgrundierungRotPrice;
  const vorgrundierungGrauPrice = totalPriceData.vorgrundierungGrauPrice;

  const priceWithoutVATElem = document.getElementById("price-novat");
  const priceWithVATElem = document.getElementById("price-vat");

  const oldPriceWithoutVAT = parseFloat(priceWithoutVATElem.textContent.substr(1));
  const oldPriceWithVAT = parseFloat(priceWithVATElem.textContent.substr(1));

  updateDisplayedPrices(oldPriceWithoutVAT, oldPriceWithVAT, totalPrice);
}


function initializePage(kopfplattePricesData) {
  updatePrice(kopfplattePricesData);

  document.addEventListener("checkboxChanged", () => {
    updatePrice(kopfplattePricesData, true);
  });
}

async function main() {
  const steelDensity = 7850;
  const kopfplattePricesData = await fetchKopfplattePrices();
  const kopfplattePrices = calculateKopfplattePrice(kopfplattePricesData);
  
    // Update required fields initially
  updateRequiredFields();

  document.getElementById("traeger-menge").addEventListener("input", () => updatePrice(steelDensity, kopfplattePricesData));
  document.getElementById("kopfplatte-lange").addEventListener("change", () => updatePrice(steelDensity, kopfplattePricesData));
  document.getElementById("kopfplatte-breite").addEventListener("change", () => updatePrice(steelDensity, kopfplattePricesData));
  document.getElementById("kopfplatte-dicke").addEventListener("change", () => updatePrice(steelDensity, kopfplattePricesData));
    document.getElementById("kopfplatte-bohrungen").addEventListener("change", () => {
    updatePrice(steelDensity, kopfplattePricesData);
    updateRequiredFields(); // Call function when numHoles changes
  });
  document.getElementById("kopfplatte-bohrungen-durchmesser").addEventListener("change", () => updatePrice(steelDensity, kopfplattePricesData));
  document.getElementById("feuerverzinkung-checkbox").addEventListener("change", () => {
  updatePrice(steelDensity, kopfplattePricesData, true);
});
  document.getElementById("vorgrundierung-rot-checkbox").addEventListener("change", () => {
  updatePrice(steelDensity, kopfplattePricesData, true);
});
  document.getElementById("vorgrundierung-grau-checkbox").addEventListener("change", () => {
  updatePrice(steelDensity, kopfplattePricesData, true);
});
  document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});
  

  const abstandField = document.getElementById("platte-abstand");

// Add event listener for 'Abstand' field
  abstandField.addEventListener("change", () => {
    const abstand = parseInt(abstandField.value, 10) || 0;
    updateWarningMessageAbstand(abstand);
  });
  

  // Add event listeners for other form elements as needed
  
      // Call the function to set required fields after price calculations
  updateRequiredFields();

  updatePrice(steelDensity, kopfplattePricesData); // Call once to initialize the price
}


main();
