import { URL } from "../modals/url.js";
import { nanoid } from "nanoid";
import { verifyToken } from "../utils/generateToken.js";

class handleUrl {
  static redirectTo = async (req, res) => {
    const shortid = req.params.id;
    if (shortid) {
      // const data = await URL.findOne({ shortid: shortid });

      const data = await URL.findOneAndUpdate(
        { shortid },
        {
          $push: { visitHistory: { timestamp: Date.now() } },
        }
      );

      if (data) {
        res.status(200).redirect(data.redirectURL);
      } else {
        res.status(400).json({ message: "url is not valid" });
      }
    } else {
      res.status(400).json({ message: "url is not valid" });
    }
  };

  static registerUrl = async (req, res) => {
    const { url } = req.body;
    if (url) {
      const id = await nanoid(8);

      const { token } = req.cookies;
      const user = await verifyToken(token);

      const doc = await URL.create({
        shortid: id,
        redirectURL: url,
        visitHistory: { timestamp: Date.now() },
        createdBy: user.userId,
      });
      await doc.save();
      res.status(201).json({ message: "successfully saved." });
    } else {
      res.status(400).json({ message: "url is not found" });
    }
  };

  static urlAnalytics = async (req, res) => {
    const id = req.params.id;
    try {
      const doc = await URL.findOne({ shortid: id }).populate(
        "createdBy",
        "-password"
      );
      res.status(200).json({ noOfVisits: doc.visitHistory.length, data: doc });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  };
}

export default handleUrl;
