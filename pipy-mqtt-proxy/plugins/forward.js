(config =>
pipy({
  _protocolLevel: 4,
})

.pipeline('request')
  .handleMessageStart(
    msg => (
      msg.head.type === 'CONNECT' && (
        _protocolLevel = msg.head.protocolLevel
      )
    )
  )
  .encodeMQTT()
  .connect(config.broker)
  .decodeMQTT({
    protocolLevel: () => _protocolLevel,
  })
)(JSON.decode(pipy.load('config/main.json')))
