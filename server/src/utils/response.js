const responseObj = (message, data = null) => ({
    success: true,
    message,       
    data,          
});

module.exports = {
    responseObj
}