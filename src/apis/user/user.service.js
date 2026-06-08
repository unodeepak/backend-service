const { return200, return400, return500 } = require("../../constant/return");
const Model = require("../../models");
const sendEvent = require("../../utils/sendEvent");
const { generateToken } = require("./user.helper");
const bcrypt = require("bcrypt");
const redisHelper = require("../../utils/redis.helper");

exports.createUser = async (req) => {
  try {
    const { body } = req;
    if (!body.email || !body.name || !body.password) {
      return return400("All the fields are required: email, name, password");
    }

    const isExist = await Model.User.findOne({ email: req.body.email });
    if (isExist) {
      return return400(`User with email ${req.body.email} already exists`);
    }
    // Hash the password before saving the user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const data = await Model.User.create(req.body);

    const token = generateToken(data);
    sendEvent({
      eventName: "join-room",
      msg: "User Created Successfully",
      id: data._id,
    });
    return return200("User Created Successfully", {
      data: {
        user: data,
        token,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return return500(`Error creating user: ${err.message}`);
  }
};

exports.loginUser = async (req) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      return return400("All the fields are required: email, password");
    }

    const user = await Model.User.findOne({ email: req.body.email });
    if (!user) {
      return return400(`User with email ${req.body.email} does not exist`);
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordValid) {
      return return400("Invalid password");
    }

    const token = generateToken(user);
    return return200("Login Successful", {
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return return500(`Error logging in user: ${err.message}`);
  }
};

exports.getUserById = async (req) => {
  try {
    const user = await Model.User.findById(req.params.id);
    if (!user) {
      return return400(`User with ID ${req.params.id} does not exist`);
    }
    return return200("User Fetched Successfully", {
      data: {
        user,
      },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return return500(`Error fetching user: ${err.message}`);
  }
};

exports.getAllUsers = async (req) => {
  try {
    const key = `FETCH_DATA_${req.user._id}`;
    const redisData = await redisHelper.getCache(key);
    if (redisData) {
      return return200("Users Fetched Successfully", {
        data: {
          users: redisData,
        },
      });
    }
    const users = await Model.User.find();
    redisHelper.setCache(key, users, 60 * 60); // 1 hour()
    return return200("Users Fetched Successfully", {
      data: {
        users,
      },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return return500(`Error fetching users: ${err.message}`);
  }
};
