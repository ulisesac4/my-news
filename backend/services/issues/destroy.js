const Models = require("../../models");
const hydratePending = require("./hydratePending");
const Issue = Models.Issue;

module.exports = async (id) => {
  const destroy = Issue.destroy({ where: { id } });
  hydratePending()
    .then((success) => {
      console.log("Have correctly hydrated unsent issues at issue destroy");
    })
    .catch((err) => {
      console.error(
        "[Err] Something happened while hydrating pending issues",
        err
      );
    });
  return destroy;
};
