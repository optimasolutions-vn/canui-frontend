export default {
  readMessage: (client, msg) => {
    if (client) {
      client.sendMessage('/api/read-message', JSON.stringify(msg));
    }
  },
  readNotification: (client, noti) => {
    if (client) {
      console.log(client);
      client.sendMessage('/api/read-notification', JSON.stringify(noti));
    }
  }
};
