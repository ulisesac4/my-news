const schedule = require("node-schedule");
const { isAfter } = require("date-fns");
const Models = require("../../models");
const getUnsentIssues = require("./getUnsentIssues");
const send = require("./send");
const Issue = Models.Issue;

module.exports = async () => {
  /**
   * Clean the current jobqueue because this function reloads all the pending
   * issues to be sent.
   */
  const jobsList = schedule.scheduledJobs;
  for (job in jobsList) {
    await jobsList[job].cancel();
  }

  const unsentIssues = await getUnsentIssues();

  unsentIssues.forEach(async (unsentIssue) => {
    try {
      const date = new Date(moment(unsentIssue.publishDate).toISOString());

      if (isAfter(date, new Date())) {
        const job = schedule.scheduleJob(date, async () => {
          await send(unsentIssue.id);
        });
      } else {
        await send(unsentIssue.id);
      }
    } catch (error) {
      console.error("[Err] Error at hydrating pending issue", error);
    }
  });
};
