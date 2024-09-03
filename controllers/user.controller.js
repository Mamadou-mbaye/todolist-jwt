import {
  registerUser,
  findUserByEmail,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

const registerUserController = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const email = req.body.email;
  const password = req.body.password;
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !birthDate ||
    !email.trim() ||
    !password.trim()
  ) {
    //verificare che i parametri sono riempiti
    return res.status(400).send({ message: "All data are required" });
  }
  try {
    const user = await findUserByEmail(email);
    //verificare se email esiste gia nel db
    if (user) return res.status(409).send({ message: "Email already exists" });

    await registerUser(firstName, lastName, birthDate, email, password);
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while registering user" });
  }
};

const findUserByEmailController = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await findUserByEmail(email);
    //verificare che user sia presente nel db
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "An error occurred while retrieving user" });
  }
};

const updateUserController = async (req, res) => {
  const email = req.params.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const password = req.body.password;
  try {
    const user = await findUserByEmail(email);
    //verificare che user sia presente nel db
    if (!user) return res.status(404).send({ message: "User not found" });
    const [updatedUserRows] = await updateUser(
      firstName,
      lastName,
      birthDate,
      email,
      password
    );
    if (updatedUserRows === 0)
      return res.status(404).send({ message: "User not updated" });
    return res.status(200).send({ message: "User updated", updatedUserRows });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "An error occurred while updating user" });
  }
};

const deleteUserController = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).send({ message: "User not found" });
    await deleteUser(email);
    const isUserPresent = await findUserByEmail(email);
    if (!isUserPresent)
      return res.status(200).send({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "An error occurred while deleting user" });
  }
};

export {
  registerUserController,
  findUserByEmailController,
  updateUserController,
  deleteUserController,
};
