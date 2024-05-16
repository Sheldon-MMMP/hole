import baseURL from "@/services/url";

export default (imageUrl)=>{
  if(typeof imageUrl== 'string'){
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      console.log(baseURL,imageUrl);
      return baseURL + imageUrl;
    }
  }

}
