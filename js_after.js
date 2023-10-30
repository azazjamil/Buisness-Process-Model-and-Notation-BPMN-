//
const spdbttnUndo = document.getElementById("SPDBTTN-UNDO");
const spdbttnRedo = document.getElementById("SPDBTTN-RE-DO");

function handleUndoRedoClick(arrayFrom, arrayTo, message) {
  if (arrayFrom.length > 0) {
    arrayTo.push(current);
    current = JSON.parse(JSON.stringify(arrayFrom.pop()));
    generateTable(
      "bpmnCanvas",
      current.process.info.rows,
      current.process.info.cols,
      current.process.settings.tileSize,
      current.process.settings.tilebackgroundColor1,
      current.process.settings.tilebackgroundColor2,
      "canvasRoot1"
    );
    drawProcess(current, "bpmnCanvas", true);
  } else {
    showWarning(message);
  }
}
spdbttnUndo.addEventListener("click", (event) => {
  handleUndoRedoClick(
    undoArray,
    redoArray,
    "No Undo due to missing activities in the past"
  );
});
spdbttnRedo.addEventListener("click", (event) => {
  handleUndoRedoClick(
    redoArray,
    undoArray,
    "No Re-do due to missing undo in the past"
  );
});
//
// V E R B O S E
//
const spdbttnVerbose = document.getElementById("SPDBTTN-verbose");
spdbttnVerbose.addEventListener("click", (event) => {
  const tableId = "bpmnCanvas";
  const toggleSwitchSymbolTypeOnOff = document.querySelector(
    "#toggleSwitchSymbolTypeOnOff"
  );
  if (current.process.settings.verbose === "0") {
    // 0: verbose off
    current.process.settings.verbose = "1";
    toggleSwitchSymbolTypeOnOff.value = "1";
  } else {
    // 1: verbose off
    current.process.settings.verbose = "0";
    toggleSwitchSymbolTypeOnOff.value = "0";
  }
  generateTable(
    tableId,
    current.process.info.rows,
    current.process.info.cols,
    current.process.settings.tileSize,
    current.process.settings.tilebackgroundColor1,
    current.process.settings.tilebackgroundColor2,
    "canvasRoot1"
  );
  drawProcess(current, tableId, true);
});
//
// D E L E T E
//
const spdbttnDelCol = document.getElementById("SPDBTTN-DEL-Column");
const spdbttnDelRow = document.getElementById("SPDBTTN-DEL-Row");

function deleteDimensionFromProcess(process, cellId, dimension) {
  let [rowId, colId] = cellId.split("c");
  let rowIndex = parseInt(rowId.substring(1));
  let columnIndex = parseInt(colId);
  const p = JSON.parse(JSON.stringify(current));
  undoArray.push(p);
  if (dimension === "row") {
    if (rowIndex < 1 || rowIndex > parseInt(process.info.rows)) {
      return; // Row index out of range, do not delete anything
    }
    for (let j = 1; j <= parseInt(process.info.cols); j++) {
      delete process.sequence["r" + rowIndex + "c" + j];
    }
    // Update the IDs and cell references of the remaining rows
    for (let i = rowIndex + 1; i <= parseInt(process.info.rows); i++) {
      for (let j = 1; j <= parseInt(process.info.cols); j++) {
        let oldId = "r" + i + "c" + j;
        let newId = "r" + (i - 1) + "c" + j;
        let cell = process.sequence[oldId];
        if (cell) {
          cell.in = cell.in.replace(oldId, newId);
          cell.out = cell.out.replace(oldId, newId);
          process.sequence[newId] = cell;
          delete process.sequence[oldId];
        }
      }
    }
    // Update the info.rows value
    process.info.rows = String(parseInt(process.info.rows) - 1);
  } else if (dimension === "column") {
    if (columnIndex < 1 || columnIndex > parseInt(process.info.cols)) {
      return; // Column index out of range, do not delete anything
    }
    for (let i = 1; i <= parseInt(process.info.rows); i++) {
      delete process.sequence["r" + i + "c" + columnIndex];
    }
    // Update the IDs and cell references of the remaining columns
    for (let i = 1; i <= parseInt(process.info.rows); i++) {
      for (let j = columnIndex + 1; j <= parseInt(process.info.cols); j++) {
        let oldId = "r" + i + "c" + j;
        let newId = "r" + i + "c" + (j - 1);
        let cell = process.sequence[oldId];
        if (cell) {
          cell.in = cell.in.replace(oldId, newId);
          cell.out = cell.out.replace(oldId, newId);
          process.sequence[newId] = cell;
          delete process.sequence[oldId];
        }
      }
    }
    // Update the info.cols value
    process.info.cols = String(parseInt(process.info.cols) - 1);
  }
}
spdbttnDelCol.addEventListener("click", (event) => {
  if (current.process.info.cols === "1") {
    showWarning("Last column cannot be deleted!");
  } else {
    const editorObject = document.querySelector('[id^="editor_"]');
    const editorObjectId = editorObject.id;
    const tableCellId = editorObjectId.split("_")[1];
    deleteDimensionFromProcess(current.process, tableCellId, "column"); // Deletes column
    generateTable(
      "bpmnCanvas",
      current.process.info.rows,
      current.process.info.cols,
      current.process.settings.tileSize,
      current.process.settings.tilebackgroundColor1,
      current.process.settings.tilebackgroundColor2,
      "canvasRoot1"
    );
    drawProcess(current, "bpmnCanvas", true);
  }
});
spdbttnDelRow.addEventListener("click", (event) => {
  if (current.process.info.rows === "1") {
    showWarning("Last Row can not be deleted!");
  } else {
    const editorObject = document.querySelector('[id^="editor_"]');
    const editorObjectId = editorObject.id;
    const tableCellId = editorObjectId.split("_")[1];
    deleteDimensionFromProcess(current.process, tableCellId, "row"); // Deletes  row
    generateTable(
      "bpmnCanvas",
      current.process.info.rows,
      current.process.info.cols,
      current.process.settings.tileSize,
      current.process.settings.tilebackgroundColor1,
      current.process.settings.tilebackgroundColor2,
      "canvasRoot1"
    );
    drawProcess(current, "bpmnCanvas", true);
  }
});
//
// A D D
//
const spdbttnAddCol = document.getElementById("SPDBTTN-ADD-Column");
const spdbttnAddRow = document.getElementById("SPDBTTN-ADD-Row");
const defaultCell = {
  task: "",
  BPMN: "VOID",
  NO: "",
  YES: "",
  in: "0",
  out: "0",
  option1: "",
  option2: "",
  option3: "",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
  text6: "",
};
const SequenceCell_Nort_to_South = {
  task: "",
  BPMN: "SEQUENCE",
  NO: "",
  YES: "",
  in: "N",
  option1: "",
  option2: "",
  option3: "",
  out: "S",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
  text6: "",
};
const SequenceCell_South_to_North = {
  task: "",
  BPMN: "SEQUENCE",
  NO: "",
  YES: "",
  in: "S",
  option1: "",
  option2: "",
  option3: "",
  out: "N",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
  text6: "",
};
const SequenceCell_East_to_West = {
  task: "",
  BPMN: "SEQUENCE",
  NO: "",
  YES: "",
  in: "E",
  option1: "",
  option2: "",
  option3: "",
  out: "W",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
  text6: "",
};
const SequenceCell_West_to_East = {
  task: "",
  BPMN: "SEQUENCE",
  NO: "",
  YES: "",
  in: "W",
  option1: "",
  option2: "",
  option3: "",
  out: "E",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
  text6: "",
};

function selectTemplateBasedOnPreviousCell(previousCell, newRowOrColumn) {
  if (!previousCell) {
    return {
      ...defaultCell,
    };
  }
  if (newRowOrColumn === "row") {
    if (previousCell.out.includes("S")) {
      return {
        ...SequenceCell_Nort_to_South,
      };
    } else if (previousCell.in.includes("S")) {
      return {
        ...SequenceCell_South_to_North,
      };
    }
  } else if (newRowOrColumn === "column") {
    if (previousCell.out.includes("E")) {
      return {
        ...SequenceCell_West_to_East,
      };
    } else if (previousCell.in.includes("E")) {
      return {
        ...SequenceCell_East_to_West,
      };
    } else {
      return {
        ...defaultCell,
      };
    }
  }
  return {
    ...defaultCell,
  };
}

