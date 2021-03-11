import { Message } from 'element-ui'

const checkPic = (file, currentSize, maxSize) => {
	var limitSize=5;
    if (currentSize >= maxSize) {
        Message({
        type: "info",
        message: "最多上传" + maxSize + "张图."
      });
      return false;
    }
    var isJPG = file.type == "image/jpeg";
    var isPNG = file.type == "image/png";
    var isLtSize = file.size / 1024 / 1024 < limitSize;
    console.log("isJPG " + isJPG);
    console.log("isPNG " + isPNG);
    console.log("isLtSize " + isLtSize);

    if (!isJPG && !isPNG) {
        Message.error("上传图片只能是 JPG/PNG 格式!");
        return false;
    }
    if (!isLtSize) {
        Message.error(`上传图片大小不能超过 ${limitSize}MB!`);
        return false;
    }
    var isPic = (isJPG || isPNG) && isLtSize;
    console.log("是否图片？ " + isPic);
    if (!isPic) return false;
    var timestamp = new Date().valueOf();
    var ext = "";
    if (isJPG) {
      ext = ".jpg";
    }
    if (isPNG) {
      ext = ".png";
    }
    return timestamp + ext;
}
export {checkPic}