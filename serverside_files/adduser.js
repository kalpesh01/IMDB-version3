const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/pool").prototype);
const con = require("./dbconn");

let adduser = async (input) => {
    try {
        //create connection 
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();

        //Insert Data In database
        let sql = "insert into users(id,name,password,email,birthdate,mobno)values(?,?,?,?,?,?)";
        let data = await Connection.queryAsync(sql, [
            input.id,
            input.name,
            input.password,
            input.email,
            input.birthdate,
            input.mobile
        ]);

        Connection.endAsync();
        console.log(data.insertId);
        return data.insertId;
    } catch (err) {
        const refjson = { message: "Error from server" };
        return err;
    };
};


let validate = async (input) => {
    try {
        //create connection 
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();

        //Insert Data In database
        let sql = "select email,password from users where email=? and password=?";
        let data = await Connection.queryAsync(sql, [

            input.email,
            input.password,
        ]);

        Connection.endAsync();
        console.log(data.length);
        return data.length;
    } catch (err) {
        const refjson = { message: "Error from server" };
        return err;
    };
};


let update = async (input) => {
    try {
        //create connection 
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();

        //Insert Data In database
        let sql = "update users set password=? Where email=?";
        let data = await Connection.queryAsync(sql, [

            input.newpassword,
            input.email
        ]);

        Connection.endAsync();
        console.log(data);
        return data;
    } catch (err) {
        const refjson = { message: "Error from server" };
        return err;
    };
};

let checkEmail = async (input) => {
    try {
        //create connection 
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();

        //varify Email exist Or Not In database
        let sql = "select email from users where email=?";
        let data = await Connection.queryAsync(sql, [
            input.email
        ]);

        Connection.endAsync();
        console.log(data);
        return data;
    } catch (err) {
        const refjson = { message: "Error from server" };
        return err;
    };
};

let getid = async () => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "select max(id) as id from users";
        let data = await Connection.queryAsync(sql);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data);
        return data;

    } catch (err) {
        return err;
    }

}

let checkUser = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "select uid from rating where uid=?";
        let data = await Connection.queryAsync(sql, [
            input.uid
        ]);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data.length);
        return data.length;

    } catch (err) {

    }
}

let updateRating = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "update rating set rating=? where uid=?";
        let data = await Connection.queryAsync(sql, [
            input.rating,
            input.uid
        ]);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data.affectedRows);
        return data.affectedRows;

    } catch (err) {
        return err;
    }
}

let insertRating = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "insert into rating (mname,uid,rating) values(?,?,?)"
        let data = await Connection.queryAsync(sql, [
            input.mname,
            input.uid,
            input.rating
        ]);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data);
        return data;

    } catch (err) {
        return err;
    }
}

let insertcomment = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "insert into comment (mname,uid,comments) values(?,?,?)"
        let data = await Connection.queryAsync(sql, [
            input.mname,
            input.uid,
            input.cmt
        ]);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data);
        return data;

    } catch (err) {
        return err;
    }
}

let getcomments = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "select uid,comments from comment where mname=?";
        let data = await Connection.queryAsync(sql, [input.mname]);
        Connection.endAsync()
        console.log(data);
        return data;

    } catch (err) {
        return err;
    }
}

let getAvgRat = async (input) => {
    try {
        const Connection = mysql.createConnection(con.db_conn);
        await Connection.connectAsync();
        let sql = "select round(avg(rating)) as avg from rating where mname=?"
        let data = await Connection.queryAsync(sql, [input.mname]);
        // http://localhost:3000/?id=11&name=parag&pass="parag@123"&email="parag@gmail.com"&mob=98675
        Connection.endAsync()
        console.log(data[0]);
        return data[0];

    } catch (err) {
        return err;
    }
}


module.exports = {
    adduser,
    getid,
    validate,
    update,
    checkEmail,
    checkUser,
    updateRating,
    insertRating,
    insertcomment,
    getcomments,
    getAvgRat
}