function addDimensionToProcess(process, cellId, dimension) {
  let [rowId, colId] = cellId.split("c");
  let rowIndex = parseInt(rowId.substring(1));
  let columnIndex = parseInt(colId);
  const p = JSON.parse(JSON.stringify(current));
  undoArray.push(p);
  if (dimension === "row") {
    for (let i = parseInt(process.info.rows); i >= rowIndex; i--) {
      for (let j = 1; j <= parseInt(process.info.cols); j++) {
        let oldId = "r" + i + "c" + j;
        let newId = "r" + (i + 1) + "c" + j;
        let cell = process.sequence[oldId];
        if (cell) {
          cell.in = cell.in.replace(oldId, newId);
          cell.out = cell.out.replace(oldId, newId);
          process.sequence[newId] = cell;
          delete process.sequence[oldId];
        }
      }
    }
    // Add a new row
    for (let j = 1; j <= parseInt(process.info.cols); j++) {
      let newId = "r" + rowIndex + "c" + j;
      let prevCellId = "r" + (rowIndex - 1) + "c" + j;
      let prevCell = process.sequence[prevCellId];
      process.sequence[newId] = selectTemplateBasedOnPreviousCell(
        prevCell,
        "row"
      );
    }
    // Update the info.rows value
    process.info.rows = String(parseInt(process.info.rows) + 1);
  } else if (dimension === "column") {
    for (let j = parseInt(process.info.cols); j >= columnIndex; j--) {
      for (let i = 1; i <= parseInt(process.info.rows); i++) {
        let oldId = "r" + i + "c" + j;
        let newId = "r" + i + "c" + (j + 1);
        let cell = process.sequence[oldId];
        if (cell) {
          cell.in = cell.in.replace(oldId, newId);
          cell.out = cell.out.replace(oldId, newId);
          process.sequence[newId] = cell;
          delete process.sequence[oldId];
        }
      }
    }
    // Add a new column
    for (let i = 1; i <= parseInt(process.info.rows); i++) {
      let newId = "r" + i + "c" + columnIndex;
      let prevCellId = "r" + i + "c" + (columnIndex - 1);
      let prevCell = process.sequence[prevCellId];
      process.sequence[newId] = selectTemplateBasedOnPreviousCell(
        prevCell,
        "column"
      );
    }
    // Update the info.cols value
    process.info.cols = String(parseInt(process.info.cols) + 1);
  }
}
spdbttnAddCol.addEventListener("click", (event) => {
  const editorObject = document.querySelector('[id^="editor_"]');
  const editorObjectId = editorObject.id;
  const tableCellId = editorObjectId.split("_")[1];
  addDimensionToProcess(current.process, tableCellId, "column"); // Adds a new column
  generateTable(
    "bpmnCanvas",
    current.process.info.rows,
    current.process.info.cols,
    current.process.settings.tileSize,
    current.process.settings.tilebackgroundColor1,
    current.process.settings.tilebackgroundColor2,
    "canvasRoot1"
  );
  drawProcess(current, "bpmnCanvas", true);
});
spdbttnAddRow.addEventListener("click", (event) => {
  const editorObject = document.querySelector('[id^="editor_"]');
  const editorObjectId = editorObject.id;
  const tableCellId = editorObjectId.split("_")[1];
  addDimensionToProcess(current.process, tableCellId, "row"); // Adds a new row
  generateTable(
    "bpmnCanvas",
    current.process.info.rows,
    current.process.info.cols,
    current.process.settings.tileSize,
    current.process.settings.tilebackgroundColor1,
    current.process.settings.tilebackgroundColor2,
    "canvasRoot1"
  );
  drawProcess(current, "bpmnCanvas", true);
});
//
// C O N T E N T
//
const spdbttnContent = document.querySelector("#SPDBTTN-Content");
//const inputFieldsDiv = document.getElementById("fieldOfInputs");
const fieldOfInputs = document.getElementById("fieldOfInputs");
fieldOfInputs.style.display = "none";
//
function updateInputFields(cellData) {
  const form = document.getElementById("fieldOfInputs");
  form.style.display = "block";
  //Object.keys(cellData).forEach((key) => {
  // Row 1
  const formC1R1 = document.getElementById("formC1R1");
  formC1R1.value = lastEdit;
  const formC2R1 = document.getElementById("formC2R1");
  formC2R1.value = current.process.sequence[lastEdit].BPMN;
  const formC3R1 = document.getElementById("formC3R1");
  formC3R1.value = current.process.sequence[lastEdit].task || "";
  const formC4R1 = document.getElementById("formC4R1");
  formC4R1.value = current.process.sequence[lastEdit].in;
  // Row 2
  const formC1R2 = document.getElementById("formC1R2");
  formC1R2.value = current.process.sequence[lastEdit].text1 || "";
  const formC2R2 = document.getElementById("formC2R2");
  formC2R2.value = current.process.sequence[lastEdit].text2 || "";
  const formC3R2 = document.getElementById("formC3R2");
  formC3R2.value = current.process.sequence[lastEdit].text3 || "";
  const formC4R2 = document.getElementById("formC4R2");
  formC4R2.value = current.process.sequence[lastEdit].out;
  // Row 3
  const formC1R3 = document.getElementById("formC1R3");
  formC1R3.value = current.process.sequence[lastEdit].text4 || "";
  const formC2R3 = document.getElementById("formC2R3");
  formC2R3.value = current.process.sequence[lastEdit].text5 || "";
  const formC3R3 = document.getElementById("formC3R3");
  formC3R3.value = current.process.sequence[lastEdit].text6 || "";
  const formC4R3 = document.getElementById("formC4R3");
  formC4R3.value = current.process.sequence[lastEdit].YES || "";
  // Row 4
  const formC1R4 = document.getElementById("formC1R4");
  formC1R4.value = current.process.sequence[lastEdit].option1 || "";
  const formC2R4 = document.getElementById("formC2R4");
  formC2R4.value = current.process.sequence[lastEdit].option2 || "";
  const formC3R4 = document.getElementById("formC3R4");
  formC3R4.value = current.process.sequence[lastEdit].option3 || "";
  const formC4R4 = document.getElementById("formC4R4");
  formC4R4.value = current.process.sequence[lastEdit].NO || "";
}

//
const saveFields = document.querySelector("#saveFields");
saveFields.addEventListener("click", function () {
  const p = JSON.parse(JSON.stringify(current));
  undoArray.push(p);
  fieldOfInputs.style.display = "none";
  const task = document.getElementById("formC3R1");
  const YES = document.getElementById("formC4R3");
  const inbound = document.getElementById("formC4R1");
  const outbound = document.getElementById("formC4R2");
  const text1 = document.getElementById("formC1R2"); // text1
  const text2 = document.getElementById("formC2R2"); // text2
  const text3 = document.getElementById("formC3R2"); // text3
  const text4 = document.getElementById("formC1R3"); // text4
  const text5 = document.getElementById("formC2R3"); // text5
  const text6 = document.getElementById("formC3R3"); // text6
  const option1 = document.getElementById("formC1R4"); // option1
  const option2 = document.getElementById("formC2R4"); // option2
  const option3 = document.getElementById("formC4R4"); // option3
  //const text = document.getElementById("text");
  const NO = document.getElementById("formC4R4");
  if (task) {
    const task_v = task.value;
    current.process.sequence[lastEdit].task = task_v;
  }
  if (YES) {
    const YES_v = YES.value;
    current.process.sequence[lastEdit].YES = YES_v;
  }
  if (inbound) {
    const inbound_v = inbound.value;
    current.process.sequence[lastEdit].in = inbound_v;
  }
  if (outbound) {
    const outbound_v = outbound.value;
    current.process.sequence[lastEdit].out = outbound_v;
  }
  if (text1) {
    const text_v1 = text1.value;
    current.process.sequence[lastEdit].text1 = text_v1;
  }
  if (text2) {
    const text_v2 = text2.value;
    current.process.sequence[lastEdit].text2 = text_v2;
  }
  if (text3) {
    const text_v3 = text3.value;
    current.process.sequence[lastEdit].text3 = text_v3;
  }
  if (text4) {
    const text_v4 = text4.value;
    current.process.sequence[lastEdit].text4 = text_v4;
  }
  if (text5) {
    const text_v5 = text5.value;
    current.process.sequence[lastEdit].text5 = text_v5;
  }
  if (text6) {
    const text_v6 = text6.value;
    current.process.sequence[lastEdit].text6 = text_v6;
  }
  if (NO) {
    const NO_v = NO.value;
    current.process.sequence[lastEdit].NO = NO_v;
  }
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
  pointer(lastEdit, "Editor");
});
//
spdbttnContent.addEventListener("click", (event) => {
  //fieldOfInputs.style.display = "";
  const processSequence = current.process.sequence;
  if (processSequence[lastEdit]) {
    const cellData = processSequence[lastEdit];
    updateInputFields(cellData);
  }
});
//
// T O O L I N G
//
function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("cp");
  document.body.removeChild(textArea);
}

