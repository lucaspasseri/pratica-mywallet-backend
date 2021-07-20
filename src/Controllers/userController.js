import * as userService from "../Services/userService.js";

export async function signUp(req, res){
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.sendStatus(400);
        }
    
        const newUser = await userService.create(name, email, password);
    
        if(newUser === null){
          return res.sendStatus(409);
        }
    
        res.sendStatus(201);

    } catch (err) {
    console.error(err);
    res.sendStatus(500);
    }    
}

export async function signIn(req, res){
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.sendStatus(400);
      }
  
      const validUser = await userService.authenticate(email, password);
  
      if(validUser === null){
        return res.sendStatus(401)
      }    
  
      const token = validUser;
  
      res.send({
        token
      });
      
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}