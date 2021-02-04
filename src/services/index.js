export const ApiUrl = "http://54.93.233.230:5000"

export const sendFetch = async (url, body) => {
    // sunucuya bilgileri gönderdik
    var result = await fetch(ApiUrl + url, {
        method: 'post', headers: { "content-type": "application/json" }, body
    })
    // sunucudan gelen verileri json a dönüştürdük
    var response = await result.json();

    return response;
};