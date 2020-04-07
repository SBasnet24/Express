const express = require("express");
const members = require("../../members");
const uuid = require("uuid");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(members);
});
// get single member
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const found = members.some((member) => member.id === parseInt(id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(id)));
  } else {
    res.status(400).json({ msg: `No member with the id ${id}` });
  }
});
// create new  members
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ msg: "You have to send both name and email" });
  }

  members.push(newMember);
  res.redirect("/");
});
// update members using put request
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const found = members.some((member) => member.id === parseInt(id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "Member Updated", member });
      }
    });
    res.json(members);
  } else {
    res.status(400).json({ msg: `No member with the id ${id}` });
  }
});

// delete member
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const found = members.some((member) => member.id === parseInt(id));
  if (found) {
    res.json({
      msg: "members deleted",
      members: members.filter((member) => member.id !== parseInt(id)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id ${id}` });
  }
});

module.exports = router;
