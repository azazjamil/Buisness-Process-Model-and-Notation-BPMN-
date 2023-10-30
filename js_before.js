const hamburger = document.querySelector(".burgerIcon");
const page = document.querySelector("body");
const close = document.querySelector(".cross");
const sideBar = document.querySelector(".sidebar-content");
const copyButton = document.querySelector("#copy-button");
const symbols = document.querySelector("#bpmnSymbols defs");

let sequenceArray = [];
let flowComplete = false;
let pass = true;
let auto_sequence_flag = true;
const delay = 4;
let timeLeft = delay;
let timer = document.getElementById("timeLeft");
let userId = generateUniqueChannelId();
let initiater = userId;
let currentSequence = 0;
let processing = false; // Flag to indicate if message processing is in progress

close.addEventListener("click", (e) => {
  e.preventDefault();
  page.classList.toggle("sidebarshow");
  page.classList.toggle("sidebarhide");
});
// Initialize PubNub client
const pubnub = new PubNub({
  publishKey: "pub-c-6eff84b7-2a87-4fc4-b179-b6a446cfd56a",
  subscribeKey: "sub-c-f1f7d84f-4054-4ad0-b021-ee4be410f80f",
  userId: userId,
});
const currentURL = window.location.href;
const url = new URL(currentURL);
const searchParams = new URLSearchParams(url.search);
const channel = searchParams.get("channelid");
//
let tilebackgroundColor1,
  tilebackgroundColor2,
  current,
  startKey,
  startkeyDeploy;
//
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tabs");
  M.Tabs.init(tabs);
});
const contentPanels = document.querySelectorAll(".content-panel");
const tabLinks = document.querySelectorAll(".tabs a");
for (const link of tabLinks) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetPanelId = event.target.getAttribute("href");
    for (const panel of contentPanels) {
      panel.classList.remove("is-active");
    }
    const targetPanel = document.querySelector(targetPanelId);
    targetPanel.classList.add("is-active");
  });
}
const activateButton = document.querySelector("#ACTIVATE");
activateButton.addEventListener("click", activateButtonHandler);
let copyCurrentParsed;
let channelId;
var slide_count = 1;
var count = 0;
var joinArray = []; //For ANDJOIN
var cellArray = []; // FOR XORJOIN
var firstMessage;
let messageQueue = [];

