import { SNS } from 'aws-sdk'
import { ARN_IOS, ARN_FCM, SNS_REGION, SNS_SECRET_KEY, SNS_ACCESS_KEY } from './secrets';

var sns = new SNS({ apiVersion: '2010-03-31', region: SNS_REGION, accessKeyId: SNS_ACCESS_KEY, secretAccessKey: SNS_SECRET_KEY  });

export const snsAddUser = async (data) => {
    try {
        let sessionData = data.sessionData || {}
        let userType = data.userType || 'customer'
        let arn = ''
        sessionData.deviceType = sessionData.deviceType || 1
        let PlatformApplicationArn = ARN_FCM
        if(sessionData.deviceType == 2) {
            PlatformApplicationArn = ARN_IOS;
        }

        sessionData.deviceToken = sessionData.deviceToken || ''
        var params = {
            PlatformApplicationArn,
            Token: sessionData.deviceToken
        }

        let theModel

        if(sessionData.deviceToken != '') {
            let snsData = await sns.createPlatformEndpoint(params, function(err, data) {
                if(err) {
                    global.log(err)
                    global.logger.error(err.message)
                } else {
                    global.log("data: ", data)
                    if(data) arn = data["EndpointArn"] || ''
                    theModel.findByIdAndUpdate(sessionData._id, { arn }, { new: true, upsert: true }).lean().exec()
                }
            })
        }
        return
    } catch(err) {
        global.log(err)
        global.logger.error(err.message)
        return
    }
}

export const snsRemoveUser = async (data) => {
    try {
        let sessionData = data.sessionData || {}
        sessionData.arn = sessionData.arn || ''
        var params = {
            EndpointArn: sessionData.arn
        }
        if(sessionData.arn != '') {
            sns.deleteEndpoint(params, function(err, data) {
                if(err) {
                    global.log(err)
                    global.logger.error(err.message)
                } else {
                    global.log("data: ", data)
                }
            })
        }
        return
    } catch(err) {
        global.log(err)
        global.logger.error(err.message)
        return
    }
}

export class SnSPushController {
    constructor() {
        //
    }

    public async snsPushSender(data) {
        try {
            global.log("data: ", data)
            let deviceType = data.deviceType || 1
            // data.to_push = JSON.stringify(data.to_push) || ''
            let params
            data.to_push = JSON.stringify(data.to_push) || ''
            global.log("data.to_push: ", data.to_push)
            if(deviceType == 2) {
                //for iOS
                params = {
                    TargetArn: data.arn || '',
                    MessageStructure: 'json',
                    Message: data.to_push || ''
                }
            } else {
                params = {
                    TargetArn: data.arn || '',
                    Message: data.to_push || ''
                }
            }
            sns.publish(params, function(err, data) {
                if(err) {
                    global.log(err)
                    global.logger.error(err.message)
                } else {
                    global.log("data: ", data)
                }
            })
            return
        } catch(err) {
            global.log(err)
            global.logger.error(err.message)
            return
        }
    }
}