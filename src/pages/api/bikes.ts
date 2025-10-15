import type { NextApiRequest, NextApiResponse } from "next";
import bikes from "../../../bikes.json";

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<ReadonlyArray<Bike>>,
) {
  res.status(200).json(JSON.parse(JSON.stringify(bikes)));
}
