const Models = require("../../models");
const Recipient = Models.Recipient;

module.exports = async (id) => {
    return Recipient.destroy({where: {id}})
};
