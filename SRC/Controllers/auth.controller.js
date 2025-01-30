export const login = (req, res, next) => {
    const {email, password} = req.body;
    res.status(200).send({data: {email, password}})
}

export const register = (req, res, next) => {
    const {email, name, password} = req.body;
    res.status(200).send({data: {email, name, password}})
}

export const forgetPassword = (req, res, next) => {

}

export const verfiyCodeSend = (req, res, next) => {

}