function processBPMN(jsonString, tableName, canvasRootID, headID) {
  const parsed = JSON.parse(jsonString);
  const cols = parsed.process.info.cols;
  const rows = parsed.process.info.rows;
  const size = parsed.process.settings.tileSize;
  const color1 = parsed.process.settings.tilebackgroundColor1;
  const color2 = parsed.process.settings.tilebackgroundColor2;
  generateTable(tableName, rows, cols, size, color1, color2, canvasRootID);
  drawProcess(parsed, tableName, false);
  const element = document.getElementById(headID);
  element.innerHTML = parsed.process.info.name;
}
const BPMN_explained_1 = `{"process":{"info":{"cols":"2","name":"Start","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"START","in":"0","out":"N","task":"North","text1":"","text2":"","text3":""},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Untyped start event","text1":"Has no input","text2":"output direction ","text3":"may go to one out of 4"},"r2c1":{"BPMN":"START","in":"0","out":"E","task":"East","text1":"","text2":"","text3":""},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Direction east","text1":"most likely for ","text2":"left to right developing","text3":"process path"},"r3c1":{"BPMN":"START","in":"0","out":"S","task":"South","text1":"","text2":"","text3":""},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Direction south","text1":"similar likely as left to right","text2":"North and west ","text3":"seemingly unlikely"},"r4c1":{"BPMN":"START","in":"0","out":"W","task":"West","text1":"","text2":"","text3":""},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Direction west","text1":"Other start types: ","text2":"Message driven","text3":"Event driven"}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
const BPMN_explained_2 = `{"process":{"info":{"cols":"2","name":"Stop","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"STOP","in":"N","out":"0","task":"North","text1":"","text2":"","text3":""},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Untyped stop event","text1":"Input from top (=North)","text2":"Avoid joining all pathes to ","text3":"only one end event."},"r2c1":{"BPMN":"STOP","in":"E","out":"0","task":"East","text1":"","text2":"","text3":""},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Untyped end from right","text1":"Only 12 languages","text2":"write right to left","text3":"Chinease, Japanease, .."},"r3c1":{"BPMN":"STOP","in":"S","out":"0","task":"South","text1":"","text2":"","text3":""},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Untyped end from bottom","text1":"No language writes","text2":"bottom to top","text3":"only 2 now extinkt"},"r4c1":{"BPMN":"STOP","in":"W","out":"0","task":"West","text1":"","text2":"","text3":""},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"untyped end at right","text1":"most widely used direction","text2":"Easy to read for most","text3":""}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
const BPMN_explained_3 = `{"process":{"info":{"cols":"2","name":"Comment","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"COMMENT","in":"N","out":"0","task":"North","text1":"","text2":"","text3":""},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting top tile","text1":"dotted lines draw attention","text2":"Grey color is low on","text3":"disruption"},"r2c1":{"BPMN":"COMMENT","in":"E","out":"0","task":"East","text1":"","text2":"","text3":""},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting right tile","text1":"Sparsely use comments","text2":"Keep it short.","text3":""},"r3c1":{"BPMN":"COMMENT","in":"S","out":"0","task":"South","text1":"","text2":"","text3":""},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting bottom tile","text1":"","text2":"","text3":""},"r4c1":{"BPMN":"COMMENT","in":"W","out":"0","task":"West","text1":"","text2":"","text3":""},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting left tile","text1":"","text2":"","text3":""}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
const BPMN_explained_4 = `{"process":{"info":{"cols":"2","name":"XOR & SEQUENCE","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"XORSPLIT","NO":"k","YES":"g","in":"W","out":"ES","task":"Yes / No Buttons","text1":"decide on path","text2":"One Input & 2 Out","text3":""},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"XORSPLIT by mouse click","text1":"2 or 3 outbounds","text2":"inound from all directions","text3":"Use it for decisions"},"r2c1":{"BPMN":"SEQUENCE","NO":"undefined","YES":"undefined","in":"W","out":"E","task":"Part of a sequence","text1":"","text2":"From left to right or","text3":"from west to east"},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Connects elements          ","text1":"START -> XOR","text2":"XOR -> TASK","text3":"TASK -> STOPP"},"r3c1":{"BPMN":"SEQUENCE","NO":"undefined","YES":"undefined","in":"N","out":"E","task":"Part of a sequence","text1":"","text2":"From top to right or","text3":"from north to east"},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Many line elements","text1":"help to traverse canvas","text2":"transitions are tile based","text3":"arrow shows direction"},"r4c1":{"BPMN":"XORJOIN","NO":"undefined","YES":"undefined","in":"SW","out":"E","task":"XOR Join","text1":"","text2":"paired ...","text3":"with split"},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Many in- out-combinations","text1":"Exactly one out ","text2":"Many 2 in: SW, SN, WE, ...","text3":"Many 3 in: NSW, ESW, ..."}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
const BPMN_explained_5 = `{"process":{"info":{"cols":"2","name":"ANDSPLIT & -JOIN","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"ANDSPLIT","NO":"k","YES":"g","in":"W","out":"NS","task":"AND 2","text1":"","text2":"Split to 2","text3":"Many variants"},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Unconditioned split","text1":"For *2* or 3 outbounds","text2":"inbound from all directions","text3":"Introduces parallel threads"},"r2c1":{"BPMN":"ANDJOIN","NO":"undefined","YES":"undefined","in":"NS","out":"E","task":"JOIN 2","text1":"","text2":"Many spatial variants","text3":"for 2 joins"},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Unconditioned join","text1":"Waiting for all treads","text2":"Terminates parallel threads","text3":"Proceeds in single thread"},"r3c1":{"BPMN":"ANDSPLIT","NO":"undefined","YES":"undefined","in":"W","out":"NES","task":"AND 3","text1":"","text2":"Split to 3","text3":"Some variants"},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Multithreadding","text1":"For 2 or *3* outbounds","text2":"Bigger brother of *2*","text3":"Spatial variants"},"r4c1":{"BPMN":"ANDJOIN","NO":"undefined","YES":"undefined","in":"NES","out":"E","task":"JOIN 3","text1":"","text2":"paired ...","text3":"with split"},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Many in- out-combinations","text1":"Exactly one out ","text2":"Many 2 in: SW, SN, WE, ...","text3":"Many 3 in: NSW, ESW, ..."}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
const BPMN_explained_6 = `{"process":{"info":{"cols":"2","name":"Activity, Task","rows":"4","version":"dummy"},"sequence":{"r1c1":{"BPMN":"XORSPLIT","NO":"undefined","YES":"undefined","in":"W","out":"NES","task":"Activity","text1":"","text2":"","text3":""},"r1c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"XORSPLIT is an activity","text1":"A human clicks a button:","text2":"North, East, South ..","text3":"deciding which path to go"},"r2c1":{"BPMN":"TASK","NO":"undefined","YES":"undefined","in":"W","out":"E","task":"Task","text1":"","text2":"","text3":""},"r2c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting right tile","text1":"Sparsely use commwnts","text2":"Keep it short.","text3":""},"r3c1":{"BPMN":"TASK","NO":"undefined","YES":"undefined","in":"W","out":"S","task":"Task","text1":"","text2":"","text3":""},"r3c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting bottom tile","text1":"","text2":"","text3":""},"r4c1":{"BPMN":"TASK","NO":"undefined","YES":"undefined","in":"W","out":"E","task":"Task","text1":"","text2":"","text3":""},"r4c2":{"BPMN":"COMMENT","NO":"undefined","YES":"undefined","in":"W","out":"0","task":"Commenting left tile","text1":"","text2":"","text3":""}},"settings":{"browserTitle":"Go For it!","fontSize":"2","logoUrl":"https://bit.ly/3Ykw1nt","tileSize":"200","tilebackgroundColor1":"#1ac1c1","tilebackgroundColor2":"#d2cc1e","titleBarTitle":"Step by step.","verbose":"1"}}}`;
processBPMN(BPMN_explained_1, "tool1", "canvasRoot2", "tool1_head");
processBPMN(BPMN_explained_2, "tool2", "canvasRoot3", "tool2_head");
processBPMN(BPMN_explained_3, "tool3", "canvasRoot4", "tool3_head");
processBPMN(BPMN_explained_4, "tool4", "canvasRoot5", "tool4_head");
processBPMN(BPMN_explained_5, "tool5", "canvasRoot6", "tool5_head");
processBPMN(BPMN_explained_6, "tool6", "canvasRoot7", "tool6_head");
//
// C L I P B O A R D S
//
const clip01Element = document.getElementById("clip01");
clip01Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_1);
});
const clip02Element = document.getElementById("clip02");
clip02Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_2);
});
const clip03Element = document.getElementById("clip03");
clip03Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_3);
});
const clip04Element = document.getElementById("clip04");
clip04Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_4);
});
const clip05Element = document.getElementById("clip05");
clip05Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_5);
});
const clip06Element = document.getElementById("clip06");
clip06Element.addEventListener("click", () => {
  copyToClipboard(BPMN_explained_6);
});
const clip07Element = document.getElementById("clip07");
clip07Element.addEventListener("click", () => {
  const json_editor = document.getElementById("json-input").value;
  copyToClipboard(json_editor);
});
const clip08Element = document.getElementById("clip08");
clip08Element.addEventListener("click", () => {
  const json_output_value = document.getElementById("json-output").value;
  copyToClipboard(json_output_value);
});
//
// R U N
//
function nextStep(cellId, currentStep, YN) {
  let direction = "";
  const element = current.process.sequence[cellId];
  if ("YES" in element && element.YES !== "undefined" && element.YES !== "") {
    // XOR split
    switch (YN) {
      case "Y":
        direction = currentStep.YES.split(":")[0];
        break;
      case "N":
        direction = currentStep.NO.split(":")[0];
        break;
      default:
        direction = currentStep.out;
    }
  } else if ("ANDSPLIT" in element) {
    // AND split
    const out = currentStep.out.split(":")[0];
    direction = out.includes("/") ? out.split("/")[0] : out;
  } else {
    switch (YN) {
      case "1":
        direction = currentStep.option1.split(":")[0];
        break;
      case "2":
        direction = currentStep.option2.split(":")[0];
        break;
      case "3":
        direction = currentStep.option3.split(":")[0];
        break;
      default:
        direction = currentStep.out;
    }
  }
  const rowLabel = cellId.slice(0, 1);
  let newRowValue = parseInt(cellId.slice(1, cellId.indexOf("c")));
  const colLabel = cellId.slice(cellId.indexOf("c"), cellId.indexOf("c") + 1);
  let newColValue = parseInt(cellId.slice(cellId.indexOf("c") + 1));
  if ("ANDJOIN" in element) {
    // AND join
    const inDirection = element.in.split(":")[0];
    switch (inDirection) {
      case "N":
        newRowValue -= 1;
        break;
      case "E":
        newColValue += 1;
        break;
      case "S":
        newRowValue += 1;
        break;
      case "W":
        newColValue -= 1;
        break;
    }
  } else {
    switch (direction) {
      case "N":
        newRowValue -= 1;
        break;
      case "E":
        newColValue += 1;
        break;
      case "S":
        newRowValue += 1;
        break;
      case "W":
        newColValue -= 1;
        break;
      case "0":
        break;
      default:
        showWarning("Direction unknown - " + cellId);
    }
  }
  if (
    newRowValue < 1 ||
    newRowValue > parseInt(copyCurrentParsed.process.info.rows) ||
    newColValue < 1 ||
    newColValue > parseInt(copyCurrentParsed.process.info.cols)
  ) {
    throw new Error("Destination out of bound");
  }
  const nextCell = `${rowLabel}${newRowValue}${colLabel}${newColValue}`;
  return nextCell;
}

