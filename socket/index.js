const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (user, socketId) => {
  !users.some((myUser) => myUser?.user?.id === user?.id) &&
    users.push({ user, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user?.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user?.user?.id === userId);
};

io.on("connection", (socket) => {
  // take user Id and socket Id from user
  socket.on("addUser", (user) => {
    addUser(user, socket?.id);
    io.emit("getUsers", users);
  });

  //   disconnection
  socket.on("disconnect", () => {
    removeUser(socket?.id);
    io.emit("getUsers", users);
  });

  //   send AND get message
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text, createdAt, image }) => {
      const user = getUser(receiverId);

      user &&
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          createdAt,
          image,
        });
    }
  );
  //   send AND get notification
  socket.on("sendMessageNotification", ({ receiverId, type, createdAt }) => {
    const user = getUser(receiverId);
    user &&
      io.to(user.socketId).emit("getMessageNotification", {
        receiverId,
        type,
        createdAt,
      });
  });
  //   send AND get notification
  socket.on("sendStoreApprovalRequest", ({ user, type, createdAt }) => {
    io.emit("getStoreApprovalRequest", {
      user,
      type,
      createdAt,
    });
  });

  //   send AND get notification
  socket.on("sendStoreApproved", ({ seller, type, createdAt }) => {
    const user = getUser(seller);
    user &&
      io.to(user.socketId).emit("getStoreApproved", {
        seller,
        type,
        createdAt,
      });
  });

  //   send AND get notification
  socket.on("sendOrderStatus", ({ buyer, type, createdAt }) => {
    const user = getUser(buyer);
    user &&
      io.to(user.socketId).emit("getOrderStatus", {
        buyer,
        type,
        createdAt,
      });
  });
});
