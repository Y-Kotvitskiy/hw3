const API = "https://66805a1156c2c76b495bd6dc.mockapi.io/title";

const cities = {
  get: async (id) => {
    try {
      const request = await fetch(id ? API + `/${id}` : API);
      return await request.json();
    } catch (err) {
      console.error(err);
    }
  },
  put: async (id, obj) => {
    try {
      const request = await fetch(API+`/${id}`, {
        method: `PUT`,
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });
      return await request.json();
    } catch (err) {
      console.error(err);
    }
  },
  post: async (obj) => {
    try {
      const request = await fetch(API, {
        method: `POST`,
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });
      return await request.json();
    } catch (err) {
      console.error(err);
    }
  },
  delete: async (id) => {
    try {
      const request = await fetch(API+`/${id}`, {
        method: `DELETE`,
      });
      return await request.json();
    } catch (err) {
      console.error(err);
    }
  },

};

export default cities;
