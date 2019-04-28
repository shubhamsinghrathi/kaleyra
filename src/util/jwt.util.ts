import * as jwt from 'jsonwebtoken';

const jwtTokenGenerator = async (data:any) => {
    data["makeDifference"] = Date.now();
    return await jwt.sign(data || {}, process.env["secret"]);
}

const jwtTokenVerifier = async (data) => {
    try {
        let token = data || "";
        let tokenData = jwt.verify(token, process.env["secret"]);
        if(!tokenData) return { failed: true };
        return { failed: false, tokenData };
    } catch(err) {
        return { failed: true };
    }
}

export { jwtTokenGenerator, jwtTokenVerifier };