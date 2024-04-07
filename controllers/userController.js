const User = require('../Models/User');

// Function to create a new user in the database
exports.createUser = async (req, res) => {
  try {
    const { name, dob, location } = req.body;

    // Calculate age based on date of birth
    const dobDate = new Date(dob);
    const now = new Date();
    const age = now.getFullYear() - dobDate.getFullYear();

    // Create a new user object with calculated age
    const newUser = new User({ name, dob: dobDate, location, age });
    await newUser.save();

    // Respond with the newly created user object
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to fetch a random user from the database
exports.getRandomUser = async (req, res) => {
  try {
    // Count total number of users in the database
    const count = await User.countDocuments();

    // Generate a random index based on the total number of users
    const random = Math.floor(Math.random() * count);

    // Find and retrieve a random user by skipping to the random index
    const randomUser = await User.findOne().skip(random).exec();

    // Respond with the random user object
    res.json(randomUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to check if a user with a given name exists in the database
// Input: { "name": "John" }
// Returns: { "exists": true } if user exists, { "exists": false } if user doesn't exist
exports.checkUserExistence = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Construct a case-insensitive regex pattern for partial name search
      const regexPattern = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
  
      // Find a user by name using regex pattern
      const user = await User.findOne({ name: { $regex: regexPattern } });
  
      // Respond with whether the user exists or not
      res.json({ exists: !!user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



// Function to fetch users whose age is above a specified value
// Input: { "age": 25 }
// Returns: Array of user objects whose age is greater than or equal to 25
exports.getUsersAboveAge = async (req, res) => {
  try {
    const { age } = req.body;

    // Find users with dob (date of birth) less than or equal to (current year - specified age)
    const users = await User.find({
      dob: { $lte: new Date(new Date().setFullYear(new Date().getFullYear() - age)) }
    });

    // Respond with the array of users matching the criteria
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to fetch an array of names of all users in the database
// Returns: Array of strings containing names of all users
exports.listUserNames = async (req, res) => {
  try {
    // Find all users and retrieve only the 'name' field
    const users = await User.find({}, 'name');

    // Extract names from the user objects into a new array
    const names = users.map(user => user.name);

    // Respond with the array of user names
    res.json(names);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to update a user's information in the database by ID
// Input: { "userId": "user_id_here", "name": "New Name", "dob": "New DOB", "location": "New Location" }
// Returns: Updated user object
exports.updateUser = async (req, res) => {
    try {

      const userId = req.param.id;
      const { name, dob, location } = req.body;
  
      // Find user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(userId, { name, dob, location }, { new: true });
  
      // Check if user was found and updated
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Respond with the updated user object
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // Function to delete a user from the database by ID
  // Input: { "userId": "user_id_here" }
  // Returns: Success message
  exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Find user by ID and delete
      const deletedUser = await User.findByIdAndRemove(userId);
  
      // Check if user was found and deleted
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Respond with success message
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };