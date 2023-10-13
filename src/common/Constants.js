// const base_url = 'http://localhost/demas_backend/public/api';
const base_url = "https://demastransport.com/demas_backend/public/api";

export const Constant = {
  basic_token: "Basic ZGVtYXMtYXBwLW1vYmlsZTtaR1Z0WVhNdFlYQndMVzF2WW1sc1pRPT0=",
  guest_user: {
    id: "0",
    name: "Guest",
    access_token:
      "Basic ZGVtYXMtYXBwLW1vYmlsZTtaR1Z0WVhNdFlYQndMVzF2WW1sc1pRPT0=",
    role_id: 2,
    rememberme: false,
    is_loggedin: false,
  },

  signup: `${base_url}/register`,
  login: `${base_url}/login`,
  sendotp: `${base_url}/sendotp`,
  validate_otp: `${base_url}/validate_otp`,
  get_cars: `${base_url}/cars/get_all`,
  contactus: `${base_url}/contactus`,
};
