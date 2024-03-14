const User = require('../models/usermodel')
const bcrypt = require('bcrypt')

module.exports.register = async (req,res,next)=>{

    try{
        
    const {username,email, password} = req.body;
    const isUsername = await User.findOne({username});
    if(isUsername)
    {
        return res.json({msg:"User already exists", status:false});
    }
    const isEmail = await User.findOne({email});
    if(isEmail)
    {
        return res.json({msg:"Email already Registererd", status:false});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    delete user.password
    return res.json({status:true, user});
   
    }
    catch(err){
        next(err);

    }
}

module.exports.login = async (req,res,next)=>{

    try{
        
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user)
    {
        return res.json({msg:"Incorrect username or password", status:false});
    }
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword)
    {
        return res.json({msg:"Incorrect username or password", status:false});
    }

    delete user.password
    return res.json({status:true, user});
   
    }
    catch(err){
        next(err);

    }
}

module.exports.SetAvatar = async (req,res,next)=>{

    try{
        
    const id = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(id,{
        isAvatarImageset: true,
        avatarImage
    })
    return res.json({
        isSet: userData.isAvatarImageset,
        image: userData.avatarImage

    })
   
    }
    catch(err){
        next(err);

    }
}

module.exports.getallusers = async (req,res,next)=>{

    try{
        const users = await User.find({_id: {$ne : req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])

        return res.json(users);
        
    
    }
    catch(err){
        next(err);

    }
}