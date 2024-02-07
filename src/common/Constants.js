// const base_url = "http://localhost/demas_backend/public/api";
const base_url = "https://demastransport.com/demas_backend/public/api";

export const Constant = {
  basic_token: "Basic ZGVtYXMtYXBwLW1vYmlsZTtaR1Z0WVhNdFlYQndMVzF2WW1sc1pRPT0=",
  client_id:"demas-app-mobile",
  guest_user: {
    id: "0",
    name: "Guest",
    access_token:
      "Basic ZGVtYXMtYXBwLW1vYmlsZTtaR1Z0WVhNdFlYQndMVzF2WW1sc1pRPT0=",
    role_id: 2,
    rememberme: false,
    is_loggedin: false,
  },

  register_or_login: `${base_url}/register_or_login`,
  upload_image: `${base_url}/upload_image`,
  // sendotp: `${base_url}/sendotp`,
  validate_otp: `${base_url}/validate_otp`,
  get_cars_for_booking: `${base_url}/cars/get_cars_for_booking`,
  get_all: `${base_url}/cars/get_all`,
  get_cars_by_types: `${base_url}/get_cars_by_types`,
  get_transport_types: `${base_url}/get_transport_types`,
  get_locations: `${base_url}/locations/get_all`,
  contactus: `${base_url}/contactus`,
  journey_verify: `${base_url}/journey/verify`,
  order_create: `${base_url}/order/create`,
  orders: `${base_url}/order`,
  order_details: `${base_url}/order`,
  collect_payment: `${base_url}/order/collect_payment`,
  create_request_new_agent: `${base_url}/create_request_new_agent`,
  user_update_profile: `${base_url}/update`,
  create_agent: `${base_url}/create/agent`,
  cancel_request: `${base_url}/order/cancel_booking`,
};
