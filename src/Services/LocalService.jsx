// LocalService dùng để quản lí user

export const USER = "USER";
// user thì có lưu dữ liệu xuống localStorage dùng Set

export const localServ = {
  user: {
    set: (data) => {
      let jsonData = JSON.stringify(data);

      // lưu vào localStorage
      localStorage.setItem(USER, jsonData);
    },

    // Dùn get để
    get: () => {
      // Lấy lên jsonData
      let jsonData = localStorage.getItem(USER);

      // nếu có giữ liệu nó sẽ là {} \\ []
      // nếu không có nó là undefile or null

      if (jsonData) {
        // có giữa liệu thì trả về parse , parse là trả về từ JSON thành
        // {} \\ []
        return JSON.parse(jsonData);
      } else {
        // false thì trả về null
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem(USER);
    },
  },
};