function findPreviousCell(cellId, currentStep) {
  const element = current.process.sequence[cellId];
  const inDirections = element.in.split(":")[0];
  let inPaths = [];
  if (element.BPMN === "XORJOIN" || element.BPMN === "ANDJOIN") {
    for (let i = 0; i < element.in.length; i++) {
      const outDirection = element.in.charAt(i);
      inPaths.push(outDirection);
    }
    // const outPaths = outDirection.includes("/") ? outDirection.split("/") : [outDirection];
    const previousCells = [];
    for (const path of inPaths) {
      let newRowValue = parseInt(cellId.slice(1, cellId.indexOf("c")));
      let newColValue = parseInt(cellId.slice(cellId.indexOf("c") + 1));
      switch (path) {
        case "N":
          newRowValue -= 1;
          break;
        case "E":
          newColValue += 1;
          break;
        case "S":
          newRowValue += 1;
          break;
        case "W":
          newColValue -= 1;
          break;
      }
      const previousCell = `r${newRowValue}c${newColValue}`;
      previousCells.push(previousCell);
    }
    return previousCells;
  } else {
    let newRowValue = parseInt(cellId.slice(1, cellId.indexOf("c")));
    let newColValue = parseInt(cellId.slice(cellId.indexOf("c") + 1));
    switch (inDirections) {
      case "N":
        newRowValue -= 1;
        break;
      case "E":
        newColValue += 1;
        break;
      case "S":
        newRowValue += 1;
        break;
      case "W":
        newColValue -= 1;
        break;
    }
    const previousCell = `r${newRowValue}c${newColValue}`;
    return [previousCell];
  }
}
//
function findStartKey(sequence) {
  for (let key in sequence) {
    if (sequence[key].BPMN.includes("START")) {
      return key; // Returns the key if "START" is found within the value
    }
  }
  return null; // If no "START" value is found, return null
} // findStartKey  08.08.2023 on introduction of MSG-START-W_0_E
//
function event_function(btn, forwardStep, forwardStepObj, previousStep) {
  btn.setAttribute("data-next-step", forwardStep);
  btn.addEventListener("click", (event) => {
    handle_bttn_click(event, forwardStep, forwardStepObj, previousStep);
  });
}

function copyFunc(url) {
  copyButton.style.fill = "white";
  copyButton.addEventListener("click", (e) => {
    // const valueToCopy = e.target.getAttribute('data-value');
    console.log(url);
    copyToClipboard(url);
    // Show the ezi toast popup
    showEziToast();
  });
}

function showEziToast() {
  const eziToast = document.getElementById("eziToast");
  eziToast.style.display = "block";
  // Hide the toast after a delay (e.g., 3 seconds)
  setTimeout(() => {
    hideEziToast();
  }, 3000);
}

function hideEziToast() {
  const eziToast = document.getElementById("eziToast");
  eziToast.style.display = "none";
}

function copyToClipboard(value) {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = value;
  document.body.appendChild(textarea);

  // Select the value
  textarea.select();

  try {
    // Use the Clipboard API to copy the selected text to the clipboard
    document.execCommand("copy");
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Unable to copy text to clipboard:", err);
  }

  // Remove the temporary textarea
  document.body.removeChild(textarea);
}

function sideBarScroll() {
  sideBar.scrollTo(0, sideBar.scrollHeight);
}

function sendLargeData(data, channel) {
  const maxChunkSize = 5 * 1024; // Set the maximum chunk size (e.g., 30KB)
  const jsonStr = JSON.stringify(data);
  const chunks = [];
  for (let i = 0; i < jsonStr.length; i += maxChunkSize) {
    const chunk = jsonStr.slice(i, i + maxChunkSize);
    chunks.push(chunk);
  }
  chunks.forEach(async (chunk, index) => {
    const message = {
      chunkIndex: index,
      totalChunks: chunks.length,
      data: chunk,
    };
    await pubnub.publish(
      {
        channel: channel,
        message: message,
      },
      (status, response) => {
        if (status.error) {
          console.error("Error sending chunk:", status.errorData);
        } else {
          console.log(`Chunk ${index + 1}/${chunks.length} sent successfully`);
        }
      }
    );
  });
}

// Function to process the message queue and click buttons
function processQueue() {
  if (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Get the first message from the queue
    currentSequence++;
    if (message.hasOwnProperty("nextStep")) {
      const cellId = message.nextStep;
      const buttons = document.querySelectorAll(".btn-div button");
      buttons.forEach((button) => {
        const nextStep = button.getAttribute("data-next-step");
        if (nextStep === cellId) {
          button.click();
        } else {
          console.log("Button not found");
        }
      });
    }
    if (messageQueue.length > 0) {
      runTimer(document.querySelector(".timer"));
    } else {
      clearInterval();
      document.querySelector(".timer").style.display = "none";
    }
  }
}

pubnub.addListener({
  message: function (message) {
    // Check if message contains "automated" property
    if (message.message.hasOwnProperty("automated")) {
      console.log(message.message);
      // Queue the message for processing
      messageQueue.push(message.message);
      // Check if the queue processing is not running, then start it
      if (messageQueue.length === 1) {
        // After processing a message, wait 10 seconds and then process the next message
        document.querySelector(".timer").style.display = "block";
        runTimer(document.querySelector(".timer"));
        // setTimeout(processQueue, delay*1000);
      }
    } else {
      // Check if message contains 'cellId' property
      if (message.message.hasOwnProperty("nextStep")) {
        const cellId = message.message.nextStep;
        // Get all buttons inside btn-div
        const buttons = document.querySelectorAll(".btn-div button");
        // Iterate through each button and check data-nextstep attribute
        buttons.forEach((button) => {
          const nextStep = button.getAttribute("data-next-step");
          // Perform click action if data-nextstep matches cellId
          if (nextStep === cellId) {
            initiater = message.message.initiater;
            button.click();
          }
        });
      }
    }
  },
  status: function (status) {
    if (status.category === "PNConnectedCategory") {
    }
  },
});
// Function to check if URL has query parameters
function hasQueryParams(url) {
  return url.href.includes("?");
}
// Function to generate the channelURL
function generateChannelURL(url, channelId) {
  if (hasQueryParams(url)) {
    return `${url}&channelid=${channelId}`;
  } else {
    return `${url}?channelid=${channelId}`;
  }
}

function burgerFunc() {
  hamburger.style.fill = "white";
  hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    page.classList.toggle("sidebarshow");
    page.classList.toggle("sidebarhide");
    sideBarScroll();
  });
}
// timer function
function isTimeLeft() {
  return timeLeft > -1;
}

function runTimer(timerElement) {
  const message = messageQueue[0];
  if (message.sequence === currentSequence) {
    const timerCircle = timerElement.querySelector("svg > circle + circle");
    timerElement.classList.add("animatable");
    timerCircle.style.strokeDashoffset = 1;

    let countdownTimer = setInterval(function () {
      if (isTimeLeft()) {
        const timeRemaining = timeLeft--;
        const normalizedTime = (delay - timeRemaining) / delay;
        // for clockwise animation
        // const normalizedTime = (timeRemaining - 60) / 60;
        timerCircle.style.strokeDashoffset = normalizedTime;
        timer.innerHTML = timeRemaining;
      } else {
        clearInterval(countdownTimer);
        timerElement.classList.remove("animatable");
        processQueue();
        timeLeft = delay;
      }
    }, 1000);
  } else {
    console.log("test");
    // Message is not ready to be processed yet; move it to the end of the queue
    messageQueue.push(messageQueue.shift()); // Move the first message to the end
    runTimer(document.querySelector(".timer"));
  }
}

