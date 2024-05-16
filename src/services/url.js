let baseURL = "http://xxxx";
switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://7habp3.natappfree.cc"
    break
  case "test":
    baseURL = "http://nekmnm.natappfree.cc"
    break
  case "production":
    baseURL="http://qwixcr.natappfree.cc"
}

export default baseURL;
4
