import axios from 'axios';

const BASE_URL = 'http://localhost:4000';
const token = localStorage.getItem('accessToken');

export const createAccount = async (newUser: any) => {
  try {
    const response = await fetch(`${BASE_URL}/cyclist/sign-up`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const user = await response.json();
    // console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (user: any) => {
  try {
    const response = await fetch(`${BASE_URL}/cyclist/sign-in`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.accessToken;
  } catch (error) {}
};

export const userLogout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cyclist/sign-out`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const profile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cyclist/profile`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getCyclistName = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cyclist/cyclist-name`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (address: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cyclist/set-up-address`,
      JSON.stringify(address),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedAddress = response.data;
    console.log('Updated Address from service', updatedAddress);
    return updatedAddress;
  } catch (error) {
    console.log(error);
  }
};