function handle_bttn_click(
  event,
  o_cellId,
  o_currentStepObject1,
  previousStep
) {
  const now = new Date();
  const dateTimeString = now
    .toLocaleString("en-GB", {
      timeZone: "UTC",
    })
    .replace(",", "");
  const b_one = document.getElementById("b_one");
  const b_two = document.getElementById("b_two");
  const b_three = document.getElementById("b_three");
  const h4Tag = current.process.sequence[o_cellId];
  message = {
    dateTimeString: dateTimeString,
    processInfoName: copyCurrentParsed.process.info.name,
    BPMN: copyCurrentParsed.process.sequence[previousStep].BPMN,
    task: copyCurrentParsed.process.sequence[previousStep].task,
    nextStep: o_cellId,
    previousStep: previousStep,
    initiater: userId,
  };
  sideBarContent(message);
  if (
    copyCurrentParsed.process.sequence[previousStep].BPMN.includes("START") &&
    !channel
  ) {
    burgerFunc();
    const channelURL = generateChannelURL(url, channelId);
    document
      .getElementById("copy-button")
      .setAttribute("data-value", channelURL);
    copyFunc(channelURL);
    // Start PubNub channel
    pubnub.subscribe({
      channels: [channelId],
    });
    const largeData = document.querySelector("#json-input").value;
    sendLargeData(largeData, channelId);
  }
  if (copyCurrentParsed.process.sequence[previousStep].BPMN.includes("STOP")) {
    event.target.disabled = true;
    return;
  }
  if (
    (copyCurrentParsed.process.sequence[o_cellId].BPMN === "SEQUENCE" &&
      copyCurrentParsed.process.sequence[previousStep].BPMN !== "SEQUENCE" &&
      userId === initiater) ||
    !auto_sequence_flag
  ) {
    if (channel && flowComplete) {
      pubnub.publish(
        {
          channel: channel,
          message: message,
        },
        (status, response) => {
          if (status.error) {
            console.error("Channel creation error:", status.errorData);
          } else {
            console.log("Message Sent:", message);
          }
        }
      );
    } else if (pass) {
      pubnub.publish(
        {
          channel: channelId,
          message: message,
        },
        (status, response) => {
          if (status.error) {
            console.error("Channel creation error:", status.errorData);
          } else {
            console.log("Message Sent:", message);
          }
        }
      );
    } else {
      pass = true;
    }
  }
  //     if (copyCurrentParsed.process.sequence[previousStep].BPMN == "STOP") {

  if (h4Tag.task) {
    document.getElementById("callToAction").innerHTML = h4Tag.task;
  } else {
    document.getElementById("callToAction").innerHTML = h4Tag.BPMN;
  }
  const target = event.target;
  const slider_div = event.target.closest(".slider-div");
  const parent = target.closest(".btn-div");
  if (document.querySelector("#json-input").value.includes("ANDSPLIT")) {
    if (b_two) {
      b_two.remove();
      b_three.remove();
      slider_first(document.getElementById("btn-div-0"));
    }
    // const loop = document.querySelector("#loop div");
    const prev = previousStep;
    let prevObj;
    prevObj = copyCurrentParsed.process.sequence[prev];
    if (prevObj.BPMN === "XORSPLIT") {
      const sibling = target.parentNode.querySelectorAll(
        ".btn-div button:not(:first-child)"
      );
      for (let i = 0; i < sibling.length; i++) {
        if (sibling[i] === target) continue;
        sibling[i].remove();
      }
    }
    if (o_currentStepObject1.BPMN === "ANDJOIN") {
      if (checkIfThreadReached(o_cellId, o_currentStepObject1)) {
        const button = document.createElement("button");
        button.classList.add("btn-style", "btn");
        button.style.display = "inline-block";
        button.style.backgroundColor = "green";
        if (o_currentStepObject1.task) {
          button.innerHTML = o_currentStepObject1.task;
        } else {
          button.innerHTML = ">";
        }
        const container = parent.parentElement;
        container.append(button);
        previousStep1 = previousStep;
        const colorSingle = container.style.background;
        addCellOutline(
          "bpmnStatus",
          o_cellId,
          `1px solid ${colorSingle}`,
          previousStep1
        );
        next_step = nextStep(
          o_cellId,
          o_currentStepObject1,
          o_currentStepObject1.out
        );
        next_step_obj = copyCurrentParsed.process.sequence[next_step];
        event_function(button, next_step, next_step_obj, o_cellId);
        const siblings = Array.from(
          target.closest(".btn-div").parentNode.querySelectorAll(".slick-slide")
        );
        removeSlides(parent.closest(".slick-initialized"), siblings);
        // parent.remove()
      } else {
        const colorSingle = parent.style.background;
        previousStep1 = previousStep;
        addCellOutline(
          "bpmnStatus",
          o_cellId,
          `2px solid ${colorSingle}`,
          previousStep1
        );
        target.style.display = "inline-block";
        target.disabled = true;
      }
    } else if (o_currentStepObject1.BPMN === "XORSPLIT") {
      event.target.remove();
      switch (o_currentStepObject1.out.length) {
        case 2: // TWO BUTTONS -> YES-NO-Decision
          const button1 = document.createElement("button");
          button1.classList.add("btn-style", "btn");
          button1.style.display = "inline-block";
          button1.style.backgroundColor = "green";
          button1.innerHTML = o_currentStepObject1.NO.split(":")[1];
          previousStep1 = previousStep;
          const colorSingle = parent.style.background;
          addCellOutline(
            "bpmnStatus",
            o_cellId,
            `1px solid ${colorSingle}`,
            previousStep1
          );
          next_step = nextStep(o_cellId, o_currentStepObject1, "N");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button1, next_step, next_step_obj, o_cellId);
          const button2 = document.createElement("button");
          button2.classList.add("btn-style", "btn");
          button2.style.display = "inline-block";
          button2.style.backgroundColor = "blue";
          button2.innerHTML = o_currentStepObject1.YES.split(":")[1];
          next_step_1 = nextStep(o_cellId, o_currentStepObject1, "Y");
          next_step_obj_1 = copyCurrentParsed.process.sequence[next_step];
          event_function(button2, next_step_1, next_step_obj_1, o_cellId);
          slider_div.append(button1, button2);
          break;
        case 3: // THRE BUTTONS -> OPTION1 OPTION2 OPTION3 - Selection
          b_one.style.display = "inline-block";
          b_one.disabled = true;
          previousStep1 = previousStep;
          o_nxtStep1 = nextStep(o_cellId, o_currentStepObject1, "1");
          b_one.dataset.nextStep = o_nxtStep1;
          o_nextStepObject1 = copyCurrentParsed.process.sequence[o_nxtStep1];
          if (o_currentStepObject1.option1.split(":")[1]) {
            b_one.textContent = o_currentStepObject1.task;
          } else {
            b_one.textContent = ">";
          }
          b_one.title =
            o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep1;
          b_one.style.backgroundColor = "green";
          addCellOutline(
            "bpmnStatus",
            o_cellId,
            "1px solid red",
            previousStep1
          );
          o_currentStepObjectBPMN =
            copyCurrentParsed.process.sequence[o_nxtStep1];
          o_currentStep = o_nxtStep1;
          //
          b_two.style.display = "inline-block";
          b_two.disabled = false;
          o_nxtStep2 = nextStep(o_cellId, o_currentStepObject1, "2");
          b_two.dataset.nextStep = o_nxtStep2;
          o_nextStepObject2 = copyCurrentParsed.process.sequence[o_nxtStep2];
          b_two.textContent = o_currentStepObject1.option2.split(":")[1];
          b_two.title =
            o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep2;
          b_two.style.backgroundColor = "orange";
          o_currentStepObjectBPMN =
            copyCurrentParsed.process.sequence[o_nxtStep2];
          o_currentStep = o_nxtStep2;
          //
          b_three.style.display = "inline-block";
          b_three.disabled = false;
          o_nxtStep3 = nextStep(o_cellId, o_currentStepObject1, "3");
          b_three.dataset.nextStep = o_nxtStep3;
          o_nextStepObject3 = copyCurrentParsed.process.sequence[o_nxtStep3];
          b_three.textContent = o_currentStepObject1.option3.split(":")[1];
          b_three.title =
            o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep3;
          b_three.style.backgroundColor = "red";
          o_currentStepObjectBPMN =
            copyCurrentParsed.process.sequence[o_nxtStep3];
          o_currentStep = o_nxtStep3;
          break;
        default:
          showWarning("Single thread: Unknown outbound - " + cellId);
      }
    } else {
      target.remove();
      switch (o_currentStepObject1.out.length) {
        case 1:
          const button = document.createElement("button");
          button.classList.add("btn-style", "btn");
          button.style.display = "inline-block";
          button.style.backgroundColor = "green";
          if (o_currentStepObject1.task) {
            button.innerHTML = o_currentStepObject1.task;
          } else {
            button.innerHTML = ">";
          }
          slider_div.append(button);
          previousStep1 = previousStep;
          const colorSingle = parent.style.background;
          addCellOutline(
            "bpmnStatus",
            o_cellId,
            `1px solid ${colorSingle}`,
            previousStep1
          );
          next_step = nextStep(
            o_cellId,
            o_currentStepObject1,
            o_currentStepObject1.out
          );
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button, next_step, next_step_obj, o_cellId);
          if (o_currentStepObject1.BPMN.includes("STOP")) {
            button.disabled = false;
          }
          // o_nxtStep1 = next_step;
          if (auto_sequence_flag && initiater === userId) {
            click(o_cellId, previousStep1, next_step);
          }
          initiater = userId;
          break;
        case 2: // TWO Threads each one Button -> "Start Thread"
          const button1 = document.createElement("button");
          button1.classList.add("btn-style", "btn");
          button1.style.display = "inline-block";
          button1.style.backgroundColor = "green";
          button1.innerHTML = o_currentStepObject1.NO.split(":")[1];
          let color;
          if (count === 0) {
            color = first_color.value;
          } else {
            color = getRandomColor(first_color.value);
          }
          const div = document.createElement("div");
          div.style.background = color;
          div.classList.add("btn-div");
          const slide = document.createElement("div");
          slide.classList.add("slider-div");
          slide.setAttribute("id", `btn-div-${slide_count}`);
          slide_count++;
          slide.appendChild(button1);
          div.appendChild(slide);
          previousStep1 = previousStep;
          addCellOutline(
            "bpmnStatus",
            o_cellId,
            `2px solid ${color}`,
            previousStep1
          );
          next_step = nextStep(o_cellId, o_currentStepObject1, "N");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button1, next_step, next_step_obj, o_cellId);
          //
          const button2 = document.createElement("button");
          button2.classList.add("btn-style", "btn");
          button2.style.display = "inline-block";
          button2.style.backgroundColor = "red";
          button2.innerHTML = o_currentStepObject1.YES.split(":")[1];
          let color1;
          if (count === 0) {
            color1 = second_color.value;
          } else {
            color1 = getRandomColor(second_color.value);
          }
          const div1 = document.createElement("div");
          div1.style.background = color1;
          div1.classList.add("btn-div");
          const slide1 = document.createElement("div");
          slide1.setAttribute("id", `btn-div-${slide_count}`);
          slide_count++;
          slide1.appendChild(button2);
          slide1.classList.add("slider-div");
          div1.appendChild(slide1);
          parent.append(div, div1);
          next_step = nextStep(o_cellId, o_currentStepObject1, "Y");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button2, next_step, next_step_obj, o_cellId);
          addSlides(slider_div, [div, div1]);
          slider(slide);
          slider(slide1);
          count++;
          break;
        case 3: // THREE Threads each one Button  -> "Start Thread"
          const button3 = document.createElement("button");
          button3.classList.add("btn-style", "btn");
          button3.style.display = "inline-block";
          button3.style.backgroundColor = "green";
          button3.innerHTML = o_currentStepObject1.option1.split(":")[1];
          let color2;
          if (count === 0) {
            color2 = first_color.value;
          } else {
            color2 = getRandomColor(first_color.value);
          }
          const div2 = document.createElement("div");
          div2.style.background = color2;
          div2.classList.add("btn-div");
          const slide2 = document.createElement("div");
          slide2.setAttribute("id", `btn-div-${slide_count}`);
          slide2.classList.add("slider-div");
          slide_count++;
          slide2.appendChild(button3);
          div2.appendChild(slide2);
          previousStep1 = previousStep;
          addCellOutline(
            "bpmnStatus",
            o_cellId,
            `2px solid ${color2}`,
            previousStep1
          );
          next_step = nextStep(o_cellId, o_currentStepObject1, "1");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button3, next_step, next_step_obj, o_cellId);
          //
          const button4 = document.createElement("button");
          button4.classList.add("btn-style", "btn");
          button4.style.display = "inline-block";
          button4.style.backgroundColor = "blue";
          button4.innerHTML = o_currentStepObject1.option2.split(":")[1];
          let color3;
          if (count === 0) {
            color3 = second_color.value;
          } else {
            color3 = getRandomColor(second_color.value);
          }
          const div3 = document.createElement("div");
          div3.style.background = color3;
          div3.classList.add("btn-div");
          const slide3 = document.createElement("div");
          slide3.setAttribute("id", `btn-div-${slide_count}`);
          slide3.classList.add("slider-div");
          slide_count++;
          slide3.appendChild(button4);
          div3.appendChild(slide3);
          next_step = nextStep(o_cellId, o_currentStepObject1, "2");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button4, next_step, next_step_obj, o_cellId);
          const button5 = document.createElement("button");
          button5.classList.add("btn-style", "btn");
          button5.style.display = "inline-block";
          button5.style.backgroundColor = "red";
          button5.innerHTML = o_currentStepObject1.option3.split(":")[1];
          let color4;
          if (count === 0) {
            color4 = third_color.value;
          } else {
            color4 = getRandomColor(third_color.value);
          }
          const div4 = document.createElement("div");
          div4.style.background = color4;
          div4.classList.add("btn-div");
          const slide4 = document.createElement("div");
          slide4.setAttribute("id", `btn-div-${slide_count}`);
          slide4.classList.add("slider-div");
          slide_count++;
          slide4.appendChild(button5);
          div4.appendChild(slide4);
          addSlides(slider_div, [div2, div3, div4]);
          slider(slide4);
          slider(slide2);
          slider(slide3);
          next_step = nextStep(o_cellId, o_currentStepObject1, "3");
          next_step_obj = copyCurrentParsed.process.sequence[next_step];
          event_function(button5, next_step, next_step_obj, o_cellId);
          count++;
          break;
        default:
          showWarning("Parallel thread: Unknown outbound - " + cellId);
      }
    }
  } else {
    b_two.style.display = "none";
    b_two.disabled = true;
    b_three.style.display = "none";
    b_three.disabled = true;
    switch (o_currentStepObject1.out.length) {
      case 1: // ONE BUTTON - "Proceed"
        b_one.style.display = "inline-block";
        b_one.disabled = false;
        previousStep1 = previousStep;
        o_currentStep = o_cellId;
        o_nxtStep1 = nextStep(
          o_cellId,
          o_currentStepObject1,
          o_currentStepObject1.out
        );
        if (o_currentStepObject1.BPMN.includes("STOP")) {
          b_one.dataset.nextStep = "stop";
          o_nxtStep1 = "stop";
        } else {
          b_one.dataset.nextStep = o_nxtStep1;
        }
        //
        o_nextStepObject1 = copyCurrentParsed.process.sequence[o_nxtStep1];
        if (o_currentStepObject1.task) {
          b_one.textContent = o_currentStepObject1.task;
        } else {
          b_one.textContent = ">";
        }
        b_one.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep1;
        b_one.style.backgroundColor = "green";
        addCellOutline("bpmnStatus", o_cellId, "1px solid red", previousStep1);
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep1];
        if (
          copyCurrentParsed.process.sequence[o_cellId].BPMN.includes("STOP")
        ) {
          document.getElementById("b_one").disabled = false;
        }
        if (copyCurrentParsed.process.sequence[o_cellId].BPMN === "SEQUENCE") {
          document.getElementById("b_two").disabled = true;
        }
        if (auto_sequence_flag && initiater === userId) {
          click(o_cellId, previousStep1, o_nxtStep1);
        }
        initiater = userId;
        break;
      case 2: // TWO BUTTONS -> YES-NO-Decision
        b_one.style.display = "inline-block";
        b_one.disabled = false;
        previousStep1 = previousStep;
        o_currentStep = o_cellId;
        o_nxtStep1 = nextStep(o_cellId, o_currentStepObject1, "Y");
        b_one.dataset.nextStep = o_nxtStep1;
        o_nextStepObject1 = copyCurrentParsed.process.sequence[o_nxtStep1];
        b_one.textContent = o_currentStepObject1.YES.split(":")[1];
        b_one.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep1;
        b_one.style.backgroundColor = "green";
        addCellOutline("bpmnStatus", o_cellId, "1px solid red", previousStep1);
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep1];
        //
        b_two.style.display = "inline-block";
        b_two.disabled = false;
        o_nxtStep2 = nextStep(o_cellId, o_currentStepObject1, "N");
        b_two.dataset.nextStep = o_nxtStep2;
        o_nextStepObject2 = copyCurrentParsed.process.sequence[o_nxtStep2];
        b_two.textContent = o_currentStepObject1.NO.split(":")[1];
        b_two.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep2;
        b_two.style.backgroundColor = "red";
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep2];
        /* o_currentStep = o_cellId; */
        break;
      case 3: // THRE BUTTONS -> OPTION1 OPTION2 OPTION3 - Selection
        b_one.style.display = "inline-block";
        b_one.disabled = false;
        previousStep1 = previousStep;
        o_nxtStep1 = nextStep(o_cellId, o_currentStepObject1, "1");
        b_one.dataset.nextStep = o_nxtStep1;
        o_nextStepObject1 = copyCurrentParsed.process.sequence[o_nxtStep1];
        if (o_currentStepObject1.option1.split(":")[1]) {
          b_one.textContent = o_currentStepObject1.task;
        } else {
          b_one.textContent = ">";
        }
        b_one.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep1;
        b_one.style.backgroundColor = "green";
        addCellOutline("bpmnStatus", o_cellId, "1px solid red", previousStep1);
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep1];
        o_currentStep = o_nxtStep1;
        b_one.textContent = o_currentStepObject1.option1.split(":")[1];
        //
        b_two.style.display = "inline-block";
        b_two.disabled = false;
        o_nxtStep2 = nextStep(o_cellId, o_currentStepObject1, "2");
        b_two.dataset.nextStep = o_nxtStep2;
        o_nextStepObject2 = copyCurrentParsed.process.sequence[o_nxtStep2];
        b_two.textContent = o_currentStepObject1.option2.split(":")[1];
        b_two.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep2;
        b_two.style.backgroundColor = "orange";
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep2];
        o_currentStep = o_nxtStep2;
        //
        b_three.style.display = "inline-block";
        b_three.disabled = false;
        o_nxtStep3 = nextStep(o_cellId, o_currentStepObject1, "3");
        b_three.dataset.nextStep = o_nxtStep3;
        o_nextStepObject3 = copyCurrentParsed.process.sequence[o_nxtStep3];
        b_three.textContent = o_currentStepObject1.option3.split(":")[1];
        b_three.title =
          o_currentStepObject1.BPMN + ": " + o_cellId + " -> " + o_nxtStep3;
        b_three.style.backgroundColor = "red";
        o_currentStepObjectBPMN =
          copyCurrentParsed.process.sequence[o_nxtStep3];
        o_currentStep = o_cellId;
        break;
      default:
        showWarning("Single thread: Unknown outbound - " + cellId);
    }
  }
}
function click(o_currentStep, previousStep, o_nxtStep1) {
  if (
    copyCurrentParsed.process.sequence[o_currentStep].BPMN === "SEQUENCE" &&
    copyCurrentParsed.process.sequence[previousStep].BPMN !== "SEQUENCE"
  ) {
    currentSequence = 0;
    /*https://yb1vt6zm8j.execute-api.us-east-1.amazonaws.com/lambda/ */
    timeLeft = delay;
    const message = {
      processInfoName: copyCurrentParsed.process.info.name,
      BPMN: copyCurrentParsed.process.sequence[o_currentStep].BPMN,
      task: copyCurrentParsed.process.sequence[o_currentStep].task,
      nextStep: o_nxtStep1,
      previousStep: o_currentStep,
      automated: true,
      initiater: "random",
    };
    sequenceArray.push(message);
    o_currentStep = o_nxtStep1;
    if (copyCurrentParsed.process.sequence[o_currentStep].out.length === 1) {
      o_nxtStep1 = nextStep(
        o_currentStep,
        copyCurrentParsed.process.sequence[o_currentStep],
        copyCurrentParsed.process.sequence[o_currentStep].out
      );
    }
    click(o_currentStep, previousStep, o_nxtStep1);
  } else {
    if (sequenceArray.length > 0) {
      let messageData;

      if (channel) {
        messageData = {
          channel: channel,
          messages: sequenceArray,
          delay: delay * 1000,
        };
      } else {
        messageData = {
          channel: channelId,
          messages: sequenceArray,
          delay: delay * 1000,
        };
      }

      sequenceArray = []; // Clear the sequenceArray
      console.log(messageData);
      fetch(
        "https://gpzln5aqrrsg7bprqphguvy2yi0espcq.lambda-url.us-east-1.on.aws",
        {
          method: "POST",
          body: JSON.stringify(messageData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => {
          console.log("Message sent:", data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  }
}

let previousStep1,
  previousStep2,
  previousStep3,
  O_nxtStep1,
  O_nxtStep2,
  O_nxtStep3,
  o_nextStepObject1,
  o_nextStepObject2,
  o_nextStepObject3,
  o_currentStep,
  o_cellId,
  o_currentStepObject1,
  o_currentStepObject2,
  o_currentStepObject3,
  o_currentStepObjectBPMN,
  o_startKey;
const first_color = document.querySelector("#path-color1");
const second_color = document.querySelector("#path-color2");
const third_color = document.querySelector("#path-color3");
const maxMessages = 100;
document.addEventListener("DOMContentLoaded", function () {
  // - - - - - - - - - - - - - - - - - - - - - - -I N I T
  showTheVoid(); //initial Process
  const copyCurrent = JSON.stringify(current, null, 2);
  copyCurrentParsed = JSON.parse(copyCurrent);
  createAndDrawBPMNTable(copyCurrentParsed, "bpmnStatus", "canvasRoot0");
  o_startKey = findStartKey(copyCurrentParsed.process.sequence);
  o_currentStep = o_startKey;
  o_currentStepObject1 = copyCurrentParsed.process.sequence[o_startKey];
  o_nxtStep1 = nextStep(o_startKey, o_currentStepObject1, "-");
  b_one.dataset.nextStep = o_nxtStep1;
  b_one.disabled = false;
  o_nextStepObject1 = copyCurrentParsed.process.sequence[o_nxtStep1];
  const h4Tag = copyCurrentParsed.process.sequence[o_startKey];
  if (h4Tag.task) {
    document.getElementById("callToAction").innerHTML = h4Tag.task;
  } else {
    document.getElementById("callToAction").innerHTML = h4Tag.BPMN;
  }
  // b_one.textContent = o_currentStepObject1.task;
  if (o_currentStepObject1.task) {
    b_one.textContent = o_currentStepObject1.task;
  } else {
    b_one.textContent = ">";
  }
  b_one.title =
    o_currentStepObject1.BPMN + ": " + o_startKey + " -> " + o_nxtStep1;
  b_one.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep1, o_nextStepObject1, o_currentStep);
  });
  b_two.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep2, o_nextStepObject2, o_currentStep);
  });
  b_three.addEventListener("click", function (event) {
    handle_bttn_click(event, o_nxtStep3, o_nextStepObject3, o_currentStep);
  });
  const now = new Date();
  const dateTimeString = now
    .toLocaleString("en-GB", {
      timeZone: "UTC",
    })
    .replace(",", "");
  const p = findPreviousCell(o_currentStep);
  addCellOutline("bpmnStatus", o_startKey, "1px solid red", p);
  // start model for the channel
  if (channel) {
    document.querySelector("#loader").style.visibility = "visible";
    document.querySelector(".tabs").style.display = "none";
    document
      .getElementById("copy-button")
      .setAttribute("data-value", currentURL);
    burgerFunc();
    copyFunc(currentURL);
    pubnub.subscribe({
      channels: [channel],
    });
    // Start retrieving message history
    retrieveHistory(channel, 0);
  } else {
    document.querySelector("#loader").style.visibility = "hidden";
  }
});
// Function to process retrieved messages
function processMessages(messages) {
  const historyMessages = messages;
  const messageWithTotalChunks = historyMessages.find((message) =>
    message.entry.hasOwnProperty("totalChunks")
  );
  let chunkLength = messageWithTotalChunks.entry.totalChunks;
  let joinedData = "";
  for (let i = 0; i < chunkLength; i++) {
    const messageToPrint = historyMessages.find(
      (message) => message.entry.chunkIndex === i
    );
    if (messageToPrint) {
      const parsedMessage = messageToPrint.entry.data;
      joinedData += parsedMessage;
    }
  }
  document.querySelector("#json-input").value = JSON.parse(joinedData);
  document.querySelector("#ACTIVATE").click();
  if (historyMessages.length !== chunkLength) {
    const messagesWithNextStep = historyMessages.filter((message) =>
      message.entry.hasOwnProperty("nextStep")
    );
    for (i = 0; i < messagesWithNextStep.length; i++) {
      message = messagesWithNextStep[i];
      step = message.entry.nextStep;
      buttons = document.querySelectorAll(".btn-div button");
      buttons.forEach((button) => {
        buttonStep = button.getAttribute("data-next-step");
        if (buttonStep == step) {
          pass = false;
          auto_sequence_flag = false;
          button.click();
        }
      });
    }
    document.querySelector("#loader").style.visibility = "hidden";
    flowComplete = true;
    auto_sequence_flag = true;
  }
}
// Function to retrieve message history with pagination
function retrieveHistory(channel, startTimeToken, accumulatedMessages = []) {
  pubnub.history(
    {
      channel: channel,
      count: maxMessages,
      start: startTimeToken,
    },
    (status, response) => {
      if (status.error) {
        console.error("Error retrieving message history:", status.errorData);
        return;
      }
      const messages = response.messages;
      if (messages.length == 0) {
        showWarning("Channel not found, loading default model");
        document.querySelector("#loader").style.visibility = "hidden";
      }
      accumulatedMessages.unshift(...messages);
      if (messages.length === maxMessages) {
        // If the maximum number of messages is retrieved, make another request
        const nextStartTimeToken = messages[0].timetoken;
        retrieveHistory(channel, nextStartTimeToken, accumulatedMessages);
      } else {
        // All messages are retrieved
        processMessages(accumulatedMessages);
      }
    }
  );
}

