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
  const weight = kgPerMeter * beamLengthInMeters;
  const pricePerKg = parseFloat(pricesData[heaSize]["kg"]);
  const lengthPrice = weight * pricePerKg;

  return lengthPrice;
}

function calculateBeamTotalWeight(selectedValues, pricesData) {
  const heaSize = selectedValues.heaSize;
  const beamLength = selectedValues.beamLength;
  const kgPerMeter = parseFloat(pricesData[heaSize]["kg/m"]);
  const beamLengthInMeters = beamLength / 1000;
  const weight = kgPerMeter * beamLengthInMeters;
  return weight;
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
  
  function calculateKopfplatteWeight(selectedValues, steelDensity) {
  const lange = selectedValues.kopfplatteLange;
  const breite = selectedValues.kopfplatteBreite;
  const dicke = selectedValues.kopfplatteDicke;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  return weight;
}

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
  
  function calculatefusplatteWeight(selectedValues, steelDensity) {
  const lange = selectedValues.fusplatteLange;
  const breite = selectedValues.fusplatteBreite;
  const dicke = selectedValues.fusplatteDicke;
  const volume = lange * breite * dicke / 1000000000; // Convert to m3
  const weight = volume * steelDensity; // Weight in kg
  return weight;
}
  
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



function calculateTotalPrice(selectedValues, pricesData, beamMenge, kopfplattePrice, fusplattePrice) {
  if (selectedValues.beamLength <= 0 || selectedValues.beamMenge <= 0) {
    return 0;
  }
  const lengthPrice = calculateLengthPrice(selectedValues.heaSize, parseInt(selectedValues.beamLength), pricesData);
    console.log("Length price:", lengthPrice);
  const optionsPrice = calculateOptionsPrice(selectedValues, pricesData);
    console.log("Options price:", optionsPrice);
  const baseCuttingPrice = parseFloat(pricesData[selectedValues.heaSize]["schneiden"]);
    console.log("Base cutting price:", baseCuttingPrice);
  const totalPrice = (lengthPrice + optionsPrice + baseCuttingPrice + kopfplattePrice + fusplattePrice) * beamMenge;
    console.log("Total price:", totalPrice);
  return totalPrice;
}

function calculateFinalWeight(selectedValues, pricesData, beamMenge, steelDensity) {
  if (selectedValues.beamLength <= 0 || selectedValues.beamMenge <= 0) {
    return 0;
  }
  const beamTotalWeight = calculateBeamTotalWeight(selectedValues, pricesData);
  const kopfplatteWeight = calculateKopfplatteWeight(selectedValues, steelDensity);
  const fusplatteWeight = calculatefusplatteWeight(selectedValues, steelDensity);

  const finalWeight = (beamTotalWeight + kopfplatteWeight + fusplatteWeight) * beamMenge;
  console.log("Final weight:", finalWeight);
}


function updateWarningMessage(beamLength, beamMenge) {
  const warningMessage = document.getElementById("warning-message");

  if (beamLength <= 0 || beamMenge <= 0) {
    warningMessage.style.display = "block";
  } else {
    warningMessage.style.display = "none";
  }
}


function setDefaultValues() {
  const beamLengthInput = document.getElementById("beam-length");
  if (beamLengthInput) {
    beamLengthInput.value = 1000;
    beamLengthInput.addEventListener("input", () => {
      if (beamLengthInput.value === "" || parseFloat(beamLengthInput.value) < 0) {
        beamLengthInput.value = 0;
      }
      updateWarningMessage(parseFloat(beamLengthInput.value), parseFloat(beamMengeInput.value));
    });
  }
  
  const beamMengeInput = document.getElementById("beam-menge");
  if (beamMengeInput) {
    beamMengeInput.value = 1;
    beamMengeInput.addEventListener("input", () => {
      if (beamMengeInput.value === "" || parseFloat(beamMengeInput.value) < 0) {
        beamMengeInput.value = 0;
      }
      updateWarningMessage(parseFloat(beamLengthInput.value), parseFloat(beamMengeInput.value));
    });
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

  document.getElementById("hea-size").addEventListener("change", () => updatePrice(pricesData));
  document.getElementById("beam-length").addEventListener("change", () => updatePrice(pricesData));
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

  setDefaultValues();
  updatePrice(pricesData, kopfplattePricesData, fusplattePricesData); // Call once to initialize the price
}

main();
