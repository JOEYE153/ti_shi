// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const SesClient = tencentcloud.ses.v20201002.Client;

const clientConfig = {
    credential: {
      secretId: "AKID37quAlMJi26WjhIs58HDdniuFwPchJly",
      secretKey: "rjpnX5OSDNJ4bsukLgturb8QSEa8SZS2",
    },
    region: "ap-hongkong",
    profile: {
      signMethod: "HmacSHA256", 
      httpProfile: {
        reqMethod: "POST", 
        reqTimeout: 30, 
      },
    },
  }

const client = new SesClient(clientConfig);

async function SendEmail(email, code) {
    const params = {
        "FromEmailAddress": "tishi <welcome@buaatishi.com>",
        "Destination": [
            email
        ],
        "Template": {
            "TemplateID": "15183",
            "TemplateData": `{\"code\":\"${code}\"}`
        },
        "Subject": "【题士】验证您的邮箱"
    }
    try {
        await client.SendEmail(params);
    } catch (e) {
        throw new Error(e);
    }
}


module.exports = SendEmail;