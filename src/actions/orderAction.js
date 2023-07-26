import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS,
  } from "../constants/orderConstants";
  
  import axios from "axios";
  
  // create order
  export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "content-Type": "application/json", withCredentials: true 
        },
      };
  
      const data = await axios.post("https://backend-mern_ecommerce.vercel.app/api/v1/order/new", order, config);
  
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.message,
      });
    }
  };
  
  // update order --- Admin
  export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "content-Type": "application/json", withCredentials: true 
        },
      };
  
      const data = await axios.put(`https://backend-mern_ecommerce.vercel.app/api/v1/admin/order/${id}`, order, config);
  
      dispatch({
        type: UPDATE_ORDER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.message,
      });
    }
  };
  
  // Delete order --- Admin
  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
  
      const data = await axios.delete(`https://backend-mern_ecommerce.vercel.app/api/v1/admin/order/${id}`, { withCredentials: true });
  
      console.log(data)
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: data.data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.message,
      });
    }
  };
  
  // My Orders
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const data = await axios.get("https://backend-mern_ecommerce.vercel.app/api/v1/orders/me", { withCredentials: true });
  
      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data.data.orders,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.message,
      });
    }
  };
  
  // Get All Orders  ---- Admin
  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const data = await axios.get("https://backend-mern_ecommerce.vercel.app/api/v1/admin/orders", { withCredentials: true });
  
      dispatch({
        type: ALL_ORDERS_SUCCESS,
        payload: data.data.orders,
      });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.message,
      });
    }
  };
  
  // Get Order Details
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const data = await axios.get(`https://backend-mern_ecommerce.vercel.app/api/v1/order/${id}`, { withCredentials: true });
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data.data.order,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
  
  // clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  