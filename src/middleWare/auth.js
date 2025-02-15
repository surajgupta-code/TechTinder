const adminAuth =(req, req, next)=>{
    console.log("This is admin auth");
    const token= "xyz";
    const {adminAuth, userAuth} = require("./middleWare/auth");

    app.get("/user", userAuth, (req, res)=>{
        res.send("User Data send");
    });

    app.get("/admin", adminAuth, (req, res)=>{
        res.send("Admin Data send");
    });

    app.get("/admin/getalldata", adminAuth, (req, res)=>{
        res.send("Admin Data send");
    });

    app.get("/user/delete", userAuth, (req, res)=>{
        res.send("User Data Deleted");
    });



}
