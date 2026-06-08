const { getIO } = require("../config/socket");

const sendEvent = (events) => {
  try {
    const io = getIO();
    console.log("events", events);
    
    io.emit(events.eventName, {
      message: events.msg,
      id: events.id?.toString(),
    });
  } catch (err) {
    console.error("Error in sendEvent:", err);
  }
};

module.exports = sendEvent;