function activateButtonHandler() {
  document.querySelector(".sidebar-content").innerHTML = "";
  channelId = generateUniqueChannelId();
  var btnDiv = document.querySelector("#loop #btn-div-0");
  while (btnDiv.firstChild) {
    btnDiv.firstChild.remove();
  }
  btnDiv.classList.remove("slick-initialized", "slick-slider");
  const btn1 = `<button class="btn center-align" title="a" id="b_one"
                            style="background-color: green; display: true; width: 300px; margin:5px">R</button>`;
  const btn2 = `<button class="btn center-align" title="a" id="b_two"
                            style="background-color: red; display: true; width: 300px;margin:5px">R</button>`;
  const btn3 = `<button class="btn center-align" title="a" id="b_three"
                            style="background-color: blue; display: true; width: 300px;margin:5px">R</button>`;

  btnDiv.innerHTML = btn1;
  btnDiv.innerHTML += btn2;
  btnDiv.innerHTML += btn3;
  b_one.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep1, o_nextStepObject1, o_currentStep);
  });
  b_two.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep2, o_nextStepObject2, o_currentStep);
  });
  b_three.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep3, o_nextStepObject3, o_currentStep);
  });
  const jsonInput = document.querySelector("#json-input").value;
  try {
    const jsonParsed = JSON.parse(jsonInput);
    const jsonOutput = JSON.stringify(jsonParsed, null, 2);
    const jsonOutputTextarea = document.querySelector("#json-output");
    jsonOutputTextarea.value = jsonOutput;
    const processName = jsonParsed.process.info.name;
    const processNameHeaders = document.querySelectorAll("#Process-Name");
    processNameHeaders.forEach((header) => {
      header.textContent = processName;
    });
    const processSettings = jsonParsed.process.settings;
    const browserTitleInput = document.querySelector("#browser-title");
    const titleBarTitleInput = document.querySelector("#title-bar-title");
    const logoUrlInput = document.querySelector("#logo-url");
    const tileSizeInput = document.querySelector("#tileSize");
    const tilebackgroundColor1Input = document.querySelector(
      "#tilebackgroundColor1"
    );
    const tilebackgroundColor2Input = document.querySelector(
      "#tilebackgroundColor2"
    );
    browserTitle.textContent = processSettings.browserTitle; //Update Layout
    titleBarTitle.textContent = processSettings.titleBarTitle;
    navLogo.src = processSettings.logoUrl;
    browserTitleInput.value = processSettings.browserTitle; //Update Settings
    titleBarTitleInput.value = processSettings.titleBarTitle;
    logoUrlInput.value = processSettings.logoUrl;
    tileSizeInput.value = processSettings.tileSize;
    tilebackgroundColor1Input.value = processSettings.tilebackgroundColor1;
    tilebackgroundColor2Input.value = processSettings.tilebackgroundColor2;
    const rows = parseInt(jsonParsed.process.info.rows);
    const cols = parseInt(jsonParsed.process.info.cols);
    current = jsonParsed; // <<<  "new" replaced by "deployed"
    tilesize = parseInt(tileSizeInput.value);
    generateTable(
      "bpmnCanvas",
      rows,
      cols,
      tilesize,
      current.process.settings.tilebackgroundColor1,
      current.process.settings.tilebackgroundColor2,
      "canvasRoot1"
    );
    lastEdit = "erased"; // CLEAN-UP
    fieldOfInputs.style.display = "none"; // CLEAN-UP
    undoArray.length = 0; // CLEAN-UP
    redoArray.length = 0; // CLEAN-UP
    drawProcess(current, "bpmnCanvas", true);
    const procNme = document.querySelector("#processName");
    procNme.value = current.process.info.name;
    const fontSize = document.querySelector("#fontSize");
    fontSize.value = current.process.settings.fontSize;
    const toggleSwitchSymbolTypeOnOff = document.querySelector(
      "#toggleSwitchSymbolTypeOnOff"
    );
    toggleSwitchSymbolTypeOnOff.value = current.process.settings.verbose;
    // on input change
    const copyCurrent = JSON.stringify(current, null, 2);
    copyCurrentParsed = JSON.parse(copyCurrent);
    createAndDrawBPMNTable(copyCurrentParsed, "bpmnStatus", "canvasRoot0"); //  <<< A second view created for RUN page
    const stringifycopyCurrentParsed = JSON.stringify(
      copyCurrentParsed,
      null,
      2
    );
    current = JSON.parse(stringifycopyCurrentParsed);
    if (current.process.info.version !== "dummy") {
      o_startKey = findStartKey(current.process.sequence);
      o_currentStepObjectBPMN = current.process.sequence[o_startKey];
      o_currentStep = o_startKey;
      o_currentStepObject = current.process.sequence[o_startKey];
      document.getElementById("callToAction").innerHTML =
        current.process.sequence[o_startKey].task;
      o_nxtStep1 = nextStep(o_currentStep, o_currentStepObject, "-");
      o_nextStepObject1 = current.process.sequence[o_nxtStep1];
      addCellOutline("bpmnStatus", o_startKey, "1px solid red", o_currentStep);
      const b_one = document.getElementById("b_one");
      b_one.disabled = false;
      b_one.dataset.nextStep = o_nxtStep1;
      b_one.textContent = current.process.sequence[o_startKey].task;
      b_one.title =
        o_currentStepObject1.BPMN + ": " + o_startKey + " -> " + o_nxtStep1;
      const now = new Date();
      const dateTimeString = now
        .toLocaleString("en-GB", {
          timeZone: "UTC",
        })
        .replace(",", "");
      document.getElementById("b_one").disabled = false;
    } else {
      document.getElementById("b_one").disabled = true;
      b_one.textContent = "dummy Version: Will not run";
    }
  } catch (e) {}
}

function generateUniqueChannelId() {
  // Logic to generate a unique channel ID
  const randomId = Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
  const num = Math.floor(Math.random() * Date.now()).toString(16);
  return randomId + num; // Concatenate the timestamp and random string
}

