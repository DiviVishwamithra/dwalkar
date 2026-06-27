class SocketService {
  constructor() {
    this.io = null;
  }

  initialize(io) {
    this.io = io;
  }

  emit(jobId, event, payload) {
    console.log(`[SOCKET] ${event}`, payload);
    if (!this.io) return;

    this.io.to(jobId).emit(event, payload);
  }

  broadcast(event, payload) {
    if (!this.io) return;

    this.io.emit(event, payload);
  }
}

module.exports = new SocketService();
