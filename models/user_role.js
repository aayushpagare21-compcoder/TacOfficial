const mongoose = require("mongoose");

/* Roles of a user */
/*List of roles a user could have which 
No user interaction required 
*/
const roleSchema = mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema, "Roles");

module.exports = Role;