function sideBarContent(message) {
  const dateTime = message.dateTimeString.split(" ");
  const date = dateTime[0];
  const data = encodeURIComponent(JSON.stringify(message));
  if (message.task && message.task !== "") {
    let template = `																												
<div style="text-align:left;font-size:12px;">${date}</div>
	<div style="text-align:center;font-weight:bold">${message.task}</div>    
 `;
    const div = document.createElement("div");
    div.classList.add("message-content");
    div.setAttribute("data-message", data);
    listner(div);
    div.innerHTML = template;
    document.querySelector(".sidebar-content").appendChild(div);
  } else {
    let template = `<div style="text-align:left;font-size:12px;">${date}</div>
		<div style="text-align:center;font-weight:bold">${message.BPMN}</div>`;
    const div = document.createElement("div");
    div.classList.add("message-content");
    div.setAttribute("data-message", data);
    listner(div);
    div.innerHTML = template;
    document.querySelector(".sidebar-content").appendChild(div);
  }
  sideBarScroll();
}
// Add event listener to each message-content element
const listner = (x) => {
  x.addEventListener("click", () => {
    const data = JSON.parse(decodeURIComponent(x.getAttribute("data-message")));
    // Open the modal and display the data
    openModalWithData(data);
  });
};

function openModalWithData(data) {
  // Create the modal element
  const modal = document.createElement("div");
  modal.classList.add("modal");
  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  let row = `
            
																																															
																																															
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											
																																											<div class="modal-row">
																																												<div class="modal-property">Date Time</div>
																																												<div class="modal-value">${data.dateTimeString}</div>
																																											</div>
																																											<div class="modal-row">
																																												<div class="modal-property">Process Name</div>
																																												<div class="modal-value">${data.processInfoName}</div>
																																											</div>
																																											<div class="modal-row">
																																												<div class="modal-property">BPMN</div>
																																												<div class="modal-value">${data.BPMN}</div>
																																											</div>
																																											<div class="modal-row">
																																												<div class="modal-property">Task</div>
																																												<div class="modal-value">${data.task ? data.task : "-"}</div>
																																											</div>
																																											<div class="modal-row">
																																												<div class="modal-property">Current Step</div>
																																												<div class="modal-value">${data.nextStep}</div>
																																											</div>
																																											<div class="modal-row">
																																												<div class="modal-property">Previous Step</div>
																																												<div class="modal-value">${data.previousStep}</div>
																																											</div>
            `;
  // Append the row to the modal content
  modalContent.innerHTML = row;
  // Append the modal content to the modal element
  modal.appendChild(modalContent);
  // Append the modal to the document body
  document.body.appendChild(modal);
  // Close the modal when clicking outside the content area
  modal.addEventListener("click", (event) => {
    if (!modalContent.contains(event.target)) {
      modal.remove();
    }
  });
}
//
//fetch BPMN examples from airtable
//
async function getBPMNModel(recordId) {
  const url = `https://api.airtable.com/v0/appW7fUkTEqqte9Jc/Processes/${recordId}`;
  const token =
    "pattD534tvX2bmTI0.9c945deed478270bcc8ebf3778f1eacbfabf06c9854e83be3fd6aa7bb5a8c47e";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  const processModelString = data.fields.processModel;
  const processModelObject = JSON.parse(processModelString);
  return processModelObject; // Return the fetched JSON object
}
var buttonId;
//
const exampleSButton = document.querySelector("#EXAMPLE-S");
exampleSButton.addEventListener("click", function () {
  buttonId = "EXAMPLE-S";
  const recordId = "recZC431zgZ1Qsd2m"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleMButton = document.querySelector("#EXAMPLE-M");
exampleMButton.addEventListener("click", function () {
  buttonId = "EXAMPLE-M";
  const recordId = "recr0BIP8PYsKWVCF"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleLButton = document.querySelector("#EXAMPLE-L");
exampleLButton.addEventListener("click", function () {
  buttonId = "EXAMPLE-L";
  const recordId = "recERyyPpGkyObujB"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleXXLButton = document.querySelector("#EXAMPLE-XXL");
exampleXXLButton.addEventListener("click", function () {
  buttonId = "EXAMPLE-XXL";
  const recordId = "recVUGC07Qo3GNU19"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleANDSPLITButton = document.querySelector("#EXAMPLE-ANDSPLIT");
exampleANDSPLITButton.addEventListener("click", function () {
  buttonId = "EXAMPLE-ANDSPLIT";
  const recordId = "recVZ2HFmeandVLui"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleANDSPLITButtonHuge = document.querySelector("#HUGE-ANDSPLIT");
exampleANDSPLITButtonHuge.addEventListener("click", function () {
  buttonId = "HUGE-ANDSPLIT";
  const recordId = "recoHBCXx4WyEuqgK"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleANDSPLITButtonOpen = document.querySelector("#Open-ANDSPLIT");
exampleANDSPLITButtonOpen.addEventListener("click", function () {
  buttonId = "Open-ANDSPLIT";
  const recordId = "rec935pPMwgMTONuE"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const exampleANDSPLITButtonClosed = document.querySelector("#Closed-ANDSPLIT");
exampleANDSPLITButtonClosed.addEventListener("click", function () {
  buttonId = "Closed-ANDSPLIT";
  const recordId = "rec7M29DW6EqWbbom"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const testXORSPLIT = document.querySelector("#TestCase-XORSPLIT");
testXORSPLIT.addEventListener("click", function () {
  buttonId = "TestCase-XORSPLIT";
  const recordId = "recdN3YHcIFDjzqqa"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const testANDSPLIT = document.querySelector("#TestCase-ANDSPLIT");
testANDSPLIT.addEventListener("click", function () {
  buttonId = "TestCase-ANDSPLIT";
  const recordId = "recAHJByDJL7GhRVw"; // airtable
  getBPMNModel(recordId).then((exampleJson) => {
    const jsonInput = document.querySelector("#json-input");
    jsonInput.value = JSON.stringify(exampleJson, null, 2);
  });
});
//
const settings = {
  browserTitle: "",
  titleBarTitle: "",
  logoUrl: "",
};
//
const browserTitleInput = document.querySelector("#browser-title");
browserTitleInput.addEventListener("input", function (event) {
  settings.browserTitle = event.target.value;
  document.title = settings.browserTitle;
});
const titleBarTitleInput = document.querySelector("#title-bar-title");
titleBarTitleInput.addEventListener("input", function (event) {
  settings.titleBarTitle = event.target.value;
  const titleBarTitle = document.querySelector("#title-bar-title");
  titleBarTitle.textContent = settings.titleBarTitle;
});
const logoUrlInput = document.querySelector("#logo-url");
logoUrlInput.addEventListener("input", function (event) {
  settings.logoUrl = event.target.value;
  const logo = document.querySelector("#Logo");
  logo.setAttribute("src", settings.logoUrl);
  if (exampleMJson) {
    const json = JSON.parse(exampleMJson);
    tilebackgroundColor1 = json.process.settings.tilebackgroundColor1;
    tilebackgroundColor2 = json.process.settings.tilebackgroundColor2;
  }
});

function generateTable(
  id,
  rows,
  cols,
  pix,
  tilebackgroundColor1,
  tilebackgroundColor2,
  canvasRoot
) {
  const parentCell = document.getElementById(canvasRoot);
  parentCell.innerHTML = ""; // Empty the parent element
  const tableId = id; // Set ID for the table
  const className = "canvas"; // Set class for the table
  const table = document.createElement("table");
  table.className = className;
  table.setAttribute("id", tableId); // Add ID attribute to the table
  table.style.maxWidth = cols * pix + "px"; // Set max width based on number of columns and pixel size
  for (var i = 0; i < rows; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("td");
      cell.id = "r" + (i + 1) + "c" + (j + 1);
      cell.style.width = pix + "px"; // Set width of cell
      cell.style.height = pix + "px"; // Set height of cell
      if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
        cell.style.backgroundColor = tilebackgroundColor1;
      } else {
        cell.style.backgroundColor = tilebackgroundColor2;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  parentCell.appendChild(table); // Append the table to the parent element
}
//
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tabs");
  var options = {}; // Add any options if needed
  M.Tabs.init(elems, options);
});

function switchToTab(tabId) {
  const tabsInstance = M.Tabs.getInstance(document.querySelector(".tabs"));
  tabsInstance.select(tabId);
}
const updateButton = document.querySelector("#update-btn");
updateButton.addEventListener("click", function () {
  switchToTab("log-panel");
  // Add this line to select the table with id "bpmnCanvas"
  const bpmnCanvas = document.getElementById("bpmnCanvas");
  // ... (the rest of the original code)
  const locationAInput = document.querySelector("#browser-title");
  const locationBInput = document.querySelector("#title-bar-title");
  const locationCInput = document.querySelector("#logo-url");
  const locationDInput = document.querySelector("#tileSize");
  const locationEInput = document.querySelector("#tilebackgroundColor1");
  const locationFInput = document.querySelector("#tilebackgroundColor2");
  const locationGInput = document.querySelector("#processName");
  const locationHInput = document.querySelector("#fontSize");
  const locationIInput = document.querySelector("#toggleSwitchSymbolTypeOnOff");
  const newLocationA = locationAInput.value;
  const newLocationB = locationBInput.value;
  const newLocationC = locationCInput.value;
  const newLocationD = locationDInput.value;
  const newLocationE = locationEInput.value;
  const newLocationF = locationFInput.value;
  const newLocationG = locationGInput.value;
  const newLocationH = locationHInput.value;
  const newLocationI = locationIInput.value;
  const locationA = document.querySelector("#browserTitle");
  const locationB = document.querySelector("#titleBarTitle");
  const locationC = document.querySelector("#navLogo");
  const locationD = document.querySelector("#tileSize");
  // Replace the following line:
  // const locationE = document.querySelectorAll('.canvas td')[0];
  // With this line, to search for the first td element within the bpmnCanvas table:
  const locationE = bpmnCanvas.querySelector(".canvas td");
  // Replace the following line:
  // const locationF = document.querySelectorAll('.canvas td')[1];
  // With this line, to search for the second td element within the bpmnCanvas table:
  const locationF = bpmnCanvas.querySelectorAll(".canvas td")[1];
  const processNameHeaders = document.querySelectorAll("#Process-Name");
  processNameHeaders.forEach((header) => {
    header.textContent = newLocationG; // set the text content to the newLocationG variable
  });
  const locationH = document.querySelector("#fontSize");
  const locationI = document.querySelector("#toggleSwitchSymbolTypeOnOff");
  locationA.textContent = newLocationA;
  locationB.textContent = newLocationB;
  locationC.src = newLocationC;
  locationD.textContent = newLocationD;
  locationE.style.backgroundColor = newLocationE;
  locationF.style.backgroundColor = newLocationF;
  locationGInput.textContent = newLocationG; // update the text content of the input field itself
  locationH.textContent = newLocationH;
  locationI.textContent = newLocationI;
  current.process.settings.browserTitle = newLocationA;
  current.process.settings.titleBarTitle = newLocationB;
  current.process.settings.logoUrl = newLocationC;
  current.process.settings.tileSize = newLocationD;
  current.process.settings.tilebackgroundColor1 = newLocationE;
  current.process.settings.tilebackgroundColor2 = newLocationF;
  current.process.info.name = newLocationG;
  current.process.settings.fontSize = newLocationH;
  current.process.settings.verbose = newLocationI;
  tilesize = parseInt(newLocationD);
  generateTable(
    "bpmnCanvas",
    current.process.info.rows,
    current.process.info.cols,
    tilesize,
    current.process.settings.tilebackgroundColor1,
    current.process.settings.tilebackgroundColor2,
    "canvasRoot1"
  );
  drawProcess(current, "bpmnCanvas", true);
  const jsonOutputTextarea = document.querySelector("#json-output");
  jsonOutputTextarea.value = JSON.stringify(current, null, 2); // Supply Model/"Activate" Textarea with beautified current
  if ((lastEdit && current.process.settings.verbose) || lastEdit !== "erased") {
    const name = "EDIT"; // Other locations in code will point out "Errors" or "Visited"
    pointer(lastEdit, name);
  }
});
//
document.addEventListener("keydown", function (event) {
  // Listen for keydown event on the document
  if (event.key === "Enter") {
    // Check if the key pressed was the Enter key
    updateButton.click(); // Programmatically trigger a click event on the update button
  }
});
function createTextOrImage(svg, y, fs, str) {
  if (!str) {
    return;
  }
  const isImg =
    str.endsWith(".jpeg") || str.endsWith(".jpg") || str.endsWith(".png");
  let x = isImg ? 30 : 50;
  const el = document.createElementNS(
    "http://www.w3.org/2000/svg",
    isImg ? "image" : "text"
  );
  let [format, content] = str.split("$");
  if (content === undefined) {
    content = format;
    format = "";
  }
  {
    const command = format.match(/x([+-.0-9]+)/)?.[1];
    if (["+", "-"].includes(command?.[0])) {
      x += +command;
    } else if (command) {
      x = command;
    }
  }
  {
    const command = format.match(/y([+-.0-9]+)/)?.[1];
    if (["+", "-"].includes(command?.[0])) {
      y += +command;
    } else if (command) {
      y = command;
    }
  }
  if (isImg) {
    el.setAttribute("width", +(format.match(/w([.0-9]+)/)?.[1] || 40));
    el.setAttribute("height", +(format.match(/h([.0-9]+)/)?.[1] || 30));
    const fr = new FileReader();
    fetch(content)
      .then((res) => res.blob())
      .then(function (blob) {
        fr.readAsDataURL(blob);
        fr.onload = function () {
          el.setAttribute("href", fr.result);
        };
      });
  } else {
    {
      const command = format.match(/fs([+-.0-9]+)/)?.[1];
      if (["+", "-"].includes(command?.[0])) {
        fs += +command;
      } else if (command) {
        fs = command;
      }
    }
    {
      const command = format.match(/#....../)?.[0];
      if (command) {
        el.setAttribute("fill", command);
      }
    }
    el.setAttribute("font-size", 3 * fs);
    el.setAttribute(
      "font-family",
      format.includes("*") ? "Arial Black" : "Arial"
    );
    if (format.includes("[")) {
      el.setAttribute("text-anchor", "start");
      x -= 45;
    } else if (format.includes("]")) {
      el.setAttribute("text-anchor", "end");
      x += 45;
    } else {
      el.setAttribute("text-anchor", "middle");
    }
    el.innerHTML = content.replaceAll(
      /(https:\/\/([a-z]+)[^ ]+?)($|[ (),])/g,
      function (_, url, sd, after) {
        return `<a href="${url}" target="_blank" style="text-decoration: underline;">${[
          sd.at(0),
          sd.length - 2,
          sd.at(-1),
        ].join("")}</a>${after}`;
      }
    );
  }
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  svg.appendChild(el);
}
function drawProcess(curr, tab, editable) {
  current = curr;
  var table = document.getElementById(tab);
  const rows = table.getElementsByTagName("tr");
  const cellSize = current.process.settings.tileSize;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const cellId = cell.id;
      const symbolId =
        current.process.sequence[cellId].BPMN +
        "_" +
        current.process.sequence[cellId].in +
        "_" +
        current.process.sequence[cellId].out;
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.width = cellSize + "px";
      container.style.height = cellSize + "px";
      container.setAttribute("id", "envelope");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("id", cellId);
      svg.style.position = "absolute";
      svg.style.top = "0px";
      svg.style.left = "0px";
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#" + symbolId
      );
      svg.appendChild(use);
      createTextOrImage(
        svg,
        36,
        +current.process.settings.fontSize,
        current.process.sequence[cellId].task
      );
      createTextOrImage(
        svg,
        50,
        +current.process.settings.fontSize,
        current.process.sequence[cellId].text1
      );
      createTextOrImage(
        svg,
        64,
        +current.process.settings.fontSize,
        current.process.sequence[cellId].text2
      );
      createTextOrImage(
        svg,
        78,
        +current.process.settings.fontSize,
        current.process.sequence[cellId].text3
      );
      container.appendChild(svg);
      cell.appendChild(container);
      if (current.process.settings.verbose === "1") {
        const text5 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text5.setAttribute("x", "0");
        text5.setAttribute("y", "100");
        text5.setAttribute("font-family", "Arial Black");
        text5.setAttribute("font-size", "8"); // -----------------           Fontsize BPMN Symbols
        text5.setAttribute("fill", "#ffffff"); //#B9B9B9
        text5.setAttribute("id", "svgTxtBpmn");
        text5.innerHTML = current.process.sequence[cellId].BPMN || "";
        svg.appendChild(text5);
        container.appendChild(svg);
        cell.appendChild(container);
        //
        const text6 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text6.setAttribute("x", "0");
        text6.setAttribute("y", "12");
        text6.setAttribute("font-family", "Arial Black");
        text6.setAttribute("font-size", "14"); // -----------------           Fontsize BPMN Symbols
        text6.setAttribute("fill", "#ffffff");
        text6.setAttribute("id", "svgTxtIdx");
        text6.innerHTML = cellId || "can not be!!SYSTEM-VOID-CENTER";
        svg.appendChild(text6);
        container.appendChild(svg);
        cell.appendChild(container);
      }
    }
  }
  if (tab === "bpmnCanvas") {
    table = document.getElementById(tab);
    const cells = table.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const cellId = cell.getAttribute("id");
        const name = "EDIT";
        pointer(cellId, name);
      });
    });
  }
}

function showCurrent() {
  const sortKeys = (obj) => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(sortKeys);
    }
    const sortedKeys = Object.keys(obj).sort();
    const result = {};
    sortedKeys.forEach((key) => {
      result[key] = sortKeys(obj[key]);
    });
    return result;
  };
  const sortedCurrent = sortKeys(current);
  const currentString = JSON.stringify(sortedCurrent, null, 2);
  const jsonInputTextarea = document.querySelector("#json-input");
  jsonInputTextarea.value = currentString;
  //  json_editor_content_at_MODEL = currentString
}
const showCurrentBtn = document.querySelector("#ShowCurrent");
showCurrentBtn.addEventListener("click", showCurrent);

function showTheVoid() {
  channelId = generateUniqueChannelId();
  const theVoid = document.querySelector("#exampleVOIDJson").innerHTML;
  const jsonInput = document.querySelector("#json-input");
  jsonInput.value = theVoid;
  const settings = {
    browserTitle: "",
    titleBarTitle: "",
    logoUrl: "",
  };
  const browserTitleInput = document.querySelector("#browser-title");
  browserTitleInput.addEventListener("input", function (event) {
    settings.browserTitle = event.target.value;
    document.title = settings.browserTitle;
  });
  const titleBarTitleInput = document.querySelector("#title-bar-title");
  titleBarTitleInput.addEventListener("input", function (event) {
    settings.titleBarTitle = event.target.value;
    const titleBarTitle = document.querySelector("#title-bar-title");
    titleBarTitle.textContent = settings.titleBarTitle;
  });
  const logoUrlInput = document.querySelector("#logo-url");
  logoUrlInput.addEventListener("input", function (event) {
    settings.logoUrl = event.target.value;
    const logo = document.querySelector("#Logo");
    logo.setAttribute("src", settings.logoUrl);
  });
  const jsonParsed = JSON.parse(theVoid);
  const rows = parseInt(jsonParsed.process.info.rows);
  const cols = parseInt(jsonParsed.process.info.cols);
  current = jsonParsed;
  const jsonOutput = JSON.stringify(jsonParsed, null, 2);
  const jsonOutputTextarea = document.querySelector("#json-output");
  jsonOutputTextarea.value = jsonOutput;
  const processName = jsonParsed.process.info.name;
  const processNameHeaders = document.querySelectorAll("#Process-Name");
  processNameHeaders.forEach((header) => {
    header.textContent = processName;
  });
  const processSettings = jsonParsed.process.settings;
  const tileSizeInput = document.querySelector("#tileSize");
  const tilebackgroundColor1Input = document.querySelector(
    "#tilebackgroundColor1"
  );
  const tilebackgroundColor2Input = document.querySelector(
    "#tilebackgroundColor2"
  );
  const fontSizeInput = document.querySelector("#fontSize");
  const verboseInput = document.querySelector("#toggleSwitchSymbolTypeOnOff");
  const processNameInput = document.querySelector("#processName");
  browserTitle.textContent = processSettings.browserTitle; //Update Layout
  titleBarTitle.textContent = processSettings.titleBarTitle;
  navLogo.src = processSettings.logoUrl;
  browserTitleInput.value = processSettings.browserTitle; //Update Settings
  titleBarTitleInput.value = processSettings.titleBarTitle;
  logoUrlInput.value = processSettings.logoUrl;
  tileSizeInput.value = processSettings.tileSize;
  tilebackgroundColor1Input.value = processSettings.tilebackgroundColor1;
  tilebackgroundColor2Input.value = processSettings.tilebackgroundColor2;
  fontSizeInput.value = processSettings.fontSize;
  verboseInput.value = processSettings.verbose;
  processNameInput.value = current.process.info.name;
  tilesize = parseInt(tileSizeInput.value);
  generateTable(
    "bpmnCanvas",
    rows,
    cols,
    tilesize,
    current.process.settings.tilebackgroundColor1,
    current.process.settings.tilebackgroundColor2,
    "canvasRoot1"
  );
  drawProcess(current, "bpmnCanvas", true);
}

function beautifyJson() {
  var jsonInput = document.getElementById("json-input");
  var json = JSON.parse(jsonInput.value);
  var beautifiedJson = JSON.stringify(json, null, 2);
  jsonInput.value = beautifiedJson;
}

function minifyJson() {
  var jsonInput = document.getElementById("json-input");
  var json = JSON.parse(jsonInput.value);
  var beautifiedJson = JSON.stringify(json);
  jsonInput.value = beautifiedJson;
}

function verifyJson() {
  var jsonInput = document.getElementById("json-input");
  try {
    JSON.parse(jsonInput.value);
    showWarning("JSON is valid");
  } catch (error) {
    showWarning("JSON is not valid");
  }
}
//
//
let lastEdit;
let lastContent;
//
//
function pointer(cellid, name) {
  const bpmnCanvas = document.getElementById("bpmnCanvas"); // Add this line to select the table with id "bpmnCanvas"
  let cellID_test = "";
  if (typeof cellid !== "undefined") {
    cellID_test = cellid;
  }
  if (cellID_test !== lastContent) {
    // fieldOfInputs.style.display = 'none';
  }
  if (!cellid) {
    return;
  }
  if (lastEdit && lastEdit !== "erased") {
    [rowId, colId] = lastEdit.split("c");
  } else {
    [rowId, colId] = cellid.split("c");
    let rowIndex = parseInt(rowId.substring(1));
    let columnIndex = parseInt(colId);
    if (
      columnIndex > current.process.info.cols ||
      rowIndex > current.process.info.rows
    ) {
      lastEdit = "erased";
    } else {
      lastEdit = cellid;
    }
  }
  if (lastEdit === "erased") {
    return;
  }
  const editors = bpmnCanvas.querySelectorAll('[id^="editor_"]');
  editors.forEach((editor) => editor.remove());
  const envelope = bpmnCanvas.querySelector(`#${cellid} #envelope`);
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("viewBox", "0 0 30 30");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("id", "editor_" + cellid);
  svgElement.style.position = "absolute";
  svgElement.style.top = "0px";
  svgElement.style.left = "0px";
  envelope.appendChild(svgElement);
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#EDIT");
  use.setAttribute("id", "EDIT");
  svgElement.appendChild(use);
  const undoBtn = document.querySelector("#SPDBTTN-UNDO");
  undoBtn.setAttribute("fill", undoArray.length > 0 ? "#0000FF" : "#FFFFFF");
  const redoBtn = document.querySelector("#SPDBTTN-RE-DO");
  redoBtn.setAttribute("fill", redoArray.length > 0 ? "#0000FF" : "#FFFFFF");
  const verboseBtn = document.querySelector("#SPDBTTN-verbose");
  verboseBtn.setAttribute(
    "fill",
    current.process.settings.verbose > 0 ? "#0000FF" : "#FFFFFF"
  );
  if (cellid) {
    lastEdit = cellid;
  } // On first click to cell, no cellid is present
}
//
const eraser = document.getElementById("SPDBTTN-X");
eraser.addEventListener("click", (event) => {
  lastEdit = "erased";
  // Hide the input fields and Save button
  fieldOfInputs.style.display = "none";
  setTimeout(function () {
    generateTable(
      "bpmnCanvas",
      current.process.info.rows,
      current.process.info.cols,
      current.process.settings.tileSize,
      current.process.settings.tilebackgroundColor1,
      current.process.settings.tilebackgroundColor2,
      "canvasRoot1"
    );
  }, 50); // 1000 milliseconds = 1 second
  setTimeout(function () {
    drawProcess(current, "bpmnCanvas", true);
  }, 50); // 1000 milliseconds = 1 second
});
//
//
const undoArray = []; // Global array to store undo information
const redoArray = []; // Global array to store redo information
//
//
function handleClick(event, icons, tableId = "bpmnCanvas") {
  const p = JSON.parse(JSON.stringify(current));
  undoArray.push(p);
  const editorObject = document.querySelector(`#${tableId} [id^="editor_"]`);
  const editorObjectId = editorObject.id;
  const tableCellId = editorObjectId.split("_")[1];
  const useElement = document.querySelector(`#${tableId} #${tableCellId} use`);
  const xlinkHref = useElement.getAttribute("xlink:href");
  const value = xlinkHref.slice(1);
  const currentIcon = useElement.getAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href"
  );
  const nextIndex = (icons.indexOf(currentIcon) + 1) % icons.length;
  const nextIcon = icons[nextIndex];
  const svg = document.querySelector(`#${tableId} svg#${tableCellId}`);
  const use = svg.querySelector("use");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "href", nextIcon);
  const currentBPMN = current.process.sequence[tableCellId].BPMN;
  const currentIn = current.process.sequence[tableCellId].in;
  const currentOut = current.process.sequence[tableCellId].out;
  current.process.sequence[tableCellId].BPMN = nextIcon.substring(
    1,
    nextIcon.indexOf("_")
  );
  current.process.sequence[tableCellId].in = nextIcon.substring(
    nextIcon.indexOf("_") + 1,
    nextIcon.lastIndexOf("_")
  );
  current.process.sequence[tableCellId].out = nextIcon.substring(
    nextIcon.lastIndexOf("_") + 1
  );
  return current;
}
