const user=require("../model/userSchema");
const bcrypt=require("bcryptjs");
const sgMail=require('@sendgrid/mail');
const Api_Key="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";
sgMail.setApiKey(Api_Key);
const message={
  to:'shivam.tiwari_cs19@gla.ac.in',
  from:'shivam.tiwari@geminisolutions.com',
  subject:'Account Created',
  text:'Congratulations, You have Successfully registered!!',
  html:'<h1>Congratulations, You have Successfully registered!!</h1>'
};


exports.register= async (req:any,res:any,next:any)=>{
    const {name, userName, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash:any) => {
        await user.create({
            name,
          userName,
          password: hash
        })
        sgMail.send(message)
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
               user.save((error:any) => {
                    if (error) {
                      res.status("400")
                        .json({ message: "An error occurred", error: error.message });
                      process.exit(1);
                    }
                    res.status("201").json({ message: "Update successful", user });
                  });
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
      exports.read = async (req:any,res:any,next:any)=>{
        const users=await user.find({});
        try{
          res.send(users);
          res.status(201).json({message:"All data has been fetched",users});
        }
        catch(error:any){
          res.status(400).json({message:"An error occurred",error:error.message})
        }

      };