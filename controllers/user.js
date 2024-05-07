import User from "../models/user.js";

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not Found" });
  }
  return res.json(user);
}

async function handleUpdateUserByID(req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ status: "success" });
}

async function handleDeleteUserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res
      .status(400)
      .json({ msg: "This is a bad request, All fields are required" });
  }

  const userResult = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  console.log("Result : ", userResult);
  return res.status(201).json({ msg: "success", id: userResult._id });
}

export  {
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
  handleCreateUser,
};
