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
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  console.log("formattedTime", formattedTime);
  return {
    hours: hours,
    minutes: minutes,
  };
}

export function get_formated_dateime(timestamp) {
  // Replace this with your Unix timestamp
  timestamp = timestamp*1000; // Example timestamp

  // Create a Date object from the Unix timestamp
  const date = new Date(timestamp);

  console.log(date); // Outputs the date and time

  // You can format the date as a string if needed
  const formattedDate = date.toLocaleString(); // Using the browser's locale
  console.log(formattedDate); // Outputs a formatted date and time string
  return formattedDate;
}

export async function googleTranslate(text, lang, that) {
  console.log("googleTranslate", text);
  console.log("googleTranslate lang", lang);
  console.log("googleTranslate", Lang[text]);
  return "googleTranslate";

  if (lang == "_en") {
    return text;
  } else {
    return Lang[text];
  }
  // const {Translate} = require('@google-cloud/translate').v2;

  // Instantiates a client
  // const translate = new Translate({projectId});

  // async function quickStart() {
  //   // The text to translate
  //   const text = 'Hello, world!';

  //   // The target language
  //   const target = 'ru';

  //   // Translates some text into Russian
  //   const [translation] = await translate.translate(text, target);
  //   console.log(`Text: ${text}`);
  //   console.log(`Translation: ${translation}`);
}

// export async function SendRequest(contextState, request_type, url, formData) {

//   // console.log('contextState.user.access_token',contextState);
//   // console.log('contextState.user.access_token',contextState.user.access_token);
//   // console.log('formData',contextState.user.access_token);
//   let postData = {
//     method: request_type,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: contextState.user.access_token,
//       'Authorization-secure': contextState.user.access_token,
//       'Authorization-secure': contextState.user.access_token,
//       'client-id': 'demas-app-mobile',
//     },
//   };

//   if (formData != null) {
//     postData.body = formData;
//   }
//   console.log('post data',postData);

//   let response = await fetch(url, postData);
//   console.log('req ressssssssa11111111',response);
//   return response.json();
// }

//

export async function SendRequest(
  contextState,
  request_type,
  url,
  formData,
  needAuthorization
) {
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
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: acceess_token,
      "Authorization-secure": acceess_token,
      "client-id": "demas-app-mobile",
    },
  };

  if (formData != null) {
    postData.body = formData;
  }

  let response = await fetch(url, postData);
  let json_response = response.json();
  if (
    !json_response.status &&
    json_response.error &&
    json_response.error["custom_code"] == 403
  ) {
    localStorage.setItem("user", JSON.stringify(Constant.guest_user));
    localStorage.setItem("show_login_modal", true);
  }
  return json_response;
}
