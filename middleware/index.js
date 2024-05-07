import fs from "fs";

function logResReq(filename) {
  return (req, res, next) => {
    const now = new Date();
    fs.appendFile(
      filename,
      `Date = ${(now.getDate() + "").padStart(2, "0")}/${(
        now.getMonth() +
        1 +
        ""
      ).padStart(
        2,
        "0"
      )}/${now.getFullYear()} : Time = ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}: HTTP Method = ${
        req.method
      } : Requested Path = ${req.path} : IP Address = ${req.ip}\n`,
      (err, date) => {
        next();
      }
    );
  };
}

export default logResReq;
