// import {translate} from 'google-translate-api';
import { Constant } from "./Constants";
import Lang from "./Lang";

export function change_time_stamp(start_time) {
  let date = new Date(start_time * 1000);
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":"  + seconds.substr(-2);
  console.log("formattedTime", formattedTime);
  return {
    hours: hours,
    minutes: minutes,
  };
}

export function get_time_stamp_from_time(time_string){ // 07:35
  time_string = time_string || 0;
  if(!time_string){
    console.log('return 0');
    return 0;
  }
  const [hours, minutes] = time_string.split(':');
  return (minutes * 60) + (hours * 3600);
}

export function capitalizeFirstLetter(str) {
  if(!str){
    return "";
  }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function get_formated_dateime(timestamp) {
  timestamp = timestamp*1000;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  const formattedDate_arr = formattedDate.split(" ");
  return {
    date:formattedDate_arr[0],
    time:[1],
    date_time:formattedDate
  };
}
export function is_loggedin(){
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));

      return user.is_loggedin;
}
export function is_user(){
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));

      return user.role_id === 2;
}
export function is_sale_agent(){
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));

      return user.role_id === 3;
}
export function role_can_collect(){
  console.log('role_can_collect',is_travel_agent() , is_driver());
  return is_travel_agent() || is_driver();
}
export function is_travel_agent(){
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));

      return user.role_id === 4;
}
export function is_driver(){
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));

      return user.role_id === 5;
}

export function setLoaderLocalStorage (value){
  
  // localStorage.setItem("loader", value);
  window.dispatchEvent(new StorageEvent("storage.loader",{key:'loader',newValue:value}));
  // window.dispatchEvent(new Event("storage.loader",{key:'loader',value}));
  
}
export async function SendRequest(
  request_type,
  url,
  formData,
  needAuthorization
) {
  try{
    setLoaderLocalStorage(true);

  if (typeof needAuthorization === "undefined") {
    needAuthorization = false; // Set a default value if it's not provided
  }
  // let acceess_token = needAuthorization ? contextState.user.access_token : Constant.basic_token;
  let user =
    localStorage.getItem("user") === null
      ? Constant.guest_user
      : JSON.parse(localStorage.getItem("user"));
  let acceess_token = needAuthorization
    ? user.access_token
    : Constant.basic_token;
  // let acceess_token = needAuthorization ? contextState.user.access_token : Constant.basic_token;

  let postData = {
    method: request_type,
    headers: {
      // "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: acceess_token,
      "Authorization-secure": acceess_token,
      "client-id": Constant.client_id,
    },
  };

  if (formData != null) {
    postData.body = formData;
  }

  let response = await fetch(url, postData);
  let json_response = await response.json();
  if (
    !json_response.status &&
    json_response.error &&
    json_response.error["custom_code"] == 403 &&
    needAuthorization
  ) {
    localStorage.setItem("user", JSON.stringify(Constant.guest_user));
    localStorage.setItem("show_login_modal", true);
  }
  return json_response;
} catch (error) {
  console.error("Error during SendRequestContetType:", error);
  // Handle errors if needed
  throw error;
} finally {
  setLoaderLocalStorage(false);
}
}

export async function SendRequestContetType(
  request_type,
  url,
  formData,
  needAuthorization
) {
  try {
    setLoaderLocalStorage(true);

    if (typeof needAuthorization === "undefined") {
      needAuthorization = false; // Set a default value if it's not provided
    }

    let user =
      localStorage.getItem("user") === null
        ? Constant.guest_user
        : JSON.parse(localStorage.getItem("user"));

    let acceess_token = needAuthorization
      ? user.access_token
      : Constant.basic_token;

    let postData = {
      method: request_type,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: acceess_token,
        "Authorization-secure": acceess_token,
        "client-id": Constant.client_id,
      },
    };

    if (formData != null) {
      postData.body = formData;
    }

    let response = await fetch(url, postData);
    let json_response = await response.json();

    if (
      !json_response.status &&
      json_response.error &&
      json_response.error["custom_code"] == 403 &&
      needAuthorization
    ) {
      localStorage.setItem("user", JSON.stringify(Constant.guest_user));
      // localStorage.setItem("show_login_modal", true);
    }

    return json_response;
  } catch (error) {
    console.error("Error during SendRequestContetType:", error);
    // Handle errors if needed
    throw error;
  } finally {
    console.log('set value loader false');
    setLoaderLocalStorage(false);


  }
}

export async function UploadImage ({file,pre_image}) {
  try {
    pre_image = pre_image || '';
    const formData = new FormData();
    formData.append("image", file);
    formData.append("pre_image", pre_image);

    const res = await SendRequest(
      'post',
      Constant.upload_image,
      formData,
      true
    )
    return res;

      
  } catch (error) {    
    console.error("Error uploading image:", error);
  }
};
