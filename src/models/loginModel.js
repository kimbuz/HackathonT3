import linkFirebase from "./dbfirebase/linkFirebase.js"

class loginModel extends linkFirebase {

    constructor() {
        super('productos')
    }
}

export default loginModel