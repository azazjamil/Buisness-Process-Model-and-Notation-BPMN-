const spdbttnStartScheduled = document.getElementById(
  "SPDBTTN-Start-Scheduled"
);
spdbttnStartScheduled.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#TIMER-START_0_N",
    "#TIMER-START_0_E",
    "#TIMER-START_0_S",
    "#TIMER-START_0_W",
  ]);
});
const spdbttnStartMsg = document.getElementById("SPDBTTN-Start-Msg");
spdbttnStartMsg.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-START_0_N",
    "#MSG-START_0_E",
    "#MSG-START_0_S",
    "#MSG-START_0_W",
  ]);
});
const spdbttnStartMsgPlus = document.getElementById("SPDBTTN-Start-Msg-Plus");
spdbttnStartMsgPlus.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-START-E_0_N",
    "#MSG-START-S_0_N",
    "#MSG-START-W_0_N",
    "#MSG-START-S_0_E",
    "#MSG-START-W_0_E",
    "#MSG-START-N_0_E",
    "#MSG-START-W_0_S",
    "#MSG-START-N_0_S",
    "#MSG-START-E_0_S",
    "#MSG-START-N_0_W",
    "#MSG-START-E_0_W",
    "#MSG-START-S_0_W",
    "#MSG-START-E-D_0_N",
    "#MSG-START-S-D_0_N",
    "#MSG-START-W-D_0_N",
    "#MSG-START-S-D_0_E",
    "#MSG-START-W-D_0_E",
    "#MSG-START-N-D_0_E",
    "#MSG-START-W-D_0_S",
    "#MSG-START-N-D_0_S",
    "#MSG-START-E-D_0_S",
    "#MSG-START-N-D_0_W",
    "#MSG-START-E-D_0_W",
    "#MSG-START-S-D_0_W",
  ]);
});
const spdbttnStartManual = document.getElementById("SPDBTTN-Start-Manual");
spdbttnStartManual.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#START_0_N",
    "#START_0_E",
    "#START_0_S",
    "#START_0_W",
  ]);
});
const spdbttnJoinGatewayOr = document.getElementById("SPDBTTN-Join-Gateway-Or");
spdbttnJoinGatewayOr.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#ORJOIN_SW_E",
    "#ORJOIN_NS_E",
    "#ORJOIN_WN_E",
    "#ORJOIN_SWN_E",
    "#ORJOIN_WN_S",
    "#ORJOIN_WE_S",
    "#ORJOIN_NE_S",
    "#ORJOIN_NEW_S",
    "#ORJOIN_NE_W",
    "#ORJOIN_NS_W",
    "#ORJOIN_ES_W",
    "#ORJOIN_NES_W",
    "#ORJOIN_ES_N",
    "#ORJOIN_EW_N",
    "#ORJOIN_WS_N",
    "#ORJOIN_EWS_N",
  ]);
});
const spdbttnJoinGatewayXor = document.getElementById(
  "SPDBTTN-Join-Gateway-Xor"
);
spdbttnJoinGatewayXor.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#XORJOIN_SW_E",
    "#XORJOIN_NS_E",
    "#XORJOIN_NW_E",
    "#XORJOIN_SWN_E",
    "#XORJOIN_WN_S",
    "#XORJOIN_NE_S",
    "#XORJOIN_EW_S",
    "#XORJOIN_NEW_S",
    "#XORJOIN_NE_W",
    "#XORJOIN_ES_W",
    "#XORJOIN_SN_W",
    "#XORJOIN_NES_W",
    "#XORJOIN_ES_N",
    "#XORJOIN_SW_N",
    "#XORJOIN_WE_N",
    "#XORJOIN_ESW_N",
  ]);
});
const spdbttnJoinGatewayAnd = document.getElementById(
  "SPDBTTN-Join-Gateway-And"
);
spdbttnJoinGatewayAnd.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#ANDJOIN_SW_E",
    "#ANDJOIN_NS_E",
    "#ANDJOIN_WN_E",
    "#ANDJOIN_SWN_E",
    "#ANDJOIN_WN_S",
    "#ANDJOIN_WE_S",
    "#ANDJOIN_NE_S",
    "#ANDJOIN_NEW_S",
    "#ANDJOIN_NE_W",
    "#ANDJOIN_NS_W",
    "#ANDJOIN_ES_W",
    "#ANDJOIN_NES_W",
    "#ANDJOIN_ES_N",
    "#ANDJOIN_EW_N",
    "#ANDJOIN_WS_N",
    "#ANDJOIN_EWS_N",
  ]);
});
const spdbttnSplitGatewayEvent = document.getElementById(
  "SPDBTTN-Split-Gateway-Event"
);
spdbttnSplitGatewayEvent.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#EVENTXORSPLIT_W_NE",
    "#EVENTXORSPLIT_W_NS",
    "#EVENTXORSPLIT_W_ES",
    "#EVENTXORSPLIT_W_NES",
    "#EVENTXORSPLIT_N_ES",
    "#EVENTXORSPLIT_N_EW",
    "#EVENTXORSPLIT_N_SW",
    "#EVENTXORSPLIT_N_ESW",
    "#EVENTXORSPLIT_E_SW",
    "#EVENTXORSPLIT_E_SN",
    "#EVENTXORSPLIT_E_WN",
    "#EVENTXORSPLIT_E_SWN",
    "#EVENTXORSPLIT_S_WN",
    "#EVENTXORSPLIT_S_WE",
    "#EVENTXORSPLIT_S_NE",
    "#EVENTXORSPLIT_S_WNE",
  ]);
});
const spdbttnSplitGatewayOr = document.getElementById(
  "SPDBTTN-Split-Gateway-Or"
);
spdbttnSplitGatewayOr.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#ORSPLIT_W_NE",
    "#ORSPLIT_W_NS",
    "#ORSPLIT_W_ES",
    "#ORSPLIT_W_NES",
    "#ORSPLIT_N_ES",
    "#ORSPLIT_N_EW",
    "#ORSPLIT_N_SW",
    "#ORSPLIT_N_ESW",
    "#ORSPLIT_E_SW",
    "#ORSPLIT_E_SN",
    "#ORSPLIT_E_WN",
    "#ORSPLIT_E_SWN",
    "#ORSPLIT_S_WN",
    "#ORSPLIT_S_WE",
    "#ORSPLIT_S_NE",
    "#ORSPLIT_S_WNE",
  ]);
});
const spdbttnSplitGatewayXor = document.getElementById(
  "SPDBTTN-Split-Gateway-Xor"
);
spdbttnSplitGatewayXor.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#AUTOXORSPLIT_W_NE",
    "#AUTOXORSPLIT_W_NS",
    "#AUTOXORSPLIT_W_ES",
    "#AUTOXORSPLIT_W_NES",
    "#AUTOXORSPLIT_N_ES",
    "#AUTOXORSPLIT_N_EW",
    "#AUTOXORSPLIT_N_SW",
    "#AUTOXORSPLIT_N_ESW",
    "#AUTOXORSPLIT_E_SW",
    "#AUTOXORSPLIT_E_SN",
    "#AUTOXORSPLIT_E_WN",
    "#AUTOXORSPLIT_E_SWN",
    "#AUTOXORSPLIT_S_WN",
    "#AUTOXORSPLIT_S_WE",
    "#AUTOXORSPLIT_S_NE",
    "#AUTOXORSPLIT_S_WNE",
  ]);
});
const spdbttnSplitGatewayHumanXor = document.getElementById(
  "SPDBTTN-Split-Gateway-HumanXor"
);
spdbttnSplitGatewayHumanXor.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#XORSPLIT_W_NE",
    "#XORSPLIT_W_NS",
    "#XORSPLIT_W_ES",
    "#XORSPLIT_W_NES",
    "#XORSPLIT_N_ES",
    "#XORSPLIT_N_EW",
    "#XORSPLIT_N_SW",
    "#XORSPLIT_N_ESW",
    "#XORSPLIT_E_SW",
    "#XORSPLIT_E_NS",
    "#XORSPLIT_E_WN",
    "#XORSPLIT_E_SWN",
    "#XORSPLIT_S_WN",
    "#XORSPLIT_S_WE",
    "#XORSPLIT_S_NE",
    "#XORSPLIT_S_WNE",
  ]);
});
const spdbttnSplitGatewayAnd = document.getElementById(
  "SPDBTTN-Split-Gateway-And"
);
spdbttnSplitGatewayAnd.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#ANDSPLIT_W_NE",
    "#ANDSPLIT_W_NS",
    "#ANDSPLIT_W_ES",
    "#ANDSPLIT_W_NES",
    "#ANDSPLIT_N_ES",
    "#ANDSPLIT_N_EW",
    "#ANDSPLIT_N_SW",
    "#ANDSPLIT_N_ESW",
    "#ANDSPLIT_E_SW",
    "#ANDSPLIT_E_SN",
    "#ANDSPLIT_E_WN",
    "#ANDSPLIT_E_SWN",
    "#ANDSPLIT_S_WN",
    "#ANDSPLIT_S_WE",
    "#ANDSPLIT_S_NE",
    "#ANDSPLIT_S_WNE",
  ]);
});
const spdbttnConnection = document.getElementById("SPDBTTN-Connection");
spdbttnConnection.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#SEQUENCE_N_S",
    "#SEQUENCE_E_W",
    "#SEQUENCE_S_N",
    "#SEQUENCE_W_E",
    "#SEQUENCE_N_E",
    "#SEQUENCE_N_W",
    "#SEQUENCE_E_S",
    "#SEQUENCE_E_N",
    "#SEQUENCE_S_E",
    "#SEQUENCE_S_W",
    "#SEQUENCE_W_N",
    "#SEQUENCE_W_S",
    "#SEQUENCE-D_N_S",
    "#SEQUENCE-D_E_W",
    "#SEQUENCE-D_S_N",
    "#SEQUENCE-D_W_E",
    "#SEQUENCE-D_N_E",
    "#SEQUENCE-D_N_W",
    "#SEQUENCE-D_E_S",
    "#SEQUENCE-D_E_N",
    "#SEQUENCE-D_S_E",
    "#SEQUENCE-D_S_W",
    "#SEQUENCE-D_W_N",
    "#SEQUENCE-D_W_S",
  ]);
});
const spdbttnMSGflow = document.getElementById("SPDBTTN-MessageFlow");
spdbttnMSGflow.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-Flow_W_E",
    "#MSG-Flow_N_S",
    "#MSG-Flow_W_N",
    "#MSG-Flow_E_N",
    "#MSG-Flow_S_E",
    "#MSG-Flow_S_W",
    "#MSG-Flow-D_W_E",
    "#MSG-Flow-D_N_S",
    "#MSG-Flow-D_W_N",
    "#MSG-Flow-D_E_N",
    "#MSG-Flow-D_S_E",
    "#MSG-Flow-D_S_W",
  ]);
});
const spdbttnMSGflowSync = document.getElementById("SPDBTTN-MessageFlowSync");
spdbttnMSGflowSync.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-Flow-Sync_W_E",
    "#MSG-Flow-Sync_N_S",
    "#MSG-Flow-Sync_W_N",
    "#MSG-Flow-Sync_E_N",
    "#MSG-Flow-Sync_S_E",
    "#MSG-Flow-Sync_S_W",
    "#MSG-Flow-Sync-D_W_E",
    "#MSG-Flow-Sync-D_N_S",
    "#MSG-Flow-Sync-D_W_N",
    "#MSG-Flow-Sync-D_E_N",
    "#MSG-Flow-Sync-D_S_E",
    "#MSG-Flow-Sync-D_S_W",
  ]);
});
const spdbttnVoid = document.getElementById("SPDBTTN-void");
spdbttnVoid.addEventListener("click", (event) => {
  current = handleClick(event, ["#VOID_0_0"]);
});
const spdbttnActivityHuman = document.getElementById("SPDBTTN-Activity-Human");
spdbttnActivityHuman.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#TASK_N_E",
    "#TASK_N_S",
    "#TASK_N_W",
    "#TASK_E_S",
    "#TASK_E_W",
    "#TASK_E_N",
    "#TASK_S_W",
    "#TASK_S_N",
    "#TASK_S_E",
    "#TASK_W_N",
    "#TASK_W_E",
    "#TASK_W_S",
  ]);
});
const spdbttnActivityConsume = document.getElementById(
  "SPDBTTN-Activity-Consume"
);
spdbttnActivityConsume.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#CONSUMER-TASK-S_N_E",
    "#CONSUMER-TASK-W_N_E",
    "#CONSUMER-TASK-W_N_S",
    "#CONSUMER-TASK-E_N_S",
    "#CONSUMER-TASK-E_N_W",
    "#CONSUMER-TASK-S_N_W",
    "#CONSUMER-TASK-S_E_W",
    "#CONSUMER-TASK-N_E_W",
    "#CONSUMER-TASK-S_E_N",
    "#CONSUMER-TASK-W_E_N",
    "#CONSUMER-TASK-W_E_S",
    "#CONSUMER-TASK-N_E_S",
    "#CONSUMER-TASK-N_S_W",
    "#CONSUMER-TASK-E_S_W",
    "#CONSUMER-TASK-E_S_N",
    "#CONSUMER-TASK-W_S_N",
    "#CONSUMER-TASK-N_S_E",
    "#CONSUMER-TASK-W_S_E",
    "#CONSUMER-TASK-E_W_N",
    "#CONSUMER-TASK-S_W_N",
    "#CONSUMER-TASK-N_W_E",
    "#CONSUMER-TASK-S_W_E",
    "#CONSUMER-TASK-N_W_S",
    "#CONSUMER-TASK-E_W_S",
  ]);
});
const spdbttnActivityServer = document.getElementById(
  "SPDBTTN-Activity-Provide"
);
spdbttnActivityServer.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#SERVICE-TASK-E_W_N",
    "#SERVICE-TASK-S_W_N",
    "#SERVICE-TASK-N_W_E",
    "#SERVICE-TASK-S_W_E",
    "#SERVICE-TASK-N_W_S",
    "#SERVICE-TASK-E_W_S",
    "#SERVICE-TASK_N_E",
    "#SERVICE-TASK_N_S",
    "#SERVICE-TASK_N_W",
    "#SERVICE-TASK_E_S",
    "#SERVICE-TASK_E_W",
    "#SERVICE-TASK_E_N",
    "#SERVICE-TASK_S_W",
    "#SERVICE-TASK_S_N",
    "#SERVICE-TASK_S_E",
  ]);
});
const spdbttnStopTerminated = document.getElementById("SPDBTTN-End-Terminated");
spdbttnStopTerminated.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#STOP-ALL_N_0",
    "#STOP-ALL_E_0",
    "#STOP-ALL_S_0",
    "#STOP-ALL_W_0",
  ]);
});
const spdbttnStopMsg = document.getElementById("SPDBTTN-End-Msg");
spdbttnStopMsg.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-STOP_N_0",
    "#MSG-STOP_E_0",
    "#MSG-STOP_S_0",
    "#MSG-STOP_W_0",
  ]);
});
const spdbttnStopMsgPlus = document.getElementById("SPDBTTN-End-Msg-Plus");
spdbttnStopMsgPlus.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-STOP-E_N_0",
    "#MSG-STOP-S_N_0",
    "#MSG-STOP-W_N_0",
    "#MSG-STOP-S_E_0",
    "#MSG-STOP-W_E_0",
    "#MSG-STOP-N_E_0",
    "#MSG-STOP-W_S_0",
    "#MSG-STOP-N_S_0",
    "#MSG-STOP-E_S_0",
    "#MSG-STOP-N_W_0",
    "#MSG-STOP-E_W_0",
    "#MSG-STOP-S_W_0",
    "#MSG-STOP-E-D_N_0",
    "#MSG-STOP-S-D_N_0",
    "#MSG-STOP-W-D_N_0",
    "#MSG-STOP-S-D_E_0",
    "#MSG-STOP-W-D_E_0",
    "#MSG-STOP-N-D_E_0",
    "#MSG-STOP-W-D_S_0",
    "#MSG-STOP-N-D_S_0",
    "#MSG-STOP-E-D_S_0",
    "#MSG-STOP-N-D_W_0",
    "#MSG-STOP-E-D_W_0",
    "#MSG-STOP-S-D_W_0",
  ]);
});
const spdbttnStopManual = document.getElementById("SPDBTTN-End-Manual");
spdbttnStopManual.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#STOP_N_0",
    "#STOP_E_0",
    "#STOP_S_0",
    "#STOP_W_0",
  ]);
});
const spdbttnEventMsgSndMessage = document.getElementById(
  "SPDBTTN-Intermediate-Message-SND"
);
spdbttnEventMsgSndMessage.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-SND-EVENT_N_E",
    "#MSG-SND-EVENT_N_S",
    "#MSG-SND-EVENT_N_W",
    "#MSG-SND-EVENT_E_S",
    "#MSG-SND-EVENT_E_W",
    "#MSG-SND-EVENT_E_N",
    "#MSG-SND-EVENT_S_W",
    "#MSG-SND-EVENT_S_N",
    "#MSG-SND-EVENT_S_E",
    "#MSG-SND-EVENT_W_N",
    "#MSG-SND-EVENT_W_E",
    "#MSG-SND-EVENT_W_S",
  ]);
});
const spdbttnEventMsgSndMessagePlus = document.getElementById(
  "SPDBTTN-Intermediate-Message-SND-Plus"
);
spdbttnEventMsgSndMessagePlus.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-SND-EVENT-S_N_E",
    "#MSG-SND-EVENT-W_N_E",
    "#MSG-SND-EVENT-W_N_S",
    "#MSG-SND-EVENT-E_N_S",
    "#MSG-SND-EVENT-E_N_W",
    "#MSG-SND-EVENT-S_N_W",
    "#MSG-SND-EVENT-W_E_S",
    "#MSG-SND-EVENT-N_E_S",
    "#MSG-SND-EVENT-N_E_W",
    "#MSG-SND-EVENT-S_E_W",
    "#MSG-SND-EVENT-S_E_N",
    "#MSG-SND-EVENT-W_E_N",
    "#MSG-SND-EVENT-N_S_W",
    "#MSG-SND-EVENT-E_S_W",
    "#MSG-SND-EVENT-W_S_N",
    "#MSG-SND-EVENT-E_S_N",
    "#MSG-SND-EVENT-W_S_E",
    "#MSG-SND-EVENT-N_S_E",
    "#MSG-SND-EVENT-E_W_N",
    "#MSG-SND-EVENT-S_W_N",
    "#MSG-SND-EVENT-S_W_E",
    "#MSG-SND-EVENT-N_W_E",
    "#MSG-SND-EVENT-N_W_S",
    "#MSG-SND-EVENT-E_W_S",
  ]);
});
const spdbttnEventMsgRcvMessage = document.getElementById(
  "SPDBTTN-Intermediate-Message-RCV"
);
spdbttnEventMsgRcvMessage.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-RCV-EVENT_N_E",
    "#MSG-RCV-EVENT_N_S",
    "#MSG-RCV-EVENT_N_W",
    "#MSG-RCV-EVENT_E_S",
    "#MSG-RCV-EVENT_E_W",
    "#MSG-RCV-EVENT_E_N",
    "#MSG-RCV-EVENT_S_W",
    "#MSG-RCV-EVENT_S_N",
    "#MSG-RCV-EVENT_S_E",
    "#MSG-RCV-EVENT_W_N",
    "#MSG-RCV-EVENT_W_E",
    "#MSG-RCV-EVENT_W_S",
  ]);
});
const spdbttnEventMsgRcvMessagePlus = document.getElementById(
  "SPDBTTN-Intermediate-Message-RCV-Plus"
);
spdbttnEventMsgRcvMessagePlus.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#MSG-RCV-EVENT-S_N_E",
    "#MSG-RCV-EVENT-W_N_E",
    "#MSG-RCV-EVENT-W_N_S",
    "#MSG-RCV-EVENT-E_N_S",
    "#MSG-RCV-EVENT-E_N_W",
    "#MSG-RCV-EVENT-S_N_W",
    "#MSG-RCV-EVENT-W_E_S",
    "#MSG-RCV-EVENT-N_E_S",
    "#MSG-RCV-EVENT-N_E_W",
    "#MSG-RCV-EVENT-S_E_W",
    "#MSG-RCV-EVENT-S_E_N",
    "#MSG-RCV-EVENT-W_E_N",
    "#MSG-RCV-EVENT-N_S_W",
    "#MSG-RCV-EVENT-E_S_W",
    "#MSG-RCV-EVENT-W_S_N",
    "#MSG-RCV-EVENT-E_S_N",
    "#MSG-RCV-EVENT-W_S_E",
    "#MSG-RCV-EVENT-N_S_E",
    "#MSG-RCV-EVENT-E_W_N",
    "#MSG-RCV-EVENT-S_W_N",
    "#MSG-RCV-EVENT-S_W_E",
    "#MSG-RCV-EVENT-N_W_E",
    "#MSG-RCV-EVENT-N_W_S",
    "#MSG-RCV-EVENT-E_W_S",
  ]);
});
const spdbttnEventTime = document.getElementById("SPDBTTN-Intermediate-Time");
spdbttnEventTime.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#TIMER-EVENT_N_E",
    "#TIMER-EVENT_N_S",
    "#TIMER-EVENT_N_W",
    "#TIMER-EVENT_E_S",
    "#TIMER-EVENT_E_W",
    "#TIMER-EVENT_E_N",
    "#TIMER-EVENT_S_W",
    "#TIMER-EVENT_S_N",
    "#TIMER-EVENT_S_E",
    "#TIMER-EVENT_W_N",
    "#TIMER-EVENT_W_E",
    "#TIMER-EVENT_W_S",
  ]);
});
const spdbttnEventLog = document.getElementById("SPDBTTN-Intermediate-Log");
spdbttnEventLog.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#EVENT_N_E",
    "#EVENT_N_S",
    "#EVENT_N_W",
    "#EVENT_E_S",
    "#EVENT_E_W",
    "#EVENT_E_N",
    "#EVENT_S_W",
    "#EVENT_S_N",
    "#EVENT_S_E",
    "#EVENT_W_N",
    "#EVENT_W_E",
    "#EVENT_W_S",
  ]);
});
const spdbttnComment = document.getElementById("SPDBTTN-Comment");
spdbttnComment.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#COMMENT_N_0",
    "#COMMENT_E_0",
    "#COMMENT_S_0",
    "#COMMENT_W_0",
  ]);
});
const spdbttnPartnerActor = document.getElementById("SPDBTTN-Partner-actor");
spdbttnPartnerActor.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#ACTOR_0_0",
    "#ACTOR_0_N",
    "#ACTOR_0_E",
    "#ACTOR_0_S",
    "#ACTOR_0_W",
    "#ACTOR_SpeechBubble_0-0",
    "#ACTOR_SpeechBubble_0-N",
    "#ACTOR_SpeechBubble_0-E",
    "#ACTOR_SpeechBubble_0-S",
    "#ACTOR_SpeechBubble_0-W",
    "#ACTOR_W_E",
    "#ACTOR_SpeechBubble_W-E",
    "#ACTOR_E_S",
    "#ACTOR_SpeechBubble_E-S",
    "#ACTOR_N_E",
    "#ACTOR_SpeechBubble_N-E",
  ]);
});
const spdbttnPartnerVoid = document.getElementById("SPDBTTN-Partner-void");
spdbttnPartnerVoid.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#SYSTEM_VOID_CENTER",
    "#SYSTEM_VOID_CENTER2Bottom",
    "#SYSTEM_VOID_CENTER2Bottom-OverFlow-W-E",
    "#SYSTEM_VOID_Top2Bottom",
    "#SYSTEM_VOID_Top2Bottom-OverFlow-W-E",
    "#SYSTEM_VOID_TOP2CENTER",
    "#SYSTEM_VOID_TOP2CENTER-OverFlow-W-E",
    "#SYSTEM_VOID_CENTER2Right",
    "#SYSTEM_VOID_Left2Right",
    "#SYSTEM_VOID_Left2CENTER",
    "#SYSTEM_VOID_CENTER2Bottom-OverFlow-a-W-E",
    "#SYSTEM_VOID_TOP2CENTER-OverFlow-a-W-E",
    "#SYSTEM_VOID_Top2Bottom-OverFlow-a-W-E",
  ]);
});
const spdbttnPartnerSND = document.getElementById("SPDBTTN-Partner-SND");
spdbttnPartnerSND.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#SENDER_CENTER_0_N",
    "#SENDER_CENTER_0_E",
    "#SENDER_CENTER_0_S",
    "#SENDER_CENTER_0_W",
    "#SENDER_CENTER2Bottom_0_N",
    "#SENDER_CENTER2Bottom_0_E",
    "#SENDER_CENTER2Bottom_0_W",
    "#SENDER_Top2Bottom_0_E",
    "#SENDER_Top2Bottom_0_W",
    "#SENDER_TOP2CENTER_0_E",
    "#SENDER_TOP2CENTER_0_S",
    "#SENDER_TOP2CENTER_0_W",
    "#SENDER_CENTER2Right_0_N",
    "#SENDER_CENTER2Right_0_S",
    "#SENDER_CENTER2Right_0_W",
    "#SENDER_Left2Right_0_N",
    "#SENDER_Left2Right_0_S",
    "#SENDER_Left2CENTER_0_N",
    "#SENDER_Left2CENTER_0_E",
    "#SENDER_Left2CENTER_0_S",
    "#SENDER_CENTER-D_0_N",
    "#SENDER_CENTER-D_0_E",
    "#SENDER_CENTER-D_0_S",
    "#SENDER_CENTER-D_0_W",
    "#SENDER_CENTER2Bottom-D_0_N",
    "#SENDER_CENTER2Bottom-D_0_E",
    "#SENDER_CENTER2Bottom-D_0_W",
    "#SENDER_Top2Bottom-D_0_E",
    "#SENDER_Top2Bottom-D_0_W",
    "#SENDER_TOP2CENTER-D_0_E",
    "#SENDER_TOP2CENTER-D_0_S",
    "#SENDER_TOP2CENTER-D_0_W",
    "#SENDER_CENTER2Right-D_0_N",
    "#SENDER_CENTER2Right-D_0_S",
    "#SENDER_CENTER2Right-D_0_W",
    "#SENDER_Left2Right-D_0_N",
    "#SENDER_Left2Right-D_0_S",
    "#SENDER_Left2CENTER-D_0_N",
    "#SENDER_Left2CENTER-D_0_E",
    "#SENDER_Left2CENTER-D_0_S",
  ]);
});
const spdbttnPartnerRCV = document.getElementById("SPDBTTN-Partner-RCV");
spdbttnPartnerRCV.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#RECEIVER_CENTER_0_N",
    "#RECEIVER_CENTER_0_E",
    "#RECEIVER_CENTER_0_S",
    "#RECEIVER_CENTER_0_W",
    "#RECEIVER_CENTER2Bottom_0_N",
    "#RECEIVER_CENTER2Bottom_0_E",
    "#RECEIVER_CENTER2Bottom_0_W",
    "#RECEIVER_Top2Bottom_0_E",
    "#RECEIVER_Top2Bottom_0_W",
    "#RECEIVER_TOP2CENTER_0_E",
    "#RECEIVER_TOP2CENTER_0_S",
    "#RECEIVER_TOP2CENTER_0_W",
    "#RECEIVER_CENTER2Right_0_N",
    "#RECEIVER_CENTER2Right_0_S",
    "#RECEIVER_CENTER2Right_0_W",
    "#RECEIVER_Left2Right_0_N",
    "#RECEIVER_Left2Right_0_S",
    "#RECEIVER_Left2CENTER_0_N",
    "#RECEIVER_Left2CENTER_0_E",
    "#RECEIVER_Left2CENTER_0_S",
    "#RECEIVER_CENTER-D_0_N",
    "#RECEIVER_CENTER-D_0_E",
    "#RECEIVER_CENTER-D_0_S",
    "#RECEIVER_CENTER-D_0_W",
    "#RECEIVER_CENTER2Bottom-D_0_N",
    "#RECEIVER_CENTER2Bottom-D_0_E",
    "#RECEIVER_CENTER2Bottom-D_0_W",
    "#RECEIVER_Top2Bottom-D_0_E",
    "#RECEIVER_Top2Bottom-D_0_W",
    "#RECEIVER_TOP2CENTER-D_0_E",
    "#RECEIVER_TOP2CENTER-D_0_S",
    "#RECEIVER_TOP2CENTER-D_0_W",
    "#RECEIVER_CENTER2Right-D_0_N",
    "#RECEIVER_CENTER2Right-D_0_S",
    "#RECEIVER_CENTER2Right-D_0_W",
    "#RECEIVER_Left2Right-D_0_N",
    "#RECEIVER_Left2Right-D_0_S",
    "#RECEIVER_Left2CENTER-D_0_N",
    "#RECEIVER_Left2CENTER-D_0_E",
    "#RECEIVER_Left2CENTER-D_0_S",
  ]);
});
const spdbttnPartnerConsumer = document.getElementById(
  "SPDBTTN-Partner-consumer"
);
spdbttnPartnerConsumer.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#CONSUMER_CENTER_0_N",
    "#CONSUMER_CENTER_0_E",
    "#CONSUMER_CENTER_0_S",
    "#CONSUMER_CENTER_0_W",
    "#CONSUMER_CENTER2Bottom_0_N",
    "#CONSUMER_CENTER2Bottom_0_E",
    "#CONSUMER_CENTER2Bottom_0_W",
    "#CONSUMER_Top2Bottom_0_E",
    "#CONSUMER_Top2Bottom_0_W",
    "#CONSUMER_TOP2CENTER_0_E",
    "#CONSUMER_TOP2CENTER_0_S",
    "#CONSUMER_TOP2CENTER_0_W",
    "#CONSUMER_CENTER2Right_0_N",
    "#CONSUMER_CENTER2Right_0_S",
    "#CONSUMER_CENTER2Right_0_W",
    "#CONSUMER_Left2Right_0_N",
    "#CONSUMER_Left2Right_0_S",
    "#CONSUMER_Left2CENTER_0_N",
    "#CONSUMER_Left2CENTER_0_E",
    "#CONSUMER_Left2CENTER_0_S",
    "#CONSUMER_CENTER-D_0_N",
    "#CONSUMER_CENTER-D_0_E",
    "#CONSUMER_CENTER-D_0_S",
    "#CONSUMER_CENTER-D_0_W",
    "#CONSUMER_CENTER2Bottom-D_0_N",
    "#CONSUMER_CENTER2Bottom-D_0_E",
    "#CONSUMER_CENTER2Bottom-D_0_W",
    "#CONSUMER_Top2Bottom-D_0_E",
    "#CONSUMER_Top2Bottom-D_0_W",
    "#CONSUMER_TOP2CENTER-D_0_E",
    "#CONSUMER_TOP2CENTER-D_0_S",
    "#CONSUMER_TOP2CENTER-D_0_W",
    "#CONSUMER_CENTER2Right-D_0_N",
    "#CONSUMER_CENTER2Right-D_0_S",
    "#CONSUMER_CENTER2Right-D_0_W",
    "#CONSUMER_Left2Right-D_0_N",
    "#CONSUMER_Left2Right-D_0_S",
    "#CONSUMER_Left2CENTER-D_0_N",
    "#CONSUMER_Left2CENTER-D_0_E",
    "#CONSUMER_Left2CENTER-D_0_S",
  ]);
});
const spdbttnPartnerProvider = document.getElementById(
  "SPDBTTN-Partner-provider"
);
spdbttnPartnerProvider.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#PROVIDER_CENTER_0_N",
    "#PROVIDER_CENTER_0_E",
    "#PROVIDER_CENTER_0_S",
    "#PROVIDER_CENTER_0_W",
    "#PROVIDER_CENTER2Bottom_0_N",
    "#PROVIDER_CENTER2Bottom_0_E",
    "#PROVIDER_CENTER2Bottom_0_W",
    "#PROVIDER_Top2Bottom_0_E",
    "#PROVIDER_Top2Bottom_0_W",
    "#PROVIDER_TOP2CENTER_0_E",
    "#PROVIDER_TOP2CENTER_0_S",
    "#PROVIDER_TOP2CENTER_0_W",
    "#PROVIDER_CENTER2Right_0_N",
    "#PROVIDER_CENTER2Right_0_S",
    "#PROVIDER_CENTER2Right_0_W",
    "#PROVIDER_Left2Right_0_N",
    "#PROVIDER_Left2Right_0_S",
    "#PROVIDER_Left2CENTER_0_N",
    "#PROVIDER_Left2CENTER_0_E",
    "#PROVIDER_Left2CENTER_0_S",
    "#PROVIDER_CENTER-D_0_N",
    "#PROVIDER_CENTER-D_0_E",
    "#PROVIDER_CENTER-D_0_S",
    "#PROVIDER_CENTER-D_0_W",
    "#PROVIDER_CENTER2Bottom-D_0_N",
    "#PROVIDER_CENTER2Bottom-D_0_E",
    "#PROVIDER_CENTER2Bottom-D_0_W",
    "#PROVIDER_Top2Bottom-D_0_E",
    "#PROVIDER_Top2Bottom-D_0_W",
    "#PROVIDER_TOP2CENTER-D_0_E",
    "#PROVIDER_TOP2CENTER-D_0_S",
    "#PROVIDER_TOP2CENTER-D_0_W",
    "#PROVIDER_CENTER2Right-D_0_N",
    "#PROVIDER_CENTER2Right-D_0_S",
    "#PROVIDER_CENTER2Right-D_0_W",
    "#PROVIDER_Left2Right-D_0_N",
    "#PROVIDER_Left2Right-D_0_S",
    "#PROVIDER_Left2CENTER-D_0_N",
    "#PROVIDER_Left2CENTER-D_0_E",
    "#PROVIDER_Left2CENTER-D_0_S",
  ]);
});
const spdbttnPartnerBridgeAsyncAsync = document.getElementById(
  "SPDBTTN-Bridge-Async-Async"
);
spdbttnPartnerBridgeAsyncAsync.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#BRIDGE-ASYNC-ASYNC-CENTER_N_S",
    "#BRIDGE-ASYNC-ASYNC-CENTER_E_W",
    "#BRIDGE-ASYNC-ASYNC-CENTER_S_N",
    "#BRIDGE-ASYNC-ASYNC-CENTER_W_E",
    "#BRIDGE-ASYNC-ASYNC-CENTER2BOTTOM_E_W",
    "#BRIDGE-ASYNC-ASYNC-CENTER2BOTTOM_W_E",
    "#BRIDGE-ASYNC-ASYNC-TOP2BOTTOM_E_W",
    "#BRIDGE-ASYNC-ASYNC-TOP2BOTTOM_W_E",
    "#BRIDGE-ASYNC-ASYNC-TOP2CENTER_E_W",
    "#BRIDGE-ASYNC-ASYNC-TOP2CENTER_W_E",
    "#BRIDGE-ASYNC-ASYNC-CENTER2RIGHT_N_S",
    "#BRIDGE-ASYNC-ASYNC-CENTER2RIGHT_S_N",
    "#BRIDGE-ASYNC-ASYNC-LEFT2RIGHT_N_S",
    "#BRIDGE-ASYNC-ASYNC-LEFT2RIGHT_S_N",
    "#BRIDGE-ASYNC-ASYNC-LEFT2CENTER_N_S",
    "#BRIDGE-ASYNC-ASYNC-LEFT2CENTER_S_N",
  ]);
});
const spdbttnPartnerBridgeSyncSync = document.getElementById(
  "SPDBTTN-Bridge-Sync-Sync"
);
spdbttnPartnerBridgeSyncSync.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#BRIDGE-SYNC-SYNC-CENTER_N_S",
    "#BRIDGE-SYNC-SYNC-CENTER_E_W",
    "#BRIDGE-SYNC-SYNC-CENTER_S_N",
    "#BRIDGE-SYNC-SYNC-CENTER_W_E",
    "#BRIDGE-SYNC-SYNC-CENTER2BOTTOM_E_W",
    "#BRIDGE-SYNC-SYNC-CENTER2BOTTOM_W_E",
    "#BRIDGE-SYNC-SYNC-TOP2BOTTOM_E_W",
    "#BRIDGE-SYNC-SYNC-TOP2BOTTOM_W_E",
    "#BRIDGE-SYNC-SYNC-TOP2CENTER_E_W",
    "#BRIDGE-SYNC-SYNC-TOP2CENTER_W_E",
    "#BRIDGE-SYNC-SYNC-CENTER2RIGHT_N_S",
    "#BRIDGE-SYNC-SYNC-CENTER2RIGHT_S_N",
    "#BRIDGE-SYNC-SYNC-LEFT2RIGHT_N_S",
    "#BRIDGE-SYNC-SYNC-LEFT2RIGHT_S_N",
    "#BRIDGE-SYNC-SYNC-LEFT2CENTER_N_S",
    "#BRIDGE-SYNC-SYNC-LEFT2CENTER_S_N",
  ]);
});
const spdbttnPartnerBridgeAsyncSync = document.getElementById(
  "SPDBTTN-Bridge-Async-Sync"
);
spdbttnPartnerBridgeAsyncSync.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#BRIDGE-ASYNC-SYNC-CENTER_N_S",
    "#BRIDGE-ASYNC-SYNC-CENTER_E_W",
    "#BRIDGE-ASYNC-SYNC-CENTER_S_N",
    "#BRIDGE-ASYNC-SYNC-CENTER_W_E",
    "#BRIDGE-ASYNC-SYNC-CENTER2BOTTOM_E_W",
    "#BRIDGE-ASYNC-SYNC-CENTER2BOTTOM_W_E",
    "#BRIDGE-ASYNC-SYNC-TOP2BOTTOM_E_W",
    "#BRIDGE-ASYNC-SYNC-TOP2BOTTOM_W_E",
    "#BRIDGE-ASYNC-SYNC-TOP2CENTER_E_W",
    "#BRIDGE-ASYNC-SYNC-TOP2CENTER_W_E",
    "#BRIDGE-ASYNC-SYNC-CENTER2RIGHT_N_S",
    "#BRIDGE-ASYNC-SYNC-CENTER2RIGHT_S_N",
    "#BRIDGE-ASYNC-SYNC-LEFT2RIGHT_N_S",
    "#BRIDGE-ASYNC-SYNC-LEFT2RIGHT_S_N",
    "#BRIDGE-ASYNC-SYNC-LEFT2CENTER_N_S",
    "#BRIDGE-ASYNC-SYNC-LEFT2CENTER_S_N",
  ]);
});
const spdbttnPartnerBridgeSyncAsync = document.getElementById(
  "SPDBTTN-Bridge-Sync-Async"
);
spdbttnPartnerBridgeSyncAsync.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#BRIDGE-SYNC-ASYNC-CENTER_N_S",
    "#BRIDGE-SYNC-ASYNC-CENTER_E_W",
    "#BRIDGE-SYNC-ASYNC-CENTER_S_N",
    "#BRIDGE-SYNC-ASYNC-CENTER_W_E",
    "#BRIDGE-SYNC-ASYNC-CENTER2BOTTOM_E_W",
    "#BRIDGE-SYNC-ASYNC-CENTER2BOTTOM_W_E",
    "#BRIDGE-SYNC-ASYNC-TOP2BOTTOM_E_W",
    "#BRIDGE-SYNC-ASYNC-TOP2BOTTOM_W_E",
    "#BRIDGE-SYNC-ASYNC-TOP2CENTER_E_W",
    "#BRIDGE-SYNC-ASYNC-TOP2CENTER_W_E",
    "#BRIDGE-SYNC-ASYNC-CENTER2RIGHT_N_S",
    "#BRIDGE-SYNC-ASYNC-CENTER2RIGHT_S_N",
    "#BRIDGE-SYNC-ASYNC-LEFT2RIGHT_N_S",
    "#BRIDGE-SYNC-ASYNC-LEFT2RIGHT_S_N",
    "#BRIDGE-SYNC-ASYNC-LEFT2CENTER_N_S",
    "#BRIDGE-SYNC-ASYNC-LEFT2CENTER_S_N",
  ]);
});
const spdbttnDomainBoundarySingle = document.getElementById(
  "SPDBTTN-DOMAIN-BOUNDARY-SINGLE"
);
spdbttnDomainBoundarySingle.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#EDGE_SINGLE_BOTTOM",
    "#EDGE_SINGLE_TOP",
    "#EDGE_SINGLE_LEFT",
    "#EDGE_SINGLE_RIGHT",
    "#EDGE_SINGLE_LOW-LEFT",
    "#EDGE_SINGLE_LOW-RIGHT",
    "#EDGE_SINGLE_TOP-LEFT",
    "#EDGE_SINGLE_TOP-RIGHT",
  ]);
});
const spdbttnDomainBoundaryDouble = document.getElementById(
  "SPDBTTN-DOMAIN-BOUNDARY-DOUBLE"
);
spdbttnDomainBoundaryDouble.addEventListener("click", (event) => {
  current = handleClick(event, [
    "#EDGE_Double_EDGE-TOP",
    "#EDGE_Double_EDGE-BOTTOM",
    "#EDGE_Double_VERTICAL",
    "#EDGE_Double_HORIZONTAL",
    "#EDGE_Double_EDGE-LEFT",
    "#EDGE_Double_EDGE-RIGHT",
    "#EDGE_Double_LEFTEDGE-RIGHT",
    "#EDGE_Double_RIGHTEDGE-LEFT",
    "#EDGE_Double_UpLeftEdge-RIGHT",
    "#EDGE_Double_DownLeftEdge-RIGHT",
  ]);
});
const spdbttnDomainBoundaryDoubleArrowHorizontically = document.getElementById(
  "SPDBTTN-DOMAIN-BOUNDARY-EXCHANGE"
);
spdbttnDomainBoundaryDoubleArrowHorizontically.addEventListener(
  "click",
  (event) => {
    current = handleClick(event, [
      "#CONNECT_None_VERTICAL-ArrowHorizontically",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically-Left",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically-Left-only",
      "#CONNECT_None_VERTICAL-ArrowHorizontically-Left",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically-Center",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically-Center-noBorder",
      "#CONNECT_None_VERTICAL-ArrowHorizontically-Center",
      "#CONNECT_Double_VERTICAL-ArrowHorizontically-Right",
      "#CONNECT_None_VERTICAL-ArrowHorizontically-Right",
      "#CONNECT_None_HORIZONTAL-ArrowVertically",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically-Bottom",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically-Bottom-only",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Bottom",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Bottom-only",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically-Center-noBorder",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Center",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Center-System",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically-Top",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Top",
      "#CONNECT_Double_HORIZONTAL-ArrowVertically-Top-only",
      "#CONNECT_None_HORIZONTAL-ArrowVertically-Top-only",
    ]);
  }
);
