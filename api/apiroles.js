const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
const api = {
    register (payload) { return parameters(1000, 1010, payload) },
    login (payload) { return parameters(2000, 2010, payload) },
    logout (payload) { return parameters(2000, 2020, payload) },
    passwordRecoveryEmail (payload) { return parameters(4000, 4010, payload) },
    passwordRecoveryCode (payload) { return parameters(4000, 4020, payload) },
    passwordRecoveryReset (payload) { return parameters(4000, 4030, payload) },
    checkAccountStatus (payload) { return parameters(5000, 5010, payload) },
    generateAccountCodeVerification (payload) { return parameters(5000, 5020, payload) },
    validateAccountCode (user, code) { const payload = {user: user, code: code}; return parameters(5000, 5030, payload) },
    fetchCustomerProfile (payload) { return parameters(6000, 6010, payload) },
    updateCustomerProfile (user, fields) { const payload = {user: user, fields: fields}; return parameters(6000, 6020, payload) }
  }
module.exports = api
