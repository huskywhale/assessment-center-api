const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  const message = await getTextForFunction('Greetings')

  const responseObject = {
    actions: [
      {
        say: message
      },
      {
        redirect: `${process.env.ASSESMENT_API}/informationRoute`
      },
      {
        listen: false
      }
    ]
  }
  callback(null, responseObject)
}
