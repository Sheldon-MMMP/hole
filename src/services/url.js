let baseURL = "http://xxxx";
switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://127.0.0.1:4523/m1/2937593-0-default"
    break
  case "test":
    baseURL = "http://nekmnm.natappfree.cc"
    break
  case "production":
    baseURL="http://qwixcr.natappfree.cc"
}

export default baseURL;
4
