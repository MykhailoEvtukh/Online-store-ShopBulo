import axios from 'axios';
import PNotify_1 from 'pnotify/dist/es/PNotify';

axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';

export default {
  page: 1,
  searchAllItems(searchItem, homePage) {
    return axios
      .get(`/ads/all?search=${searchItem}&limit=6&page=${homePage}`)
      .then(data => data.data.ads);
  },
  searchInCategory(numberCategories, homePage, searchItem) {
    return axios.get(
      `/ads/all?category=${numberCategories}&limit=12&page=${homePage}&search=${searchItem}`,
    );
  },
  async getAllProduct(number) {
    try {
      const data = await axios.get(`/ads/all?limit=9&page=${number}`);
      //console.log(data.data.ads);
      return data.data.ads;
    } catch (error) {
      console.log(error);
      // throw new Error(error);
    }
  },

  async getAlerts() {
    try {
      const data = await axios.get('https://sciactive.com/pnotify/');
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCardById(id) {
    try {
      const data = await axios.get(`/ads/${id}`);
      return data.data.goal;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async limitExtradition(limit, pageNumber) {
    try {
      const data = await axios.get(
        `/ads/all?limit=${limit}&page=${pageNumber}`,
      );
      return data.data.ads;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCategoriesWithNumberCategories(numberCategories, homePage) {
    try {
      const data = await axios.get(
        `/ads/all?category=${numberCategories}&page=${homePage}&limit=6`,
      );
      // console.log(data.data.ads.docs);
      return data.data.ads.docs;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async adsProduct(object) {
    try {
      const data = await axios.post('/ads', object, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async deletedProduct(adId) {
    try {
      const data = await axios.delete(`/ads/${adId}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async registrateUser(userInfo) {
    const data = await axios.post('/auth/register', userInfo);
    if (data.data.status === 'success') {
      await this.loginUser(userInfo);
    } else {
      const regex = /[a-z0-9\.\-\+]+@[a-z0-9\.\-\+]+/gim;
      const res = data.data.error;
      console.error(`This email: ${res.match(regex)} already exists`);
    }
    return data;
  },

  async loginUser(userInfo) {
    const data = await axios.post('/auth/login', userInfo);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userInfo', data.config.data);
    localStorage.setItem('userId', data.data.userData.userId);
    localStorage.setItem('userName', data.data.userData.name);
    return data;
  },
  async logoutUser(userInfo) {
    const token = localStorage.getItem('token');
    const data = await axios.post('/auth/logout', userInfo, {
      headers: { Authorization: token },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  },

  async getAllItemsWithNumberCategories(numberCategories, limit, homePage) {
    try {
      const data = await axios.get(
        `/ads/all?limit=${limit}category=${numberCategories}&page=${homePage}`,
      );
      return data.data.ads.docs;
    } catch (error) {
      console.log(error);
    }
  },

  async getUser(token) {
    const heders = {
      headers: {
        Authorization: token,
      },
    };
    try {
      let result = await axios.get(`/ads`, heders);
      //  console.log('getUser', result);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getQuantityAllItemsByCategory(numberCategories, homePage) {
    try {
      const data = await axios.get(
        `/ads/all?category=${numberCategories}&page=${homePage}`,
      );
      return data.data.ads.totalDocs;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserFavorites(token) {
    const heders = {
      headers: {
        Authorization: token,
      },
    };
    try {
      let result = await axios.get(`/user/favorites`, heders);
      // console.log('get_Favorites', result);
      return result;
    } catch (error) {}
  },
  async adsFavoritCardById(id) {
    try {
      const data = await axios.put(
        `/user/favorite/${id}`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        },
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async getAllProductFavorite() {
    try {
      const data = await axios.get(`/user/favorites`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      return data.data.user.favorites;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async deletedFavoritCardById(id) {
    try {
      const data = await axios.delete(`/user/favorite/${id}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
