const user=require("../model/userSchema");
const bcrypt=require("bcryptjs");


exports.register= async (req:any,res:any,next:any)=>{
    const { username, password } = req.body
    bcrypt.hash(password, 10).then(async (hash:any) => {
        await user.create({
          username,
          password: hash,
        })
          .then((user:any) =>
            res.status(200).json({
              message: "User successfully created",
               user,
            })
          )
          .catch((error:any) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    };
    exports.login = async (req:any, res:any, next:any) => {
        const { username, password } = req.body
        
        if (!username || !password) {
          return res.status(400).json({
            message: "Username or Password not present",
          })
        }
        try {
          const uniqueUser = await user.findOne({ username })
          if (!uniqueUser) {
            res.status(400).json({
              message: "Login not successful",
              error: "User not found",
            })
          } else {
            
            bcrypt.compare(password, uniqueUser.password).then(function (result:any) {
              result
                ? res.status(200).json({
                    message: "Login successful",
                    user,
                  })
                : res.status(400).json({ message: "Login not succesful" })
            })
          }
        } catch (error:any) {
          res.status(400).json({
            message: "An error occurred",
            error:error.message,
          })
        }
      }
    exports.update = async (req:any, res:any, next:any) => {
        const { userName, id } = req.body;
        
        if (userName && id) {
            await user.findById(id)
              .then((user:any) => {
               
                if (user.role !== "admin") {
                 
                  user.save((err:any) => {
                    
                    if (err) {
                      res.status("400")
                        .json({ message: "An error occurred", error: err.message });
                      process.exit(1);
                    }
                    res.status("201").json({ message: "Update successful", user });
                  });
                } else {
                  res.status(400).json({ message: "User is already an Admin" });
                }
              })
              .catch((error:any) => {
                res.status(400)
                  .json({ message: "An error occurred", error: error.message });
              });
            }
        }
        exports.deleteUser = async (req:any, res:any, next:any) => {
            const { id } = req.body
            await user.findById(id)
              .then((user:any) => user.remove())
              .then((user :any)=>
                res.status(201).json({ message: "User successfully deleted", user })
              )
              .catch((error:any) =>
                res
                  .status(400)
                  .json({ message: "An error occurred", error: error.message })
              )
          }
      