  json.content  @message.content

  json.image	  @message.image

  json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")

  json.username @message.user.name

  json.id @message.id