function slider(element) {
  $(element).slick({
    dots: true, // Display dots navigation
    arrows: false, // Hide prev/next buttons
    slidesToShow: 1, // Display one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    // Other options for the slider
  });
}

function slider_first(element) {
  $(element).slick({
    dots: true, // Display dots navigation
    arrows: false, // Hide prev/next buttons
    slidesToShow: 3, // Display one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    // Other options for the slider
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
}

function addSlides(node, divs) {
  for (let i = 0; i < divs.length; i++) {
    $(node).slick("slickAdd", divs[i]);
  }
}

function removeSlides(node, divs) {
  const slideIndexes = [];
  // Collect the slide indexes in reverse order
  for (let i = divs.length - 1; i >= 0; i--) {
    slideIndexes.push(i);
  }
  for (let i = 0; i < slideIndexes.length; i++) {
    $(node).slick("slickRemove", slideIndexes[i]);
  }
}

function createAndDrawBPMNTable(copyCurrentParsed, tableName, canvasRoot) {
  b_one.style.display = "none";
  b_two.style.display = "none";
  b_three.style.display = "none";
  b_one.style.display = "inline-block";
  b_one.disabled = false;
  const BPMN_status = JSON.stringify(copyCurrentParsed, null, 2);
  const BPMN_status_parsed = JSON.parse(BPMN_status);
  const colsStatus = BPMN_status_parsed.process.info.cols;
  const rowsStatus = BPMN_status_parsed.process.info.rows;
  const memory1 = BPMN_status_parsed.process.settings.verbose;
  const memory2 = BPMN_status_parsed.process.settings.tileSize;
  const memory3 = BPMN_status_parsed.process.settings.tilebackgroundColor1;
  const memory4 = BPMN_status_parsed.process.settings.tilebackgroundColor2;
  BPMN_status_parsed.process.settings.verbose = "0";
  BPMN_status_parsed.process.settings.tileSize = 50;
  BPMN_status_parsed.process.settings.tilebackgroundColor1 = "#FAFAFA";
  BPMN_status_parsed.process.settings.tilebackgroundColor2 = "#FFFFFF";
  const sizeStatus = BPMN_status_parsed.process.settings.tileSize;
  const color1_Status =
    BPMN_status_parsed.process.settings.tilebackgroundColor1;
  const color2_Status =
    BPMN_status_parsed.process.settings.tilebackgroundColor2;
  generateTable(
    tableName,
    rowsStatus,
    colsStatus,
    sizeStatus,
    color1_Status,
    color2_Status,
    canvasRoot
  );
  drawProcess(BPMN_status_parsed, tableName, false);
  current.process.settings.verbose = memory1; //  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Why?
  current.process.settings.tileSize = memory2;
  current.process.settings.tilebackgroundColor1 = memory3;
  current.process.settings.tilebackgroundColor2 = memory4;
  current.process.settings.tileSize = memory2;
}
//
// T R A C E
//
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const hex = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    color += hex;
  }
  // calculate the perceived brightness of the color using the formula (R * 299 + G * 587 + B * 114) / 1000
  const brightness =
    (parseInt(color.substr(1, 2), 16) * 299 +
      parseInt(color.substr(3, 2), 16) * 587 +
      parseInt(color.substr(5, 2), 16) * 114) /
    1000;
  // if the brightness is too high (i.e., the color is too light), darken the color by subtracting a random amount from each component
  if (brightness > 127) {
    const amount = Math.floor(Math.random() * 96) + 32; // choose a random amount between 32 and 127
    const red = Math.max(parseInt(color.substr(1, 2), 16) - amount, 0)
      .toString(16)
      .padStart(2, "0");
    const green = Math.max(parseInt(color.substr(3, 2), 16) - amount, 0)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.max(parseInt(color.substr(5, 2), 16) - amount, 0)
      .toString(16)
      .padStart(2, "0");
    color = `#${red}${green}${blue}`;
  }
  return color;
}

