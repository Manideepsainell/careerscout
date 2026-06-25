
import Company from "../models/Company.js";

import {
  processCompany
} from "../services/discoveryRunner.js";
export const refresh10kJobs =
  async (req, res) => {

    try {

      const company =
        await Company.findOne({
          jobBoardType:
            "10KCODERS"
        });

      if (!company) {

        return res.status(404)
          .json({
            success: false,
            message:
              "10K company not found"
          });

      }

      const result =
        await processCompany(
          company
        );

      res.json({
        success: true,
        jobsAdded:
          result.jobsAdded
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }

};