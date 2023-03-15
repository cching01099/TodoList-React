import axios from 'axios';

//api非同步用async/await

const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.request.use(
  (config) => {
    //token之前存在localstorage要拿出來
    const token = localStorage.getItem('authToken');
    if (token) {
      //token存在就設立header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

//axios換成axiosInstance
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    //在postman可看到todo item的值是包在data底下
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    //發送post請求給server的資料（title,isDone)
    //非同步的方式-> await去獲得回傳的結果(const res)
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    //回傳server回傳的結果
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
};