function addCellOutline(tableId, cellId, outlineStyle, previousCellId) {
  const table = document.getElementById(tableId);
  let targetCell = null;
  let previousCell = null;
  for (let i = 0, row; (row = table.rows[i]); i++) {
    for (let j = 0, cell; (cell = row.cells[j]); j++) {
      if (cell.id === cellId) {
        targetCell = cell;
      } else if (cell.id === previousCellId) {
        previousCell = cell;
      }
    }
  }
  if (checkAllPaths(previousCellId)) {
    if (previousCell) {
      previousCell.style.border = "";
    }
  }
  if (targetCell) {
    targetCell.style.border = outlineStyle;
    const outlineColor = outlineStyle.split(" ")[2]; // get the third element from outlineStyle string (color)
    const buttons = targetCell.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = outlineColor;
    });
  }
}

function checkAllPaths(cell) {
  const cellObj = copyCurrentParsed.process.sequence[cell];
  if (cellObj.BPMN === "ANDSPLIT") {
    let i;
    for (i = 0; i < cellArray.length; i++) {
      if (cellArray[i].cellId === cell) {
        cellArray[i].count++;
        break;
      }
    }
    if (i === cellArray.length) {
      cellArray.push({
        cellId: cell,
        cellIn: cellObj.out,
        count: 1,
      });
    }
    if (cellArray[i].cellIn.length === cellArray[i].count) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function checkIfThreadReached(threadId, threadObj) {
  let i;
  for (i = 0; i < joinArray.length; i++) {
    if (joinArray[i].cellId === threadId) {
      joinArray[i].count++;
      break;
    }
  }
  if (i === joinArray.length) {
    joinArray.push({
      cellId: threadId,
      cellIn: threadObj.in,
      count: 1,
    });
  }
  if (joinArray[i].cellIn.length === joinArray[i].count) {
    return true;
  } else {
    return false;
  }
}

function showWarning(message) {
  const warning = document.createElement("div");
  warning.textContent = message;
  warning.style.position = "absolute";
  warning.style.top = "50%";
  warning.style.left = "50%";
  warning.style.transform = "translate(-50%, -50%)";
  warning.style.padding = "20px";
  warning.style.border = "1px solid red";
  warning.style.backgroundColor = "pink";
  warning.style.borderRadius = "5px";
  document.body.appendChild(warning);
  setTimeout(function () {
    warning.remove();
  }, 2000);
}
//
// SAVE
//
const dim = 100;
// const symbols = document.querySelector("#bpmnSymbols defs");
const processName = document.querySelector("#Process-Name");
const baseUrl = "https://hook.eu1.make.com/r1hoz4qb1gorj6silab1hm6m74eqj1he";
const btn = document.querySelector("#btn-save");
async function createPng() {
  const { cols, rows } = current.process.info;
  const { tilebackgroundColor1: col1, tilebackgroundColor2: col2 } =
    current.process.settings;
  const root = document.querySelector("#bpmnCanvas");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `0 0 ${cols * 100} ${rows * 100}`);
  svg.prepend(symbols.cloneNode(true));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const id = `r${i + 1}c${j + 1}`;
      const dx = j * 100;
      const dy = i * 100;
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", dx);
      rect.setAttribute("y", dy);
      rect.setAttribute("width", 100);
      rect.setAttribute("height", 100);
      rect.setAttribute("fill", (i + j) % 2 ? col1 : col2);
      svg.append(rect);
      const cell = root.querySelector(`#${id} svg`);
      for (let el of cell.children) {
        const cp = el.cloneNode(true);
        cp.setAttribute("x", +cp.getAttribute("x") + dx);
        cp.setAttribute("y", +cp.getAttribute("y") + dy);
        if (cp.tagName === "use") {
          cp.setAttribute("width", "100");
          cp.setAttribute("height", "100");
          cp.setAttribute("href", cp.getAttribute("xlink:href"));
          cp.removeAttribute("xlink:href");
        }
        svg.append(cp);
      }
    }
  }
  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");
  cvs.width = cols * 100;
  cvs.height = rows * 100;
  return new Promise(function (res) {
    const img = new Image();
    img.src =
      "data:image/svg+xml;charset=utf8," +
      encodeURIComponent(svg.outerHTML.replaceAll("xlink:", ""));
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      res(cvs.toDataURL("image/png"));
    };
  });
}
async function pngToImgurUrl(url) {
  const imgur = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: "Client-ID a1539f5e8c36b32",
      Accept: "application/json",
    },
    body: url.split(",")[1],
  }).then((response) => response.json());
  console.log(imgur.data.link);
  return imgur.data.link;
}
async function search() {
  return fetch(
    `${baseUrl}?${new URLSearchParams({
      operator: "SEARCH",
      value: current.process.info.name,
    }).toString()}`
  )
    .then((res) => res.text())
    .then((str) => str.split(";"));
}
async function upsert(id) {
  for (const cell of Object.values(current.process.sequence)) {
    for (const [attr, value] of Object.entries(cell)) {
      if (value === "") {
        //delete cell[attr];
        delete cell[attr];
      }
    }
  }
  let start = Date.now(); // Mark the start time
  const imageUrl = await pngToImgurUrl(await createPng());
  console.log(`Canvas generation took ${(Date.now() - start) / 1000}s`); // Log the time taken
  const payload = {
    method: "POST",
    body: JSON.stringify({
      author: current.process.info.author,
      description: current.process.info.description,
      name: current.process.info.name,
      version: current.process.info.version,
      imageUrl: imageUrl,
      model: JSON.stringify(current),
      id,
    }),
  };
  //  console.log("upsert before fetch", payload);
  await fetch(
    `${baseUrl}?${new URLSearchParams({
      operator: "UPSERT",
    }).toString()}`,
    payload
  );
  console.log(`Post request took ${(Date.now() - start) / 1000}ms`); // Log the time taken
}
processName.oninput = function () {
  current.process.info.name = processName.innerHTML;
};

function succHandler() {
  btn.innerHTML = "SUCCESS";
  btn.style.background = "lightgreen";
  btn.onblur = function () {
    btn.innerHTML = "SAVE";
    btn.style.background = "blue";
    btn.onclick = sendHandler;
  };
}
async function sendHandler() {
  btn.innerHTML = "SAVING...";
  btn.style.background = "gray";
  btn.onclick = null;
  const [num, id] = await search();
  if (num !== "0") {
    btn.innerHTML = "UPDATE?";
    btn.style.background = "red";
    btn.onclick = async function () {
      btn.innerHTML = "UPDATING...";
      btn.style.background = "gray";
      btn.onclick = null;
      await upsert(id);
      succHandler();
    };
  } else {
    await upsert();
    succHandler();
  }
}
btn.onclick = sendHandler;
