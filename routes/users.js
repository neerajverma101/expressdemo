const express=require("express")

const router=express.Router()

const appController=require("../controllers/users.js")

router.get("/users",appController.getAllUsers)

router.get("/user/:username",appController.getUser)

router.post("/user/add",appController.addUser)

router.patch("/user/update/:username",appController.updateUser)

router.delete("/user/delete/:username",appController.deleteUser)

module.exports=router