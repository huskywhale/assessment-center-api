const { getTop3Centers, defaultHospitalCodeTxt, getTextForFunction } = require('../lib')
const { hospitalTable } = require('../constants')
const { logger } = require('../constants')
exports.handler = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(JSON.stringify(event.Memory))
    const postalCode =
    memory.twilio.collected_data.ask_questions.answers.HPostalCode.answer

    const top3 = await getTop3Centers(hospitalTable, postalCode)
    const startTxt = await getTextForFunction('getHospitalDetails')
    const result = await defaultHospitalCodeTxt(
      startTxt,
      top3
    )

    responseObject = {
      actions: [
        {
          say: result
        },
        {
          redirect: 'task://information_router'
        },
        {
          listen: false
        }
      ]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
